---
breadcrumbs:
- - /chromium-os
  - Chromium OS
- - /chromium-os/build
  - Chromium OS Build
page_name: add-sdk-package
title: Adding a Package to the SDK
---

## Add the Package

When adding a package to the SDK, start by following the
[New & Upgrade Package Process](https://chromium.googlesource.com/chromiumos/docs/+/HEAD/portage/package_upgrade_process.md)
guide if it is a third-party package that doesn’t yet exist in the source tree
(short version: use `cros_portage_upgrade` to pull the package from upstream).
Once the package is in place, add it as a dependency to the
[virtual/target-chromium-os-sdk](https://chromium.googlesource.com/chromiumos/overlays/chromiumos-overlay/+/refs/heads/main/virtual/target-chromium-os-sdk/target-chromium-os-sdk-9999.ebuild)
ebuild to be automatically installed as part of the SDK.

Do note that because virtual/target-chromium-os-sdk is a cros-workon package,
before adding the dependency, run:

```
cros-workon --host start virtual/target-chromium-os-sdk
```

## Test the Package

To install the new package to test against (e.g. to run commands/tools, check
behavior, etc.):

```
sudo emerge <package name>
```

To test the new package is installed correctly as part of the SDK, update the
chroot:

```
update_chroot
```

### Unit testing

To run the unit tests for the new package, run:

```
cros_run_unit_tests --host --packages <package name>
```

As long as the package is in the virtual/target-chromium-os-sdk dependency tree,
the unit tests will automatically be run on the SDK as part of the
host-packages-cq builder in CQ.

### Test with the SDK Builder

To test building the SDK itself with the new package, for running the entire SDK
builder process, run an SDK builder tryjob:

```
cros tryjob -g <cl 1> [-g ...] chromiumos-sdk-tryjob
```

Or, to just build the SDK board locally:

```
~/chromiumos/src/scripts/build_sdk_board
```
