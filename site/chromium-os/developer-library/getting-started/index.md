---
breadcrumbs:
- - /chromium-os/developer-library
  - Chromium OS > Developer Library
page_name: getting-started
title: Getting Started
---

> 🚧 The library is currently under construction. See
> [the CrOS Developer Library Proposal](/chromium-os/developer-library/proposal)
> for more information.

Welcome to Chromium OS development! This guide will help you boostrap your
workflow by making sure you have the right hardware, development environment,
and source checkout. The guide will also step you through building, testing,
uploading and committing code.

If you are familiar with Chromium OS development and have a workstation, jump
ahead to TODO(Checking out the source code). Otherwise continue reading to
understand the high level overview of the Chromium projects and repositories.

## The Chromium projects

The Chromium projects include Chromium and Chromium OS, the open-source projects
behind the Google Chrome browser and Google Chrome OS. Read more about the
Chromium projects at the <a href="https://chromium.org/chromium-projects"
target="_blank">chromium.org home page</a>. Chromium (the browser) and Chromium
OS (the platform) share code due to historical development decisions.

Chrome OS and Chromium OS are two separate products which share the same code
base yet the available features and look-and-feel of each product vary. Chromium
OS is supported by the open source community and Chrome OS is supported by
Google and its partners. Read more about the differences between Chromium OS and
Chrome OS at the <a href="https://chromium.org/chromium-os/chromium-os-faq/"
target="_blank">Chromium OS FAQ</a>.

## Repositories

Chromium OS is developed across two repositories: `chromium` and `chromiumos`.
The `chromium` repository contains implementations of the user-facing surfaces
of Chromium OS, the Chromium browser, and a communication interface with lower
layers of the OS.

These lower layers include components such as the kernel, system daemons,
firmware, and implementations of low-level technologies such as Bluetooth and
WiFi, all of which reside in the `chromiumos` repository.

Links to repositories:

* `chromium`:
  [https://osscs.corp.google.com/chromium](https://osscs.corp.google.com/chromium)
* `chromiumos`:
  [https://osscs.corp.google.com/chromiumos](https://osscs.corp.google.com/chromiumos)

## Development environment

Developing an operating system requires significant resources such as a powerful
workstation to build and debug the system and a Chromium OS device to flash and
test changes.

Head over to the TODO(Development environment) page to understand what hardware
you need and how to configure it in order to develop Chromium OS.

[Next: Development
environment](/chromium-os/developer-library/getting-started/development-environment)