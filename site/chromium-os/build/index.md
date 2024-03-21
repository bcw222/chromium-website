---
breadcrumbs:
- - /chromium-os
  - Chromium OS
page_name: build
title: Chromium OS Build
---

<div class="two-column-container">
<div class="column">

Developer/User documentation pertaining to the Chrome OS build system.

Google-internal documentation can be found linked from the [internal build team
page](http://goto.google.com/cros-build).

#### For Developers

*   [Developer
            guide](http://www.chromium.org/chromium-os/developer-guide)
*   Imaging your device with [Cros
            Flash](/chromium-os/developer-library/reference/tools/cros-flash/)
*   Install packages to your device with [Cros
            Deploy](/chromium-os/developer-library/reference/tools/cros-deploy/)
*   [Adding a Package to the SDK](/chromium-os/build/add-sdk-package)

#### For Sheriffs

*   <http://www.chromium.org/developers/tree-sheriffs/sheriff-details-chromium-os>

#### For Build Contributors and other resources

*   Help writing unittests using [python-mock](/chromium-os/python-mock)
*   [Python style
            guide](/chromium-os/developer-library/reference/style-guides/python)
*   [Chromium OS Developer
            Guide](/chromium-os/developer-library/guides/development/developer-guide/)
*   [Developing Chromium on Chromium
            OS](/chromium-os/developer-library/guides/development/simple-chrome-workflow/)
            ("Simple Chrome")
*   Misc. [developer helper
            scripts](http://www.chromium.org/chromium-os/how-tos-and-troubleshooting/helper-scripts)

*   [Licensing for Chromium OS Package
            Owners](/chromium-os/licensing/licensing-for-chromiumos-package-owners)
*   [Licensing for Chromium OS
            Developers](/chromium-os/licensing/licensing-for-chromiumos-developers)

</div>
<div class="column">

#### Build System Documentation

*   [Portage Build and
            FAQ](/chromium-os/developer-library/guides/portage/ebuild-faq/)
*   Build hacking
    *   [Chroot versioning](/chromium-os/build/chroot_version_hooks)
                (chroot version hooks)
    *   [Clearing all
                binaries](https://sites.google.com/a/google.com/chromeos/for-team-members/build/clear_binaries)
                (e.g. for a toolchain revert)

*   [cbuildbot
            Overview](/chromium-os/developer-library/guides/development/remote-trybots/)
*   Buildbot [Configure/Set
            up](/developers/testing/chromium-build-infrastructure/getting-the-buildbot-source/configuring-your-buildbot)
            (Chrome Infra guide)
*   [Commit Queue overview](/system/errors/NodeNotFound)
*   [Local Trybot](http://www.chromium.org/chromium-os/build/local-trybot-documentation)
*   [Remote trybot](/chromium-os/developer-library/guides/development/remote-trybots/)

#### Build labels

*   [Build-Tools](https://code.google.com/p/chromium/issues/list?can=2&q=Build%3DTools+OS%3DChrome&colspec=ID+Pri+M+Iteration+ReleaseBlock+Cr+Status+Owner+Summary+OS+Modified&x=m&y=releaseblock&cells=tiles)
*   [Build-Tools-Cbuildbot](https://code.google.com/p/chromium/issues/list?can=2&q=Build%3DTools-Cbuildbot&colspec=ID+Pri+M+Iteration+ReleaseBlock+Cr+Status+Owner+Summary+OS+Modified&x=m&y=releaseblock&cells=tiles)
            (file [new issue](http://goto.google.com/cros-cbuildbot-ticket))
*   [Build-Tools-Paygen](https://code.google.com/p/chromium/issues/list?can=2&q=Build%3DTools-Paygen&colspec=ID+Pri+M+Iteration+ReleaseBlock+Cr+Status+Owner+Summary+OS+Modified&x=m&y=releaseblock&cells=tiles)
            (file [new issue](http://goto.google.com/cros-paygen-ticket))
*   [Build-Tools-Portage](https://code.google.com/p/chromium/issues/list?can=2&q=Build%3DTools-Portage&colspec=ID+Pri+M+Iteration+ReleaseBlock+Cr+Status+Owner+Summary+OS+Modified&x=m&y=releaseblock&cells=tiles)
*   [Build-Tools-Pushlive](https://code.google.com/p/chromium/issues/list?can=2&q=Build%3DTools-Pushlive&colspec=ID+Pri+M+Iteration+ReleaseBlock+Cr+Status+Owner+Summary+OS+Modified&x=m&y=releaseblock&cells=tiles)
            (file [new issue](http://goto.google.com/cros-pushlive-ticket))
*   [Build-Tools-SimpleChrome](https://code.google.com/p/chromium/issues/list?can=2&q=Build%3DTools-SimpleChrome&colspec=ID+Pri+M+Iteration+ReleaseBlock+Cr+Status+Owner+Summary+OS+Modified&x=m&y=releaseblock&cells=tiles)
*   [Build-Tools-Trybot](https://code.google.com/p/chromium/issues/list?can=2&q=Build%3DTools-Trybot&colspec=ID+Pri+M+Iteration+ReleaseBlock+Cr+Status+Owner+Summary+OS+Modified&x=m&y=releaseblock&cells=tiles)
*   [Build-Tools
            label=stats](http://goto.google.com/cros-build-stats-tickets) (file
            [new issue](http://goto.google.com/cros-build-stats-ticket))
*   [Cr-OS-Packages](https://code.google.com/p/chromium/issues/list?can=2&q=Cr%3DOS-Packages&colspec=ID+Pri+M+Iteration+ReleaseBlock+Cr+Status+Owner+Summary+OS+Modified&x=m&y=releaseblock&cells=tiles)

Or file a generic Build issue to be triaged by the build team at
[goto.google.com/cros-build-ticket](https://code.google.com/p/chromium/issues/entry?template=Build%20Infrastructure&labels=Build,OS-Chrome,Pri-2&summary=your%20words%20here).

</div>
</div>
