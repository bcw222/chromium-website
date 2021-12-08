---
breadcrumbs:
- - /developers
  - For Developers
page_name: webview-changes
title: Shipping changes that are webview-friendly
---

Shipping changes to Android WebView requires some extra due-diligence.
Changing features on the web platform should always be done with care, but
here are a few ways WebView is specia:

* Native apps are often built on this technology, who are less likely to use the
  WebView beta program, and in general may pay less attention to the web
  platformthan they do to the Android platform, which has a less frequent and
  different API update & deprecation mechanism.

* Analytics are more difficult to get - UKM is not present, and UMA may be less
  complete as some apps opt-out.

* A/B experiments are less effective, for similar reasons

* There is less engineering effort on this platform, and it is often not top of
  mind for Chromium developers

The kinds of changes that substantially affect WebView are usually the
same kinds that substantially affect other platforms, but in some cases there
may be more risk to WebView, especially if it involves places where the WebView
architecture [differs](https://www.chromium.org/developers/androidwebview)
from other platform. In addition, just as with
[enterprise changes][https://www.chromium.org/developers/enterprise-changes],
some APIs may be more prevalant on that platform than others.

Two examples of past deprecations that were high-risk on Android WebView are
[Web Components v0 APIs][v0] and [Appcache]. On the other hand, a change that
changes behavior for a CSS property that may result in only cosmetic changes
is probably low risk.

[v0]: https://groups.google.com/a/chromium.org/g/blink-dev/c/h-JwMiPUnuU/m/qbR1ir2PAQAJ
[Appcache]: https://groups.google.com/a/chromium.org/g/blink-dev/c/FvM-qo7BfkI/m/0daqyD8kCQAJ
