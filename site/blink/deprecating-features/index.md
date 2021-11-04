---
breadcrumbs:
- - /blink
  - Blink (Rendering Engine)
page_name: deprecating-features
title: Deprecating Features
---

[TOC]

## How To Measure Usage and Notify Developers

1.  Add your feature to [web_feature.mojom's
            WebFeature](https://cs.chromium.org/chromium/src/third_party/WebKit/public/platform/web_feature.mojom).
2.  Add a clever deprecation message to the big switch in
            [UseCounter::deprecationMessage](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/core/frame/Deprecation.cpp).
3.  Instrument your code by:
    *   Adding
                `[DeprecateAs](https://chromium.googlesource.com/chromium/src/+/HEAD/third_party/WebKit/Source/bindings/IDLExtendedAttributes.md#DeprecateAs_m_a_c)=[your
                enum value here]` to the feature's IDL definition (see [these
                examples](https://cs.chromium.org/search/)).
    *   Adding a call to
                `[Deprecation::CountDeprecation](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/core/frame/Deprecation.h)`
                somewhere relevant (as we're dong for the
                [UserMediaRequest](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/modules/mediastream/UserMediaRequest.cpp)).

Note that `DeprecateAs` is intended to replace `MeasureAs` in the IDL file.
Specifying both is redundant.