---
breadcrumbs:
- - /chromium-os/developer-library/guides
  - Chromium OS > Developer Library > Guides
page_name: downstreaming
title: Downstreaming coreboot into the Chromium repo.
---

[TOC]

## What is downstreaming?
* We have a need to maintain forks of third-party projects:
    * Hold back breaking changes (or revert them if they happen to land).
    * Resolve cross-project dependencies in our code.
    * Maintain local patches.
* ChromiumOS is an upstream-first project :-)
    * You should always land your changes upstream before we should apply them
    to our forks.
* Terminology:
    * Upstream: The official source tree of the third-party project.
    * Downstream: Our fork of that tree.
    * Dowstreaming: The process of applying commits from upstream to downstream.

## What if my change can't be submitted upstream?
* In general chromeOS has a strong upstream first philosophy.  If you can’t
upstream your change, it’s worth considering if there’s another solution or if
this is actually desired.
* Temporary changes:
    * Temporary changes may be required to workaround known issues during
    bringup.
        * Ideally we would still submit these changes upstream with
        documentation and a TODO with an open bug number
        * If that can’t be done (For example the change is in common code) an
        ebuild can be modified within the chromium repo to apply patches locally
            * See crrev/i/5994551 for an example
* Permanent changes:
    * There are few reasons to do this, but some may be to apply blobs for an
    unreleased SoC or to facilitate an embargo.  In this case, the changes can
    be applied to a private overlay and appended to the build.
        * See crrev/i/5866621 for an example

## Downstreaming Organization
There’s a Google internal [downstreaming rotation] to facilitate the
downstreaming process.

* You must be an owner of src/third_party/coreboot to help with the downstream
rotation.  You can put a CL up to add yourself to [OWNERS.cros_ap]

## Downstreaming Process
The downstreaming process is separated into two steps.
1. Copybot
[Copybot] is a custom tool made by the Zephyr team for handling the task of
pulling commits from an external repo into Gerrit. The tool was developed as the
Zephyr team was having very similar issues with [Copybara] as coreboot was.

In general, Copybot functions in a very similar manner as Copybara does, with
the exception that it does cherry-picks instead of resetting the tree
iteratively. Copybot also has some controls to make it ignore certain CLs when
you need it to be a little more forgiving.

### Running Copybot
In general, you probably won't need to run Copybot yourself. It runs nightly
automatically at ~4:30 AM MT. Our instance, with a few others, can be observed
on [go/cros-luci].  See [copybot.star] for configuration information for the
builders.

Should it be required, you can manually trigger a run using the “trigger” button
on the builder page.

1. Review/submission
    a. Manual
        1. Check the status of the coreboot copybot jobs(links above)
            a. If there are failures, resolve them to ensure no CLs are missed
            (copybot will skip commits with merge conflicts)
        1. Check daily for [new CLs from Copybot].
        1. Mark the CLs CR+2. From the Gerrit CLI:
            ```bash
            gerrit label-cr $(gerrit --raw search 'hashtag:coreboot-downstream status:open -hashtag:copybot-skip') 2
            ```
        1. Send the CLs to the Commit Queue. From the Gerrit CLI:
            ```bash
            gerrit label-cq $(gerrit --raw search 'hashtag:coreboot-downstream status:open -hashtag:copybot-skip') 2
            ```
            a. Note: LUCI and the CQ can trip-up when there's ~80+ CLs. If
            there's a long backlog, it's recommended to send about 60-80 at a time.
        1. Monitor for CQ failures or other aspects of attention.
    b. Script
        [coreboot_downstream.py] performs steps 1-3 from the manual steps above.
        Run it from the full chromite path
        1. Dry run what the script would do with
        ```bash
        ./coreboot_downstream --dry-run
        ```
        1. To clear all the downstreaming CLs from your attention list:
        ```bash
        ./coreboot_downstream clear_attention
        ```
        (or)
        ```bash
        for cr in $(gerrit --raw search 'hashtag:coreboot-downstream attention:me'); do gerrit attention --ne $cr ~$USER@google.com; done
        ```
        1. When CQ fails midstack
            a. Downstream up to that commit using:
            ```bash
            coreboot_downstream --limit {NUMBER_OF_CLS}
            ```
            or
            ```bash
            coreboot_downstream --stop-at {GERRIT_CHANGE_ID}
            ```
## Errors
### Merge Conflicts
If there's a merge conflict when cherry-picking, the downstreamer will get a
"build failed" email. If you are not getting the emails, ensure you are included
in the coreboot_notify_list inside [copybot.star].  The downstreamer should
click the link in the failure e-mail, and there'll be a list of failed commits
at the very bottom of the log. Please manually cherry-pick these CLs, resolve
the merge conflicts, and upload them.

* If there is a reason to not downstream the conflicted CL, manually upload
the conlficted change(resolved or not) and apply the skip configuration
(See Skipping CLs below).

* Merge conflicts may manifest as missing CLs in the downstream queue.  If you
feel a change is missing, file a bug or reach out to the current downstreamer.

### Skipping CLs
Suppose you've identified a problematic CL in the chain that you want to pull
out or manually tweak to get working. Add the Gerrit hashtag `copybot-skip` to
the CL in the Chromium Gerrit, and be sure to leave the upstream commit hash
somewhere in the commit message (if the CL was originally created by copybot,
it should already have this).

On the next run of copybot, it will skip over the CL and not attempt to upload
over your changes. Should you want copybot to go back to doing what it normally
does, just remove the hashtag.

### Out of sequence cherry-pick
Merge conflicts may occur due to out of sequence cherry-picking.  This is due
to the method in which copybot finds the last merged CL in Chromium, and finds
it in the upstream repository.  Once the CL is found, copybot will attempt to
cherry-pick each upstream CL into the chromium repo until it reaches the
upstream HEAD.  Should this occur, find the first unmerged CL in the upstream
repo and manually cherry-pick it into chromium and be sure to leave the upstream
commit hash somewhere in the commit message.  Once this change lands, copybot
should once again work normally.

### Hypothetical issue:
1. copybot runs at 9 AM and copies commit chain A over
1. copybot is manually triggered at noon and copies commit chain B over

1. commit chain B lands in chromium before commit chain A

1. Since commit chain A is earlier in the history than commit chain B, copybot
will start at the end of commit chain A, and attempt to cherry-pick the entire
chain B again causing empty conflicts

#### Log example:
```bash
2023-09-07 03:36:40,384 INFO: Last merged revision: 1b25422215279191da7f71840da7214fbcb22b9c << This is where copybot will start(Note that this hash is truncated)
2023-09-07 03:36:41,325 INFO: Run `git -C /b/s/w/ir/x/t/tmpc93n4kr9.copybot --no-pager log 0cd2a50727093d06b53039e7be5f341800c31fbe --format=%H`
2023-09-07 03:36:42,390 INFO: Run `git -C /b/s/w/ir/x/t/tmpc93n4kr9.copybot --no-pager show --pretty= --name-only 0cd2a50727093d06b53039e7be5f341800c31fbe`
2023-09-07 03:36:42,403 INFO: Run `git -C /b/s/w/ir/x/t/tmpc93n4kr9.copybot --no-pager show --pretty= --name-only 7c04d0e6fdaedaf6ee336485df939963fa6c0c1a`
2023-09-07 03:36:42,714 INFO: Run `git -C /b/s/w/ir/x/t/tmpc93n4kr9.copybot --no-pager show --pretty= --name-only e6a5e6cefbc78ef55cc0471b91aa2af2734c1139`
2023-09-07 03:36:42,728 INFO: Run `git -C /b/s/w/ir/x/t/tmpc93n4kr9.copybot --no-pager show --pretty= --name-only 1b96bff27ea98593f28e1bd60b3ee8e727841d2a` << Chromium ToT
2023-09-07 03:36:42,742 INFO: Run `git -C /b/s/w/ir/x/t/tmpc93n4kr9.copybot --no-pager show --pretty= --name-only 5c35d30ffc7382af46b62044a5cf5326b1e57708`
2023-09-07 03:36:42,755 INFO: Run `git -C /b/s/w/ir/x/t/tmpc93n4kr9.copybot --no-pager show --pretty= --name-only 7de2fa3c7fabd2ff02e261c66f09c5e2ff989c07`
2023-09-07 03:36:42,879 INFO: Run `git -C /b/s/w/ir/x/t/tmpc93n4kr9.copybot --no-pager show --pretty= --name-only 208cbdb6af078851915a491b8415c914646eb0c8`
2023-09-07 03:36:42,893 INFO: Run `git -C /b/s/w/ir/x/t/tmpc93n4kr9.copybot --no-pager show --pretty= --name-only eefdfb5c179cb42556d4f82b9f56eb08f1dd0700` << Bottom of CL chain for chromium ToT
2023-09-07 03:36:42,907 INFO: Run `git -C /b/s/w/ir/x/t/tmpc93n4kr9.copybot --no-pager show --pretty= --name-only 96f7bd13180f284ae0dd700f3bd73a6b61139846`
2023-09-07 03:36:42,920 INFO: Run `git -C /b/s/w/ir/x/t/tmpc93n4kr9.copybot --no-pager show --pretty= --name-only 2aeb6e405aea8740f87185158598f2af50390904`
2023-09-07 03:36:43,131 INFO: Skip commit db48680ebcfbd3617fef954129b3234a7aebbc4e due to empty file list after filtering (before filtering was ['3rdparty/amd_blobs'])
2023-09-07 03:36:43,132 INFO: Run `git -C /b/s/w/ir/x/t/tmpc93n4kr9.copybot --no-pager show --pretty= --name-only 4c88d105d0f4182a9fdbd79d08aa432cbc75196a`
2023-09-07 03:36:43,146 INFO: Run `git -C /b/s/w/ir/x/t/tmpc93n4kr9.copybot --no-pager show --pretty= --name-only b41d48a09c27ec24ea780d9415ed61369f31fb59`
2023-09-07 03:36:43,392 INFO: Run `git -C /b/s/w/ir/x/t/tmpc93n4kr9.copybot --no-pager checkout ad1b5f1fef86f929626575bda7b038c939af80cc` << Merged after the above listed chromium ToT
```

[Copybara]: https://g3doc.corp.google.com/devtools/copybara/g3doc/index.md?cl=head
[Copybot]: https://chromium.googlesource.com/chromiumos/platform/dev-util/+/HEAD/contrib/copybot
[copybot.star]: https://source.corp.google.com/h/chrome-internal/chromeos/codesearch/+/main:infra/config/misc_builders/copybot.star
[coreboot_downstream.py]: https://source.chromium.org/chromiumos/chromiumos/codesearch/+/main:chromite/contrib/copybot_downstream_config/coreboot_downstream.py
[downstreaming rotation]: https://rotations.corp.google.com/rotation/6734101192114176
[OWNERS.cros_ap]: https://source.corp.google.com/h/chrome-internal/chromeos/codesearch/+/main:owners/firmware/OWNERS.cros_ap
[go/cros-luci]: https://luci-scheduler.appspot.com/jobs/chromeos
[new CLs from Copybot]: https://chromium-review.googlesource.com/q/hashtag:coreboot-downstream+status:open