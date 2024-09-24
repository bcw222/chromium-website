--------------------------------------------------------------------------------

breadcrumbs: - - /developers - For Developers - - /developers/design-documents -
Design Documents - - /developers/design-documents/sync - Sync page_name:
sync-data-best-practices

## title: Sync Data Best Practices (Needs update)

[The new sync API](/developers/design-documents/sync/syncable-service-api) uses
protobufs to communicate with Chrome services, which is nice because protobufs
were written to be robust against protocol changes (see
[protobuf docs](http://code.google.com/apis/protocolbuffers/docs/overview.html)
for details). However, once you start syncing data, changing your protobuf
format isn't completely painless; not only can sync users upgrade from one
Chrome version to another, but they may have different Chrome versions running
at the same time! Fortunately, there are some best practices to help make it
easy. There are listed in the
[Sync Protocol Style guide](https://source.chromium.org/chromium/chromium/src/+/main:components/sync/protocol/README.md;drc=417cbbe33bf13e2ac63d15994f539aa810c2aae8).
