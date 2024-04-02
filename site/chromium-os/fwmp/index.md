---
breadcrumbs:
- - /chromium-os
  - Chromium OS
page_name: fwmp
title: Firmware Management Parameters
---

[TOC]

Firmware Management Parameters (aka FWMP) are optional settings that can be
stored in the TPM to control some aspects of developer mode for developers and
system administrators.

## What's in the FWMP?

The FWMP contains a set of flags and an optional developer key hash.

The flags are as follows:

<table>
<tr>
<td> Flag</td>
<td>Name </td>
<td>Meaning </td>
</tr>
<tr>
<td> 0x01</td>
</tr>
<tr>
<td> 0x02</td>
</tr>
<tr>
<td> 0x04</td>
<td>Enable Ctrl+U to boot from USB.</td>
</tr>
<tr>
<td> 0x08</td>
<td> FWMP_DEV_ENABLE_LEGACY</td>
<td>Enable Ctrl+L to boot from legacy OS</td>
<td>Same effect as 'crossystem dev_boot_legacy=1'</td>
</tr>
<tr>
<td> 0x10</td>
</tr>
<tr>
<td> 0x20</td>
<td> FWMP_DEV_USE_KEY_HASH</td>
</tr>
</table>

The key hash is the SHA-256 of the key data for the kernel key. There isn't a
tidy way to extract this from a keyblock yet; coming soon.

## Setting the FWMP

Use cryptohome to set the FWMP. To do this, the TPM must just have been owned,
or you must know the owner password:

> cryptohome --action=set_firmware_management_parameters
> --flags={flags_as_decimal_or_0xhex}

To remove the FWMP:

> cryptohome --action=remove_firmware_management_parameters

And, of course, you can see what it contains; this works even if you don't know
the owner password:

> cryptohome --action=get_firmware_management_parameters

System administrators can automatically set the FWMP on enterprise-enrolled
devices during the initial device enrollment.

## Removing the FWMP

If you have somehow locked yourself out of your system - say, by setting
wrong hash, all is not lost.

If your Chrome OS device is NOT enterprise-enrolled, Enable developer mode,
recovery your system to a fresh state, then log in. That will automatically
remove the FWMP. And whatever else was on your system.


## I Can't Get Into Developer Mode

If you've enabled developer mode, and you're getting this warning at boot time:


> For more information, see http://www.chromium.org/chromium-os/fwmp

