---
breadcrumbs:
- - /developers
  - For Developers
page_name: webui
title: Creating Chrome WebUI Interfaces
---

### General guidelines
When creating or modifying WebUI resources, follow the [Web
Development Style Guide](/developers/web-development-style-guide)

A general explaination of how WebUI works (including interaction between
C++ and TypeScript code) can be found in the [WebUI Explainer](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/webui_explainer.md)

### Creating a new WebUI
There are a few questions to answer before creating a new WebUI:
(1) What will the UI be used for, and who will use it? 
(2) How long is the UI needed? While most user facing WebUIs are kept indefinitely,
    it's possible for debug UIs to only be a temporary need.
(3) What is the expected size/complexity of the new UI?
(4) What existing shared WebUI resources/infrastructure can or should it use?
(5) Is the WebUI needed on all platforms? Android, iOS, and ChromeOS differ from
    Windows/Mac/Linux in terms of what shared resources are available.
(6) Who will maintain the WebUI going forward? Each new WebUI should have an
    OWNERS file listing individuals or teams that the WebUI team can contact 
    regarding any deprecations, updates to best practices, etc. Debug UIs
    specifically will be allowed to break (any relevant tests will be disabled),
    and may possibly even be deleted, if infrastructure updates are required and
    no one responsible for the page is reachable or responsive.

For user visible UIs, most or all of these questions will typically be anwswered
during the feature launch process. For debug UIs, expect to address these questions
during code review.

A detailed example of how to create a WebUI in chrome/can be found at
[Creating WebUI interfaces in chrome](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/webui_in_chrome.md)
If you are building a WebUI under components/ then see [Creating WebUI
Interfaces in
components](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/webui_in_components.md)

If you need additional information or guidance in setting up the BUILD.gn file to
build your WebUI, there is detailed information and additional examples for BUILD
files specifically at [WebUI Build Configurations](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/webui_build_configuration.md)
