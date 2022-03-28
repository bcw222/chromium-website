---
breadcrumbs:
- - /developers
  - For Developers
page_name: shutdown
title: Shutdown
---

[TOC]

## Profile Destruction

Since M98, a `Profile` can be deleted at any point, not just at Browser Process
shutdown. We accomplish this via refcounting: `ScopedProfileKeepAlive` is a
strong ref, and `ProfileManager` holds the refcount for each `Profile`.

This behavior is controlled by the `DestroyProfileOnBrowserClose` feature.

* An event is received that leads to `~ScopedKeepAlive` (closing the window,
  closing the last tab, PWA window closed, etc).
* `~ScopedProfileKeepAlive` posts `ProfileManager::RemoveKeepAlive()` on the UI
  thread.
* `ProfileManager::RemoveKeepAlive()` decrements the refcount. If it reaches
  zero, then we begin Profile destruction immediately.
* `BrowserContext::NotifyWillBeDestroyed()` is called.
* `ProfileObserver::OnProfileWillBeDestroyed()` is called.
* Off-the-record profile (if any) goes through shutdown in the same sequence.
* `KeyedService::Shutdown()` is called.
* `KeyedService`s are destroyed.
* `Profile` is destroyed.

Unlike regular `Profile`s, off-the-record `Profile`s are **not** refcounted.
Instead, we destroy them when their last browser window is destroyed.

You can use `ProfileManager` logging to inspect a profile's keepalive state:

```
$ ./out/Default/chrome --enable-logging=stderr --v=0 --vmodule=profile_manager=1
[71002:259:0328/133310.430142:VERBOSE1:profile_manager.cc(1489)] AddKeepAlive(Default, kBrowserWindow). keep_alives=[kWaitingForFirstBrowserWindow (1), kBrowserWindow (1)]
[71002:259:0328/133310.430177:VERBOSE1:profile_manager.cc(1543)] ClearFirstBrowserWindowKeepAlive(Default). keep_alives=[kBrowserWindow (1)]
[71002:259:0328/133314.468135:VERBOSE1:profile_manager.cc(1489)] AddKeepAlive(Default, kExtensionUpdater). keep_alives=[kBrowserWindow (1), kExtensionUpdater (1)]
[71002:259:0328/133314.469444:VERBOSE1:profile_manager.cc(1522)] RemoveKeepAlive(Default, kExtensionUpdater). keep_alives=[kBrowserWindow (1)]
[71002:259:0328/133315.396614:VERBOSE1:profile_manager.cc(1489)] AddKeepAlive(Default, kOffTheRecordProfile). keep_alives=[kBrowserWindow (1), kOffTheRecordProfile (1)]
[71002:259:0328/133417.078148:VERBOSE1:profile_manager.cc(1522)] RemoveKeepAlive(Default, kBrowserWindow). keep_alives=[kOffTheRecordProfile (1)]
[71002:259:0328/133442.705250:VERBOSE1:profile_manager.cc(1522)] RemoveKeepAlive(Default, kOffTheRecordProfile). keep_alives=[]
[71002:259:0328/133442.705296:VERBOSE1:profile_manager.cc(1567)] Deleting profile Default
```

## Browser Process Shutdown

`BrowserProcess` is also refcounted, much like `Profile`. `ScopedKeepAlive`
inhibits teardown, and the refcount is managed by `KeepAliveRegistry`.

### Stopping the UI Message Loop

*   A UI event is received that leads to `~ScopedKeepAlive` (closing the window,
            closing the last tab, keyboard shortcut for app termination, etc).
*   If the refcount in `KeepAliveRegistry` drops to zero, then we begin
            application termination.
    *   Note that macOS keeps the application alive even without browser
                windows by adding an extra `ScopedKeepAlive` in `AppController`.
*   If the refcount reaches zero, post a task to the message loop to exit
*   Notification `content::NOTIFICATION_APP_TERMINATING` is broadcast
*   The UI message loop eventually stops running, we exit out of
            `RunUIMessageLoop()`. Note that all other main browser threads are
            still running their message loops. So even though the main (UI)
            thread outlives all other joined browser threads, its `MessageLoop`
            terminates first.

### BrowserProcessImpl deletion

*   After exiting the UI message loop, the shutdown sequence is started
            in BrowserMainParts::RunMainMessageLoopParts, which calls
            PostMainMessageLoopRun.
*   In ChromeBrowserMainParts::PostMainMessageLoopRun:
    *   The ProcessSingleton is released.
    *   MetricsService (which records UMA metrics) is stopped, which:
        *   Creates a log (for future upload) of all remaining metrics.
        *   Records a successful shutdown.
        *   The persistent metrics file, on disk, remains in case other
                    metrics are updated after this point. Any such values will
                    be sent during the next run sometime after Browser startup.
    *   We persist Local State to disk.
    *   We delete g_browser_process, which:
        *   Deletes the ProfileManager (which deletes all the profiles
                    and persists their state, such as Preferences)
        *   Joins the watchdog, IO, CACHE, PROCESS_LAUNCHER threads, in
                    that order
        *   Shuts down the DownloadFileManager and SaveFileManager
        *   Joins the FILE thread
        *   Deletes the ResourceDispatcherHost which joins the WEBKIT
                    thread
        *   Joins the DB thread

### ContentMain() exit

*   The AtExitManager goes out of scope and destroys all
            Singletons/LazyInstances

## Renderer Process Shutdown

### Browser process triggers shutdown via:

*   Closing a tab (explain the sequence of events from UI thread objects
            to the IO thread termination of a renderer process)
