---
breadcrumbs:
- - /chromium-os
  - Chromium OS
- - /chromium-os/how-tos-and-troubleshooting
  - How Tos and Troubleshooting
page_name: custom-firmware
title: Custom Firmware on ChromiumOS devices
---

All recent ChromiumOS devices have shipped with a [Coreboot]-based
BIOS.  This document describes how you can compile that BIOS from
source and make customizations to your BIOS.

**Warning:** Installing custom firmware on your device could leave you
with a brick.  Do not proceed if you're not OK with this possibility.

## Overview of ChromiumOS Firmware

Instead of using a [UEFI]-based BIOS like most Windows devices come
with, ChromiumOS devices use an alternative firmware stack designed
with security in mind.  This boot process is called [Verified Boot].

If you want to boot a Linux-based OS on a Chromebook, and you'd like
to use [Verified Boot], it's easy to configure your distribution to
sign your kernel with `vbutil_kernel`.  For example, if you use Arch
Linux, you could write a Pacman hook to do this.

However, maybe you want something else.  Perhaps you want to use UEFI
on your Chromebook so you could attempt to boot an OS that expects
[UEFI].  Maybe you prefer [SeaBIOS].  Maybe you want to check out
[LinuxBoot].  That's what this guide is here for.

Architecturally, the ChromiumOS BIOS consists of a few components:

- [Coreboot] is the [First-stage boot loader].  It initializes the
  hardware, and sets up the system so it's ready for a less
  hardware-specific payload.
- [Depthcharge] is a Coreboot payload.  It implements the UI seen in
  the firmware screens, and jumps to the kernel.
- [vboot] is a library used by Depthcharge to do the heavy lifting,
  and is Google's reference implementation of [Verified Boot].

Coreboot is not fundamentally tied to this architecture.  Should you
want to use a payload other than Depthcharge plus vboot, that's
entirely possible.

Our firmware architecture already allows you to jump to an alternative
payload instead of vboot.  This is called "altfw" or "legacy BIOS".
This is a small read-write region you can place a payload of your
liking.  Most ChromiumOS devices already come with one or more
payloads here such as [SeaBIOS], [EDK2 TianoCore], or [u-boot],
however, these alternative payloads are not always tested and may ship
broken, so it's best you replace it with a payload you create.  See
[Running an alternative bootloader].

## Working with the Firmware on your Chromebook

To start out, you'll want to enter [Developer Mode] and [disable write
protect].  You'll then be able to access your system's flash using the
[flashrom] utility.

### Backup Your Firmware

Before you do anything else, it's advisable to read a backup of your
system's firmware so you can later restore to this state, should you
desire.

Note that on some platforms (e.g., Intel), you may not be able to read
and write all regions of the flash from the OS, and may need to use an
external programmer to get a complete backup.  Below is an example of
doing this using a [SuzyQable] as an external programmer:

``` shellsession
# flashrom -p raiden_debug_spi:target=AP -r backup.bin
```

If your device is older and does not support Closed Case Debugging
(see the [devices table]), you won't be able to use a [SuzyQable] to
interface with the flash externally.  If you're re-programming the
firmware on your device, you're going to want to make sure you have a
route to read and write the firmware even if you're not able to boot
an OS: this will help make sure you can restore your device if you
flash a firmware image which cannot boot.  You could consider an
external SPI flash programmer, such as a CH341A, a [Bus Pirate], or a
[DediProg].  Usage of these tools requires electrical knowledge.  Be
sure to look up the datasheet for the chip you're programming, and
ensure it's compatible with the programmer you're using.

### Writing your Firmware

However you just read your firmware, if you used the [flashrom] tool,
changing the `-r` flag to `-w` should do a write.

It is recommended to try the read/erase/write cycle with your external
programmer at least once with the image it already has so you can
validate your flashing setup before flashing a custom image.

## Getting Started with Coreboot

You should check out the Coreboot source code and submodules, and
build the toolchain for Coreboot.  See the [Coreboot Tutorial].

## Extracting Firmware Blobs

Most SoC manufacturers have been requiring a significant number of
blobs just to boot up.  Some devices have blobs available publicly in
the [Coreboot blobs repo], however, for most devices, you'll need to
extract it from a firmware image.

You should be able to extract these from the firmware backup you
created earlier.  In case you don't have a working frimware backup,
you can extract a firmware image from the [ChromeOS recovery image]
for your device.  Simply setup the image as a loop device, mount the
rootfs, and extract `/usr/sbin/chromeos-firmwareupdate` (it's just a
ZIP archive).

The blobs you may need are specific to the platform you're building for.

### Intel Platforms

You'll need the ME binary and the flash descriptor.  These can be
extracted using `ifdtool` in the Coreboot repository.  Run:

``` shellsession
ifdtool -p <platform> -x <filename>
```

This will create a number of files in your current directory.  Save
aside the descriptor and the ME binary for later.

Check the mainboard directory for your device to see if a `data.vbt`
file has been checked into the Coreboot tree.  If not, you'll need to
extract `vbt.bin` from CBFS from your firmware image.  To do so:

``` shellsession
cbfstool <filename> extract -n vbt.bin -f vbt.bin
```

### Other Platforms

Please help contribute info on blobs needed for other platforms!

## Configuring Coreboot

Run `make menuconfig` in the coreboot repository to get to the Kconfig
TUI.  Go to `Mainboard` and select your device.

Next, work through each of the config menus and set the options you
want.  Note the blobs you extracted earlier: you'll need to set each
of the config options associated with these blobs to the paths you
saved them at.

For configuring your payload, if you want a UEFI BIOS, select the
`TianoCore's EDK II payload`.  If you'd prefer something else,
configure it as you like!

## Building Coreboot

Next, run `make`.  If all is well, you should have an image at
`build/coreboot.rom` for testing.

## Troubleshooting

You might not always get a working image.  Here's some things to
consider:

- It's possible that upstream Coreboot is currently broken for your
  device.  If you want to build from the firmware branch that was made
  for your device, check out the apporpriate `firmware-*` branch for
  your device from the [Chromium Gerrit Coreboot fork].
- Try building serial firmware (`CONFIG_CONSOLE_SERIAL`).  Do you see
  log output?  What's failing?
- If you're not getting any serial output at all, it could be that
  Coreboot wasn't even loaded at all before the failure happened.  You
  might want to check you have all the blobs you need for your
  platform and that they're valid.  For example, on an Intel platform,
  check your `descriptor.bin` and `me.bin`.

[Bus Pirate]: http://dangerousprototypes.com/docs/Bus_Pirate
[ChromeOS recovery image]: https://chromiumdash.appspot.com/serving-builds?deviceCategory=ChromeOS
[Chromium Gerrit Coreboot fork]: https://chromium.googlesource.com/chromiumos/third_party/coreboot
[Coreboot Tutorial]: https://doc.coreboot.org/tutorial/part1.html
[Coreboot blobs repo]: https://review.coreboot.org/plugins/gitiles/blobs
[Coreboot]: https://www.coreboot.org
[DediProg]: https://www.dediprog.com/category/spi-nor-flash-device-programmer
[Depthcharge]: https://chromium.googlesource.com/chromiumos/platform/depthcharge
[Developer Mode]: https://chromium.googlesource.com/chromiumos/docs/+/HEAD/developer_mode.md
[EDK2 TianoCore]: https://github.com/tianocore/edk2
[First-stage boot loader]: https://en.wikipedia.org/wiki/Bootloader#First-stage_boot_loader
[LinuxBoot]: https://www.linuxboot.org/
[Running an alternative bootloader]: https://chromium.googlesource.com/chromiumos/docs/+/HEAD/developer_mode.md#alt-firmware
[SeaBIOS]: https://www.seabios.org/SeaBIOS
[SuzyQable]: https://chromium.googlesource.com/chromiumos/third_party/hdctools/+/HEAD/docs/ccd.md#suzyq-suzyqable
[UEFI]: https://en.wikipedia.org/wiki/UEFI
[Verified Boot]: ../verified-boot
[devices table]: ../developer-information-for-chrome-os-devices
[disable write protect]: https://chromium.googlesource.com/chromiumos/docs/+/HEAD/write_protection.md
[flashrom]: https://flashrom.org
[u-boot]: https://u-boot.readthedocs.io/en/latest/
[vboot]: https://chromium.googlesource.com/chromiumos/platform/vboot_reference
