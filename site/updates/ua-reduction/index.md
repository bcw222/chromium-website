---
breadcrumbs:
- - /updates
  - updates
page_name: ua-reduction
title: User-Agent Reduction
---

### ## [TOC]

## Updates

October 12, 2021: Information on using the Origin Trial with third-party embeds
was add to the [blog
post](https://developer.chrome.com/blog/user-agent-reduction-origin-trial/).

September 16, 2021: Chrome milestones were added to reflect
<https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html>.

May 24, 2021: The chrome://flags#freeze-user-agent flag was renamed to
chrome://flags/#reduce-user-agent in Chrome 93 and the values were updated to
align with the plan below (also testable via --enable-features=ReduceUserAgent).

## Proposed Rollout Plan

**Reduction Preparation**

Phase 1: Warn about accessing navigator.userAgent, navigator.appVersion, and
navigator.platform in DevTools, beginning in M92.
Phase 2: **Chrome 95 to Chrome 100** Launch an Origin Trial for sites to opt
into the final reduced UA string for testing and feedback, for at least 6
months.

**Reduction Rollout**

Phase 3: **Chrome 100** Launch a reverse Origin Trial, for instances where a
site may need more time for migration, for at least 6 months.
Phase 4: **Chrome 101** Ship reduced Chrome MINOR.BUILD.PATCH version numbers
(“0.0.0”). Once rolled-out, the reduced UA string would apply to all page loads
on desktop and mobile OSes that do not opt into the reverse Origin Trial.
Phase 5: **Chrome 107** Begin roll-out of reduced Desktop UA string and related
JS APIs (navigator.userAgent, navigator.appVersion, navigator.platform). Once
rolled-out, the reduced UA string would apply to all page loads on desktop OSes
that do not opt into the reverse Origin Trial.
Phase 6: **Chrome 110** Begin roll-out of reduced Android Mobile (and Tablet) UA
string and related JS APIs. Once rolled-out, the reduced UA string would apply
to all page loads on Android that do not opt into the reverse Origin Trial.

**Reduction Completion**
Phase 7: **Chrome 113** reverse Origin Trial ends and all page loads receive the
reduced UA string and related JS APIs.

## Reduced User Agent String Reference

---

### This reduced format will be available for testing via chrome://flags/#reduce-user-agent in Chrome 93.

### Unified Format

The unified format that covers all platforms post-UA Reduction looks like so:

Mozilla/5.0 (&lt;unifiedPlatform&gt;) AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/&lt;majorVersion&gt;.0.0.0 &lt;deviceCompat&gt; Safari/537.36

### Desktop

The Chrome Desktop User Agent string currently uses the following format:

Mozilla/5.0 (&lt;platform&gt;; &lt;oscpu&gt;) AppleWebKit/537.36 (KHTML, like
Gecko) Chrome/&lt;majorVersion&gt;.&lt;minorVersion&gt; Safari/537.36

Post UA-Reduction, the new format will be:

Mozilla/5.0 (&lt;unifiedPlatform&gt;) AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/&lt;majorVersion&gt;.0.0.0 Safari/537.36

### Mobile and Tablet

The Chrome Mobile and Tablet User Agent strings use the following format:

Mozilla/5.0 (Linux; Android &lt;androidVersion&gt;; &lt;deviceModel&gt;)
AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/&lt;majorVersion&gt;.&lt;minorVersion&gt; &lt;deviceCompat&gt;
Safari/537.36

Post UA-Reduction, the new format will be:

Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/&lt;majorVersion&gt;.0.0.0 &lt;deviceCompat&gt; Safari/537.36

## Token Reference

---

<table>
<tr>

<td>Tokens</td>

<td>Description</td>

</tr>
<tr>

<td>&lt;androidVersion&gt;</td>

<td>Represents Android major version</td>

</tr>
<tr>

<td>&lt;deviceModel&gt;</td>

<td>Represents Android device model.</td>

</tr>
<tr>

<td>&lt;minorVersion&gt;</td>

<td>Represents the Chrome MINOR.BUILD.PATCH <a href="/developers/version-numbers">version numbers</a>.</td>

</tr>
<tr>

<td>&lt;oscpu&gt;</td>

<td>Represents the device operating system and (optionally) CPU architecture.</td>

</tr>
<tr>

<td>&lt;platform&gt;</td>

<td>Represents the underlying device platform.</td>

</tr>
<tr>

<td>Post-Reduction Tokens</td>

</tr>
<tr>

<td>&lt;deviceCompat&gt;</td>

<td>Represents device form-factor.</td>

<td>The possible values are:</td>

    <td>“Mobile”</td>

    <td>“” (empty string, used by Tablets and Desktop)</td>

</tr>
<tr>

<td>&lt;majorVersion&gt;</td>

<td>Represents the Chrome major version.</td>

</tr>
<tr>

<td>&lt;unifiedPlatform&gt;</td>

<td>The intersection of &lt;platform&gt;, &lt;oscpu&gt;, &lt;androidVersion&gt;, and &lt;deviceModel&gt;, depending on device.</td>

<td>The possible desktop values\* are:</td>

    <td>Windows NT 10.0; Win64; x64</td>

    <td>Macintosh; Intel Mac OS X 10_15_7</td>

    <td>X11; Linux x86_64</td>

    <td>X11; CrOS x86_64</td>

<td>The possible mobile values\* are:</td>

    <td>Linux; Android 10; K</td>

<td>*\*Note that these strings are literal values; they will not update even if
a user is on an updated operating system or device.*</td>

</tr>
</table>

## Sample UA Strings: Phase 4

---

In Phase 4 we change the &lt;minorVersion&gt; token to “0.0.0”.

<table>
<tr>

<td>Desktop (user on Windows 8.1, for example)</td>

</tr>
<tr>

<td>Phase 3 UA </td>

<td>Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.1234.56 Safari/537.36</td>

</tr>
<tr>

<td>Phase 4 UA</td>

<td>Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Safari/537.36</td>

</tr>
</table>

<table>
<tr>

<td>Mobile (user on Samsung Galaxy, for example)</td>

</tr>
<tr>

<td>Phase 3 UA</td>

<td>Mozilla/5.0 (Linux; Android 9; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.1234.56 Mobile Safari/537.36</td>

</tr>
<tr>

<td>Phase 4 UA</td>

<td>Mozilla/5.0 (Linux; Android 9; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Mobile Safari/537.36</td>

</tr>
</table>

<table>
<tr>

<td>Tablet (user on Samsung Galaxy, for example)</td>

</tr>
<tr>

<td>Phase 3 UA</td>

<td>Mozilla/5.0 (Linux; Android 9; SM-T810) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.1234.56 Safari/537.36</td>

</tr>
<tr>

<td>Phase 4 UA</td>

<td>Mozilla/5.0 (Linux; Android 9; SM-T810) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Safari/537.36</td>

</tr>
</table>

## Sample UA Strings: Phase 5

---

In Phase 5 we change the &lt;platform&gt; and &lt;oscpu&gt; tokens from their
platform-defined values to the relevant &lt;unifiedPlatform&gt; token value
(which will never change).

Note: There may not be user-visible changes here, unless the user was on a lower
version.

Also note that the macOS platform version was already [capped to
10_15_7](https://bugs.chromium.org/p/chromium/issues/detail) in Chrome 90 for
site compatibility reasons.

<table>
<tr>

<td>Desktop (user on Windows 8.1, for example)</td>

</tr>
<tr>

<td>Phase 4 UA</td>

<td>Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Safari/537.36</td>

</tr>
<tr>

<td>Phase 5 UA</td>

<td>Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Safari/537.36</td>

</tr>
</table>

<table>
<tr>

<td>Mobile (user on Samsung Galaxy, for example)</td>

</tr>
<tr>

<td>Phase 4 UA</td>

<td>Mozilla/5.0 (Linux; Android 9; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Mobile Safari/537.36</td>

</tr>
<tr>

<td>Phase 5 UA</td>

<td>*(No changes for Mobile UAs in Phase 5)*</td>

</tr>
</table>

<table>
<tr>

<td>Tablet (user on Samsung Galaxy, for example)</td>

</tr>
<tr>

<td>Phase 4 UA </td>

<td>Mozilla/5.0 (Linux; Android 9; SM-T810) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Safari/537.36</td>

</tr>
<tr>

<td>Phase 5 UA</td>

<td>*(No changes for Tablet UAs in Phase 5)*</td>

</tr>
</table>

## Sample UA Strings: Phase 6

---

In Phase 6, we change the &lt;deviceModel&gt; token to “K” and change the
&lt;androidVersion&gt; token to a static “10” string.

<table>
<tr>

<td>Desktop (user on Windows 8.1, for example)</td>

</tr>
<tr>

<td>Phase 5 UA </td>

<td>Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Safari/537.36</td>

</tr>
<tr>

<td>Phase 6 UA</td>

<td>*(No changes for Desktop UAs from Phase 5)*</td>

</tr>
</table>

<table>
<tr>

<td>Mobile (user on Samsung Galaxy, for example)</td>

</tr>
<tr>

<td>Phase 5 UA</td>

<td>Mozilla/5.0 (Linux; Android 9; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Mobile Safari/537.36</td>

</tr>
<tr>

<td>Phase 6 UA</td>

<td>Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Mobile Safari/537.36</td>

</tr>
</table>

<table>
<tr>

<td>Tablet (user on Samsung Galaxy, for example)</td>

</tr>
<tr>

<td>Phase 5 UA </td>

<td>Mozilla/5.0 (Linux; Android 9; SM-T810) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Safari/537.36</td>

</tr>
<tr>

<td>Phase 6 UA</td>

<td>Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Safari/537.36</td>

</tr>
</table>

## Sample UA Strings: Final Reduced State

---

<table>
<tr>

<td>Desktop (user on Windows 8.1, for example)</td>

</tr>
<tr>

<td>Old UA </td>

<td>Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.1234.56 Safari/537.36</td>

</tr>
<tr>

<td>Final Reduced UA</td>

<td>Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Safari/537.36</td>

</tr>
</table>

<table>
<tr>

<td>Mobile (user on Samsung Galaxy, for example)</td>

</tr>
<tr>

<td>Old UA </td>

<td>Mozilla/5.0 (Linux; Android 9; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.1234.56 Mobile Safari/537.36</td>

</tr>
<tr>

<td>Final Reduced UA</td>

<td>Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Mobile Safari/537.36</td>

</tr>
</table>

<table>
<tr>

<td>Tablet (user on Samsung Galaxy, for example)</td>

</tr>
<tr>

<td>Old UA </td>

<td>Mozilla/5.0 (Linux; Android 9; SM-T810) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.1234.56 Safari/537.36</td>

</tr>
<tr>

<td>Final Reduced UA</td>

<td>Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Safari/537.36</td>

</tr>
</table>

## Reduced navigator.platform values (for all versions)

---

<table>
<tr>

<td>Platform</td>

<td>Reduced value</td>

</tr>
<tr>

<td>macOS</td>

<td>MacIntel</td>

</tr>
<tr>

<td>Windows</td>

<td>Win32</td>

</tr>
<tr>

<td>Chrome OS</td>

<td>Linux x86_64</td>

</tr>
<tr>

<td>Linux</td>

<td>Linux x86_64</td>

</tr>
<tr>

<td>Android</td>

<td>Linux armv81</td>

</tr>
</table>

## Reduced navigator.appVersion values

---

navigator.appVersion is effectively an alias of navigator.userAgent (it’s
[everything after
“Mozilla/”](https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/frame/navigator_id.cc;l=56)).

To avoid confusion and reduce implementation complexity, we aim to follow the
same plan for navigator.userAgent.