---
breadcrumbs:
- - /chromium-os
  - Chromium OS
- - /chromium-os/getting-dev-hardware
  - Getting Developer Hardware
page_name: dev-hardware-list
title: Developer Hardware
---

[TOC]

***Warning: This page is for developers who both know how to build Chromium OS
and aren't afraid to take a screwdriver to their computer.***

## Introduction

The list at the bottom of this page is a place for developers to contribute
information about which developer systems are known to run Chromium OS,
including what functionality works and what is broken. Please include details
only on systems based on Chromium OS that **do not require changes to build**
(no additional drivers, new modules, changes to config files, and so on).
Systems listed here need to **run the first time** with the latest, unmodified
Chromium OS source code.

Please note that this list is not an endorsement of any particular system or
hardware. This list is for developers to have systems to test and help other
developers find hardware on which they can develop Chromium OS. We encourage all
hardware vendors to to get their components working with Chromium OS. One of the
best ways to achieve this goal is open-source, high-quality drivers for your
components.

Also note that this list is updated by request; it can get stale, and the
presence of a device here is not a guarantee that Chromium OS will run on it.
(The fact that someone got it to run at one point makes it more likely that one
could get it to run again with a bit of work, though.) If you'd just like to
give Chromium OS a try, your best bet is to run it on a virtual machine, as
described on the [Running a Chromium OS image under
KVM](/chromium-os/how-tos-and-troubleshooting/running-chromeos-image-under-virtual-machines)
page.

If you have questions about getting Chromium OS to run or would like to help get
functionality working for a particular system, please join the [chromium-os-dev
discussion group](http://groups.google.com/group/chromium-os-dev).

### Conventions

The list has the following columns:

<table>
<tr>
Brand & Model Number
<td>A brand and model number that are specific enough to indicate major components, such as which CPU is used</td>
</tr>
<tr>
<td>If "OK", basic wifi functionality works: link comes up and connects to a network (open/WPA). "No" indicates it's known to be broken. "N/A" means not applicable: there is no wifi card. If buying a new machine, try to choose one with working wifi. If you have a machine with non-working wifi, we recommend replacing the mini-PCIe card with an Atheros 9285 or Intel part (most Intel cards work).</td> Wifi
</tr>
<tr>
Trackpad <td>If <a href="/chromium-os/getting-dev-hardware/dev-hardware-list/icon-checkmark.gif"><img alt="image" src="/chromium-os/getting-dev-hardware/dev-hardware-list/icon-checkmark.gif"></a>, the onscreen cursor can be controlled by the system's trackpad</td>
</tr>
<tr>
<td><b>Suspend/Resume</b></td>
<td>If <a href="/chromium-os/getting-dev-hardware/dev-hardware-list/icon-checkmark.gif"><img alt="image" src="/chromium-os/getting-dev-hardware/dev-hardware-list/icon-checkmark.gif"></a>, the system will suspend/resume when the lid is closed/opened or power button is pressed</td>
</tr>
<tr>
Comments & Caveats <td>Other notes about the system that are important for other developers to know</td>
</tr>
<tr>
Contact <td>Manufacturer contact email for hardware related questions about the system and Chromium OS</td>
</tr>
<tr>
<td>Help other developers find this system!</td> Buy Link
</tr>
</table>

If a feature doesn't work (no [<img alt="image"
src="/chromium-os/getting-dev-hardware/dev-hardware-list/icon-checkmark.gif">](/chromium-os/getting-dev-hardware/dev-hardware-list/icon-checkmark.gif)),
add a comment with details on how the feature doesn't work or how to fix it.

### How to edit the list

Anyone signed into an **@chromium.org** address can modify this list. (If you
don't see an **Add item** button below, [sign
in](https://www.google.com/a/UniversalLogin). One way to get an @chromium.org
address is to be a [committer](/getting-involved/become-a-committer).) In the
spirit of wiki, the community is encouraged to remove inaccurate or
unreproducible results. Repeat offenders will suffer the wrath of the wiki gods.

If you do not have an @chromium.org address, feel free to e-mail
[vapier@chromium.org](mailto:vapier@chromium.org) with the details you'd like to
have added below.

Note that all Chrome OS branded devices should also run Chromium OS. We won't
bother enumerating those.

## Developer hardware list