---
breadcrumbs:
- - /developers
  - For Developers
- - /developers/contributing-code
  - Contributing Code
page_name: direct-commit
title: Directly committing code
---

[TOC]

When [contributing code](/developers/contributing-code) to Chromium, the last
step in the life of a change list is committing it, after which it's closed.

The preferred way of committing changes is via the [commit
queue](/developers/testing/commit-queue).

However, in certain circumstances it is acceptable or necessary to directly
commit your change, bypassing the commit queue. This is discouraged however, due
to not running the tests (hence higher risk of breakage), and requires more
supervision on the part of the committer.

Generally directly committing should only be done if the CQ itself is broken, or
the CL cannot be processed by the CQ.

If you wish to skip the tree status checks, but otherwise use the CQ, you can
use `NOTREECHECKS=true` in the Rietveld issue description, though this is
obviously **strongly discouraged.** The primary use case is if the tree is
closed due to some breakage, and you wish to commit a change that will fix the
breakage.

`NOTRY` and `NOTREECHECKS` are flags for the CQ: you still commit by clicking
the "Commit" box.

**In a nutshell:**

*   Before:
    *   Have the change reviewed per usual process [contributing
                code](/developers/contributing-code), with an issue and
                description on Rietveld, and sufficient LGTMs or TBRs (since
                presubmit OWNERS approval test isn't run when directly
                committing).
    *   Run tests manually, both locally and using the [try
                server](/developers/testing/try-server-usage) for other
                platforms, to reduce risk of breakage (since try jobs aren't run
                when directly committing). Try jobs can be run individually via
                Rietveld, while the standard set can be run from the command
                line via `git try`.
    *   Join relevant communication channels (Slack/[#chromium IRC
                channel](/developers/irc)), so that sheriffs can notify you of
                possible breakages.
    *   Check that the tree is open (green): [Chromium Tree
                Status](http://chromium-status.appspot.com/) :: [Blink Tree
                Status](http://blink-status.appspot.com/)
*   During:
    *   Double-check that the tree is open.
    *   Commit as per below, preferably using `git-cl`.
*   After:
    *   See if there are any immediate messages on IRC.
    *   Stay on Slack/IRC for an hour or so in case anything happen
                afterwards.

In case of **emergencies**, please remember to at least:

*   Create a Rietveld issue for description and reference.
*   List OWNERS in `TBR` (assuming no time for review).
*   Join Slack/#sheriffing, explain what's happening, and make sure
            there are no immediate objections.

**Tree closure:** If the most recent set of changes to the repository breaks the
build, we say the tree is red, or closed. You cannot check in your changes until
it is green again. You can check the status via apps at [Chromium Tree
Status](http://chromium-status.appspot.com/) or [Blink Tree
Status](http://blink-status.appspot.com/). More low-level, you can check the
waterfalls ([Chromium](http://build.chromium.org/buildbot/waterfall/console) |
[Chromium OS](http://build.chromium.org/buildbot/chromiumos/waterfall)) to see
that the columns are mostly green before checking in your changes. Otherwise,
you will not know if your changes break the build or not.

## Reasons

Good reasons to directly commit code:

*   You are reverting at previous change that broke the build (so the
            tree is closed) and the CQ is down – if the CQ is up, please use
            `NOTRY` and `NOTREECHECKS` instead.
*   The change can't be processed by the commit queue (see
            [Build-CommitQueue](https://code.google.com/p/chromium/issues/list)
            bugs), such as changing file permissions (Issue
            [162196](https://code.google.com/p/chromium/issues/detail)).

Marginal reasons to directly commit code:

*   A [presubmit
            script](/developers/how-tos/depottools/presubmit-scripts) is
            failing.
    *   If the failure is a false positive, if at all possible, please
                fix the script instead.
*   The change is very big (e.g., large-scale formatting changes or
            renaming), so by the time it's finished uploading to Rietveld the
            patch is out of date and won't apply when the CQ tries it.
    *   If at all possible, try breaking up the patch and landing
                normally. Even innocuous-looking changes can cause breakages.

Bad reasons to directly commit code:

*   The commit queue is too slow (unless the slowness means the change
            is out of date by the time it is processed) – please be patient.
*   The commit queue is down or stalled – please be patient.
*   The tree is closed but you want to commit it anyway – please wait
            for tree to reopen, or use `NOTREECHECKS=true` if the CL needs to be
            committed while the tree is closed.

## Commands

### **git cl land (for git repos)**

```none
git cl land
```

This command commits the current changelist via git directly. You should use
this command if you are in a real git repo, such as the chromium repo. You can
pass --bypass-hooks if something is wrong with the presubmit hooks or they are
blocking an emergency submit.

### For ChromiumOS:

```none
git cl push
```

### Committing a patch for a non-committer

First [check that the non-committer has signed the
CLA/CCLA](/developers/contributing-code/external-contributor-checklist) and are
listed in the AUTHORS and CL Description.

*   git cl patch &lt;code review issue number&gt;
    *   This command will download the patch from the code review
                website, apply the patch, and set the issue number.
*   If you work on chrome:
    *   git cl try # and wait for green bots
    *   git cl land -c 'Joe Noncommiter &lt;hackosaurus@hotmail.com&gt;'
*   If you work on chromeos:
    *   git commit --amend -s --author="$AUTHOR_NAME
                &lt;$AUTHOR_EMAIL&gt;"
    *   git cl push -c
*   You're done!