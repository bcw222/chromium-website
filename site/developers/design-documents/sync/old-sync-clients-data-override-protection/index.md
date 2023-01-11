---
breadcrumbs:
- - /developers
  - For Developers
- - /developers/design-documents
  - Design Documents
- - /developers/design-documents/sync
  - Sync
page_name: old-sync-clients-data-override-protection
title: Protection against data overrides by old Sync clients
---

This document outlines the necessary steps to prevent the following [Sync's
Model API][SyncModelApi] data loss scenario from happening for **multi-client** Sync users:
1. New proto field `F` is introduced in data [specifics][DataSpecifics] (e.g.
   [`PasswordSpecifics`][PasswordSpecifics]).
2. Client `N` (a newer client) submits a proto containing the introduced field `F`.
3. Client `O` (an older client) receives the proto, but doesn’t know the field `F`,
   discarding it before storing in the local model.
4. Client `O` submits a change to the same proto, which results in discarding
   field’s `F` data from client `N`.

In order to have such protection, a Sync datatype owner should follow this checklist:
[TOC]

[DataSpecifics]: https://www.chromium.org/developers/design-documents/sync/model-api/#specifics
[PasswordSpecifics]: https://cs.chromium.org/chromium/src/components/sync/protocol/password_specifics.proto
[SyncModelAPI]: https://www.chromium.org/developers/design-documents/sync/model-api

## Trimming

Trimming is a functionality that allows each data type to specify which proto
fields are **supported** in the current browser version. Any field that is
**not supported** will be cached by the [`ModelTypeChangeProcessor`][MTCP] and
can be used during commits to the server to prevent the data loss.

Fields that should **not** be marked as supported:
* Unknown fields in the current browser version
* Known fields that are just defined and not actively used by the implementation

[`TrimRemoteSpecificsForCaching`][TRSFC] is a function of
[`ModelTypeSyncBridge`][MTSC] that:
* Takes a [`sync_pb::EntitySpecifics`][EntitySpecifics] object as an argument.
* Clears all its supported fields.
* Returns [`sync_pb::EntitySpecifics`][EntitySpecifics] containing only
  unsupported fields.
* Is implemented as a no-op by default.

To add a data-specific unsupported fields caching, override the function in the
data-specific [`ModelTypeSyncBridge`][MTSC]:

```cpp
sync_pb::EntitySpecifics PasswordSyncBridge::TrimRemoteSpecificsForCaching(
   const sync_pb::EntitySpecifics& entity_specifics) const {
 DCHECK(entity_specifics.has_password());
 sync_pb::EntitySpecifics trimmed_entity_specifics;
 *trimmed_entity_specifics.mutable_password()
      ->mutable_client_only_encrypted_data() =
     TrimPasswordSpecificsDataForCaching(
         entity_specifics.password().client_only_encrypted_data());
 return trimmed_entity_specifics;
}

sync_pb::PasswordSpecificsData TrimPasswordSpecificsDataForCaching(
   const sync_pb::PasswordSpecificsData& password_specifics_data) {
 sync_pb::PasswordSpecificsData trimmed_password_data =
     sync_pb::PasswordSpecificsData(password_specifics_data);
 trimmed_password_data.clear_username_element();
 trimmed_password_data.clear_password_element();
 {...}
 return trimmed_password_data;
}
```

[EntitySpecifics]: https://cs.chromium.org/chromium/src/components/sync/protocol/entity_specifics.proto
[MTCP]: https://cs.chromium.org/chromium/src/components/sync/model/model_type_change_processor.h
[MTSC]: https://cs.chromium.org/chromium/src/components/sync/model/model_type_sync_bridge.h
[TRSFC]: https://cs.chromium.org/chromium/src/components/sync/model/model_type_sync_bridge.h;l=209;drc=12be03159fe22cd4ef291e9561762531c2589539

### Safety check
Forgetting to trim fields that are supported might result in:
* I/O, memory overhead (caching unnecessary data)
* Unnecessary sync data redownloads on browser startup (more details below)

To prevent this scenario, add a check that:
* Takes a local representation of the proto (containing supported fields only)
* Makes sure that trimming it would return an empty proto

This should be done before every commit to the Sync server:

```cpp
DCHECK_EQ(0u, TrimPasswordSpecificsDataForCaching(
                   SpecificsDataFromPassword(password_form,
                                             /*base_password_data=*/{}))
                   .ByteSizeLong());
```

## Local update flow
To use the cached unsupported fields data during commits to the server, add the
code that does the following steps:
1. Query cached [`sync_pb::EntitySpecifics`][EntitySpecifics] from the
   [`ModelTypeChangeProcessor`][MTCP].

```cpp
const sync_pb::PasswordSpecificsData&
PasswordSyncBridge::GetPossiblyTrimmedPasswordSpecificsData(
   const std::string& storage_key) {
 return change_processor()
     ->GetPossiblyTrimmedRemoteSpecifics(storage_key)
     .password()
     .client_only_encrypted_data();
}
```

2. Use the cached proto as a base for a commit and fill it with the supported
   fields from the local proto representation.

```cpp
// `password_form` - Local password representation, contains supported fields.
// `base_password_data` - Cached proto, contains unsupported fields.
sync_pb::PasswordSpecificsData SpecificsDataFromPassword(
   const PasswordForm& password_form,
   const sync_pb::PasswordSpecificsData& base_password_data) {
 sync_pb::PasswordSpecificsData password_data = base_password_data;

 password_data.set_username_value(
     base::UTF16ToUTF8(password_form.username_value));
 password_data.set_password_value(
     base::UTF16ToUTF8(password_form.password_value));
 {...}
 return password_data;
}
```

3. Commit the merged proto to the server.

[MTCP]: https://cs.chromium.org/chromium/src/components/sync/model/model_type_change_processor.h

## Browser update flow
To handle the scenario when unsupported fields become supported due to
a browser update, add the following code to your data-specific
[`ModelTypeSyncBridge`][MTSC]:
1. On startup, check whether the unsupported fields cache contains any field
   that is supported in the current browser version. This can be done by using
   the trimming function on cached protos and checking if it trims any fields.

```cpp
bool PasswordSyncBridge::SyncMetadataCacheContainsSupportedFields(
   const syncer::EntityMetadataMap& metadata_map) const {
 for (const auto& metadata_entry : metadata_map) {
   // Serialize the cached specifics and parse them back to a proto. Any fields
   // that were cached as unknown and are known in the current browser version
   // should be parsed correctly.
   std::string serialized_specifics;
   metadata_entry.second->possibly_trimmed_base_specifics().SerializeToString(
       &serialized_specifics);
   sync_pb::EntitySpecifics parsed_specifics;
   parsed_specifics.ParseFromString(serialized_specifics);

   // Skip entities without a `password` field to avoid failing the
   // precondition in the `TrimRemoteSpecificsForCaching` function below.
   if (!parsed_specifics.has_password()) {
     continue;
   }

   // If `parsed_specifics` contain any supported fields, they would be cleared
   // by the trimming function.
   if (parsed_specifics.ByteSizeLong() !=
       TrimRemoteSpecificsForCaching(parsed_specifics).ByteSizeLong()) {
     return true;
   }
 }

 return false;
}
```
2. If the cache contains any fields that are already supported, simply force
   the initial sync flow to deal with any inconsistencies between local and
   server states.

```cpp
if (SyncMetadataCacheContainsSupportedFields(batch->GetAllMetadata())) {
  // Caching entity specifics is meant to preserve fields not supported in a
  // given browser version during commits to the server. If the cache
  // contains supported fields, this means that the browser was updated and
  // we should force the initial sync flow to propagate the cached data into
  // the local model.
  password_store_sync_->GetMetadataStore()->DeleteAllSyncMetadata();
  batch = std::make_unique<syncer::MetadataBatch>();
  sync_metadata_read_error = SyncMetadataReadError::
      kNewlySupportedFieldDetectedInUnsupportedFieldsCache;
}
```

It’s important to implement the trimming function correctly, otherwise client
can run into unnecessary sync data redownloads if a supported field gets cached
unnecessarily.

If the trimming function relies on having data-specific field present in the
[`sync_pb::EntitySpecifics`][EntitySpecifics] proto ([`example`][PasswordCheckExample]),
make sure to skip entries without these fields present in the startup check (as
e.g. cache can be empty for entities that were created before this solution
landed). This can be tested with the following [`Sync integration test`][SyncStartupTest].

[MTSC]: https://cs.chromium.org/chromium/src/components/sync/model/model_type_sync_bridge.h
[PasswordCheckExample]: https://cs.chromium.org/chromium/src/components/password_manager/core/browser/sync/password_sync_bridge.cc;l=904;drc=d149054a527b4fae61477ce9c338aeff64273d06
[SyncStartupTest]: https://chromium-review.googlesource.com/c/chromium/src/+/3773600

## Integration test
Add a [`Sync integration test`][SyncCachingTest] for the caching / trimming flow.

[SyncCachingTest]: https://chromium-review.googlesource.com/c/chromium/src/+/3638012

## Limitations

### Sync horizon
The proposed solution is intended to be a long-term one, but it will take some
time until it can be used reliably. This is due to the fact that it requires
clients to actually have the introduced code (enabled in M106) and the Sync
horizon is pretty long.

### Older clients
Fields introduced before M106 will not be able to utilize this protection.

### Deprecating a field
Deprecated fields should still be treated as supported to prevent their
unnecessary caching.

### Migrating a field
This requires client-side handling as the newer clients will have both fields
present and the legacy clients will have access to the deprecated field only.
Newer clients should:
* Keep filling the deprecated field for legacy clients to use
* Add a logic to pick a correct value from a deprecated and new field to
  account for updates from legacy clients

### Repeated fields
No client-side logic is required - the solution will work by default.

### Nested fields
Protecting nested fields is possible, but requires adding client-side logic to
trim single child fields or the top level field if none of the child fields are
populated (Passwords notes [`example`][NotesExample]).

[NotesExample]: https://source.chromium.org/chromium/chromium/src/+/main:components/password_manager/core/browser/sync/password_proto_utils.cc;l=29-64;drc=0495165c40e1bfad00d7a84474cfb8025e6d4a7c