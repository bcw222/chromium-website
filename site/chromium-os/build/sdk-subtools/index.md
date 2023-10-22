---
breadcrumbs:
- - /chromium-os
  - ChromiumOS
- - /chromium-os/build
  - ChromiumOS Build
page_name: sdk-subtools
title: ChromiumOS SDK Subtools
---

[TOC]

## Introduction

ChromeOS Build Infrastructure offers a builder to build "subtools" using the
ChromeOS SDK. A subtool is a portable binary packaged with related files that
can be run on a host machine (linux-amd64), independent of the SDK. Deployment
is typically via CIPD (http://go/luci-cipd).

## Related Work

The [Third Party Packages (3pp)](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/cipd_and_3pp.md) Project offers a similar service for open-source subtools that
have straightforward dependencies and build requirements.

## Creating a Subtool

### The subtools textproto

### Using an ebuild

To add a new package, see (Adding a New Package)[/chromium-os/how-tos-and-troubleshooting/add-a-new-package/].

- eclass

## Contributing to the SDK Subtools Builder
