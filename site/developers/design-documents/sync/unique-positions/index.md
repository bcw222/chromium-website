---
breadcrumbs:
- - /developers
  - For Developers
- - /developers/design-documents
  - Design Documents
- - /developers/design-documents/sync
  - Sync
page_name: unique-positions
title: Chrome Sync Unique Position API
---

### Overview

Chrome Sync supports ordering of entities in the bridge using Unique Positions.
This is useful for the data types which require ordering which is not based on
data itself, for example Bookmarks or Tabs.

Chrome Sync provides API to generate unique position of an entity based on its
neighbours. This is different from using numerical positions or item's index in
the model:
* Unique positions are representing a position relative to each other rather
  than the target index.
* It's possible to generate unique position between any elements which would be
  difficult to achieve using integers.
* Unique positions require only one element to be committed to the server if
  only one item is being moved. With integers (index of item in the model) it
  might require uploading up to all of the elements if all their indexes were
  updated (e.g. if an item was moved to the beginning).

Unique positions are stored locally in sync metadata and the model can keep
items in memory in any convenient format (e.g. in a vector). The bridge should
take care of transforming model's positions / indexes into unique positions.
Sync processor will update unique positions in metadata during processing local
changes or remote updates.

Note that not all sync entities are required to have unique positions, only
those which need to be ordered (e.g. tab groups may not have positions while
tabs within them should be ordered against each other).

### How to enable unique positions

1. Add `sync_pb::UniquePosition` to data type specifics.

1. Implement the following methods in the bridge to tell the processor that the
bridge supports unique positions and to extract them from specifics:
    ```cpp
    class Bridge: public DataTypeSyncBridge {
      // ...

      // Tell the processor that unique positions are enabled for this bridge.
      bool SupportsUniquePositions() const override { return true; }

      // Extracts unique position from data type specifics. Returns default
      // (empty) UniquePosition if entity does not require ordering.
      sync_pb::UniquePosition GetUniquePosition(
          const sync_pb::EntitySpecifics& specifics) const override {}
    };
    ```

1. Implement generating unique positions using
[processor API][UniquePositionAPI] and populating it in specifics
([example CL](https://crrev.com/c/5769238)).

1. Implement applying remote updates. Example CLs:
    * https://crrev.com/c/5768675 - basic implementation of applying remote
        updates, requires the following CL to work properly.
    * https://crrev.com/c/5842231 - full implementation of applying remote
        updates.

    This step is complicated because of the mental model which is slightly
    different from the normal updates. Sync metadata changes are applied in the
    processor **before** `ApplyIncrementalSyncChanges` is called. This means
    that all the previous data about unique positions is gone, and the processor
    represents the final state which should be represented in the model. It
    leads to the difference between the order in the processor, and in the
    model. The second CL above resolves this inconsistency. See `Applying remote
    updates` below for more details.

1. Add two-client sync integration tests to verify that the eventual state of
both clients is the same, especially in case changes are happening on both
clients simultaneously.

### Applying remote updates

#### Recommended approach

See problem descriptions and solutions below for more details.

1. Sort incoming updates by their unique positions in the reversed order (from
right to left).

1. Track entities being updated in the model.

1. Apply updates one by one. When finding the position to put an updated item to
the model, skip the entities which are being updated (and not applied yet).

  * To find the position in the model for an updated item, iterate over the
    model and compare item's unique position with the updated entity (skipping
    items being updated). The updated entity should be placed before the first
    item with a greater unique position.

Example (excluding unrelated details, see example CLs for the full code):
```cpp
void Bridge::ApplyIncrementalSyncChanges(
        syncer::EntityChangeList entity_changes) {
  // Step 1 - sort incoming changes in the reversed order.
  ranges::sort(entity_changes, &UniquePositionComparison);
  ranges::reverse(entity_changes);

  // Step 2 - track entities being updated.
  std::set<std::string> storage_keys_to_update;
  for (auto& change : entity_changes) {
    if (change->type() == syncer::EntityChange::ACTION_UPDATE) {
      storage_keys_to_update.insert(change->storage_key());
    }
  }

  // Step 3 - apply updates.
  for (auto& change : entity_changes) {
    ApplyUpdateToModel(change, storage_keys_to_update);
    storage_keys_to_update.erase(change->storage_key());
  }
}

void ApplyUpdateToModel(const syncer::EntityChange& change,
                        const std::set<std::string>& storage_keys_to_update) {
  // Find the place to insert an updated or added item.
  Model::Item* insert_before = nullptr;
  for (const Model::Item& item: model_->items()) {
    if (storage_keys_to_update.contains(item.key())) {
      continue;
    }
    UniquePosition position_for_change = UniquePositionFromChange(change);
    UniquePosition position_for_item = Parse(processor()->GetUniquePositionForStorageKey(item.key()));
    if (position_for_change.LessThan(position_for_item)) {
      insert_before = &item;
      break;
    }
  }

  model_->UpdateAndMoveItem(insert_before, ItemFromChange(change));
}
```

#### Problem with inconsistency between sync metadata and the model
During applying remote updates in the bridge, there is inconsistency between the
order in the model and in the processor. Imaging the following example:
* `1[A], 2[B], 3[C]` - representing 3 different items in the model with their
    corresponding unique positions (represented as a string with
    lexicographical ordering).
* Remote updates: `1[D], 2[E]` - items `1` and `2` are moved to the end.

The final (expected) state in the model after applying updates is the following:
`3[C], 1[D], 2[E]`. However in the beginning of `ApplyIncrementalSyncChanges`
there is the following state: `1[D], 2[E], 3[C]` - the order of unique positions
(`DEC`) differs from the actual order of items in the model. This means that
during applying the first update (`1[D]`), its unique position can't be compared
with the unique positions of the other items as is.

The naive solution could be to go over the model from left to right, and find
the first item before which to insert the update. With the current state
`1[D], 2[E], 3[C]` the first item with a unique position greater that `D` would
be `2[E]` because `D < E`. This way the item `1` would be kept at the same first
place which is incorrect.

##### Solutions

1. The simplest correct solution could be to apply updates keeping the existing
order of items in the model. New items could be placed to the end by default. In
the end of `ApplyIncrementalSyncChanges` method, the bridge could use the
existing unique positions in the processor to order items in the model (as was
mentioned above, the processor represents the final state). This approach is
reliable but it has the following downsides:
   * The model requires separate method to reorder items.
   * There could be no changes in the order which should be detected.
   * Update to only one item may require complicated sorting.
   * Complexity: O(NlogN), N - number of items in the model.

2. Alternative approach could be to ignore the items in the model which will are
going to be updated, and apply updates one by one as usual. This solution is
harder to verify but it has a better linear complexity (from the number of
updates).

    This works similar to removing the items which are being updated from the
    model, and adding them again to the correct place. Note that it works
    regardless of the updates being new, updated or deleted entities.

    From the example above, when there are two incoming updates `1[D], 2[E]`,
    then can be applied one by one in any order.

    When applying the first update `1[D]`, and with the current state
    `1[D], 2[E], 3[C]`, the unique position `D` would be compared with only
    `3[C]`, because items `1` and `2` are being updated, and hence should be
    ignore (because their unique positions are currently incorrect). This will update the model's state to
    `2[E], 3[C], 1[D]`. Now the item `1` is processed, in the correct position
    (consistent with its unique position in sync metadata).

    Now, when applying the second update, its unique position will be compared
    with items `3` and `1` (`2` is skipped because it's being updated). Because
    `E > C` and `E > D`, it's placed to the end: `3[C], 1[D], 2[E]`.

#### Problem with the order of remote updates

With the second solution above, there is a caveat which may cause temporary
reordering items even when their unique positions were not changed.

Example:
* Model: `1[A], 2[B]`.
* Update: `1[A], 2[B]` - there are no real changes in the order.

Consider the following steps:
1. Apply the first update `1[A]`, both entities are being updated. According to
the second approach, both items in the model should be ignored when finding the
right place to put the updated item. It's the end, and the final state of the
model at this step is `2[B], 1[A]`. The order is temporarily changed.

1. Apply the second update `2[B]`, it's placed also to the end: `1[A], 2[B]`.
The final state is in a correct order, however during applying updates the model
had temporarily changed order of items.

##### Solution

When updates are applied in the reversed order (from right to left), the order
in the model won't change (if `2[B]` is applied first, is would be left in its
place). Hence the simplest solution is to sort all the incoming updates in the
reversed order using their unique positions. Deletions can be applied in any
order.

### Generating UniquePosition API

Sync Processor provides the following [API][UniquePositionAPI]:
* `UniquePositionForInitialEntity` - generates the initial unique position, used
  for generating positions for the first or the only entity.
* `UniquePositionAfter` - generates the position after (greater) the other
  entity.
* `UniquePositionBefore` - generates the position before (less) the other
  entity.
* `UniquePositionBetween` - generates the position between two entities.

Sync processor uses [storage keys](../model-api#identifiers) to refer to
neighbour entities when required to generate unique positions relative to them
(before, after an entity or between two entities).

Client tag hash is required to generate unique positions consistently on
different clients, or to keep the existing unique position. The latter is useful
to prevent generating a new unique position if entity's current position is
already correct. This may reduce the traffic to the server or prevent indefinite
growth of the unique position in specifics.

[UniquePositionAPI]: https://source.chromium.org/search?q=class:%5CbDataTypeLocalChangeProcessor%5Cb%20UniquePosition&ss=chromium%2Fchromium%2Fsrc