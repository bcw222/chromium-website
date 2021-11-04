---
breadcrumbs:
- - /chromium-os
  - Chromium OS
page_name: developer-information-for-chrome-os-devices
title: Developer Information for Chrome OS Devices
---

## Introduction

This page provides developer-related information for Chrome devices. These are
systems that *shipped from the factory* with Google Chrome OS on them. For
details about Google Chrome OS and how it differs from Chromium OS, see the
[note in the FAQ about Google Chrome
OS](http://www.chromium.org/chromium-os/chromium-os-faq#TOC-What-s-the-difference-between-Chrom).
Chrome OS devices typically require special setup in order to be used for
Chromium OS development.

**Caution: Modifications you make to the system are not supported by Google, may
cause hardware, software or security issues and may void warranty.**

> Remember: Chrome OS devices are **not** general-purpose PCs. We believe you
> should be able to hack on your own property, but if you do it's not our fault
> if something breaks.

Googlers not finding what they're looking for may want to look at
[go/cros-names](http://goto.google.com/cros-names).

### End of Life (EOL) / Auto Update Expiration (AUE)

The [official Google policy](https://support.google.com/chrome/a/answer/6220366)
includes projected dates. Here we focus on the corresponding release versions as
that is often more useful to developers.

## Routers

These WiFi routers are marketed as [OnHub](https://on.google.com/hub/), [Google
Wifi](https://store.google.com/us/product/google_wifi), and [Nest
Wifi](https://store.google.com/us/product/nest_wifi).

<table>
<tr>
<td> <b>Release date</b></td>
<td><b> Manufacturer</b></td>
<td><b> Model</b></td>
<td><b> Project code name</b></td>
<td><b> Board name(s)</b></td>
<td> <b>Base board</b></td>
</tr>
<tr>
<td> August 2015</td>
<td> TP-LINK</td>
<td> <a href="/chromium-os/developer-information-for-chrome-os-devices/tp-link-onhub-tgr1900">OnHub Router TGR1900</a></td>
<td> Whirlwind</td>
<td> whirlwind</td>
<td> storm</td>
</tr>
<tr>
<td> November 2015</td>
<td> ASUS</td>
<td> OnHub SRT-AC1900</td>
<td> Arkham</td>
<td> arkham</td>
<td> storm</td>
</tr>
<tr>
<td> November 2016</td>
<td> Google</td>
<td> <a href="https://madeby.google.com/wifi/">Google WiFi</a></td>
<td> Gale</td>
<td> gale</td>
<td> gale</td>
</tr>
<tr>
<td> November 2019</td>
<td> Google</td>
<td> <a href="https://store.google.com/us/product/nest_wifi">Nest Wifi router</a> (not "point")</td>
<td> Mistral</td>
<td> mistral</td>
<td> mistral</td>
</tr>
</table>

## USB Type-C

<table>
<tr>
<td><b>Release date</b></td>
<td><b> Model</b></td>
<td><b> Board name(s)</b></td>
</tr>
<tr>
<td> January 2015</td>
<td> <a href="/chromium-os/dingdong">USB Type-C to DP Adapter</a></td>
<td> dingdong</td>
</tr>
<tr>
<td> January 2015</td>
<td> <a href="/chromium-os/hoho">USB Type-C to HDMI Adapter</a></td>
<td> hoho</td>
</tr>
<tr>
<td> January 2015</td>
<td> USB Type-C to VGA Adapter</td>
<td> hoho, but substitute a DP to VGA chip</td>
</tr>
<tr>
<td> January 2015</td>
<td> <a href="/chromium-os/twinkie">USB-PD Sniffer</a></td>
<td> twinkie</td>
</tr>
</table>

## Notebooks and Desktops

These are your standard Chromebook/Chromebox/etc devices.