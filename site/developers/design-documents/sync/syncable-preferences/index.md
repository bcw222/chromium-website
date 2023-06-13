---
breadcrumbs:
- - /developers
  - For Developers
- - /developers/design-documents
  - Design Documents
- - /developers/design-documents/sync
  - Sync
page_name: syncable-preferences
title: Syncable preferences
---

## Background

Preferences are a generic system for storing configuration parameters in Chrome,
see [Preferences]. Individual preferences may be declared as syncable, meaning
they will propagate across signed-in/syncing devices from the same user.

## Adding syncable preferences

Making a pref syncable requires a few things:
* Specify appropriate [PrefRegistrationFlags] to the `Register*Pref` call.
* Add an entry to the appropriate [SyncablePrefsDatabase]:
  `ChromeSyncablePrefsDatabase` if the pref is in `chrome/`,
  `IOSChromeSyncablePrefsDatabase` if it's in `ios/chrome/`, or
  `CommonSyncablePrefsDatabase` if it's cross-platform.
* **Important**: Adding syncable prefs may have privacy impact.
  * Most commonly, if the pref contains URLs (example: site permissions), it
    **must** be marked as `is_history_opt_in_required = true`, and it will only
    be synced if the user has opted in to history sync.
  * In any other cases that are unclear or questionable, reach out to
    chrome-privacy-core@google.com, or to rainhard@ directly.

[Preferences]: https://www.chromium.org/developers/design-documents/preferences/
[PrefRegistrationFlags]: https://source.chromium.org/chromium/chromium/src/+/main:components/pref_registry/pref_registry_syncable.h?q=PrefRegistrationFlags
[SyncablePrefsDatabase]: https://source.chromium.org/chromium/chromium/src/+/refs/heads/main:components/sync_preferences/syncable_prefs_database.h
