---
breadcrumbs:
- - /developers
  - For Developers
page_name: speed-hall-of-fame
title: Speed Hall of Fame
---

For some time in 2013-2015, we listed a performance improvement of the week.
This page is now here for historical purposes.

But, feel free to nominate future changes! All Chromium contributors are
eligible. To ensure a change is considered, nominate it to
[perf-sheriffs@chromium.org](mailto:perf-sheriffs@chromium.org).

[TOC]

## 2015

### 2015-02-11

This week, we highlight the performance sheriffing process working as it should
due to reliability improvements. A few weeks ago, Joshua Bell landed a [patch
impacting IndexedDB](http://f27dd1d7e9322388546c613cfed39bafda153859/). The
performance sheriff Oystein Eftevaag filed a [bug for an IndexedDB
regression](http://crbug.com/454622) and the autobisect bot submitted a bisect
job on his behalf. It returned with high confidence that Joshua's patch was to
blame. While the regression was unexpected, Joshua investigated, determined it
was his patch, and then posted a [fix that resolved the performance
regression](https://chromium.googlesource.com/chromium/src/+/05d0eec7715de17e1a9b7b9b16a5a5f37d36fb73).
While we still have plenty of work to do improving reliability and decreasing
latency, successes like these show that our improvements are making progress.
Thank you to Oystein for the find and Joshua for the fix!

### 2015-01-20

This week Balazs Engedy [moved opening the LoginDatabase off of the UI
thread](https://chromium.googlesource.com/chromium/src/+/41c91fbbdcfde75c9058d06ceae816f12699fc2f)
and out of the critical path for opening Chrome. This [shaved hundreds of
milliseconds off startup times](https://chromeperf.appspot.com/report) for
Windows and Linux, decreasing the amount of time until the browser windows
becomes responsive. Thanks for your help Balazs!

## 2014

### 2014-10-28

This week's improvement of the week goes to Ulan Degenbaev. A few weeks ago we
noticed recurring, long garbage collection activity and a seemingly related 80%
spike in metrics from the field. The V8 team triaged this back an issue with
their idle notification scheme, and Ulan [landed a
fix](https://codereview.chromium.org/662543008) to make things right. The patch
has already been merged to M39 and will go out with the next push. Thanks Ulan!

### 2014-09-17

Last week Mike Klein turned on the [new SkRecord-based backend for
SkPicture](https://chromium.googlesource.com/chromium/src/+/c3d2efb33238a3ee19cc8e21f4d91ef8c55f23c4),
which resulted in [25-30% faster
recording](https://chromeperf.appspot.com/report) on Android devices. Recording
is one phase of the painting process, so faster recording will result in smaller
paint times and faster framerates. This new backend is the result of several
months of Mike's work. Thanks Mike!

### 2014-08-20

Last week Oystein Eftevaag [landed a
patch](https://codereview.chromium.org/169043004/) to start the commit upon
receiving the last blocking stylesheet. This resulted in a 25% improvement from
the time the user initiates a request to the time they see the first paint.
Unlike most metrics we quote here, this didn't come from from our devices in the
lab, but from real users in the wild. Great work Oystein!

### 2014-08-06

Last week, Danno Clifford landed a JavaScript [array allocation
optimization](https://code.google.com/p/v8/source/detail) targeted at the Kraken
benchmark suite. It improved Chromium's score on the [audio-dft subtest by
30-70%](https://chromeperf.appspot.com/report) and the [benchmark total score by
5-15%.](https://chromeperf.appspot.com/report) Danno was so pleased with his
work that he immediately left on a well-deserved vacation. Thanks Danno!

### 2014-07-13

This week, Fadi Meawad [fixed a bug in Chrome's power
monitor](https://codereview.chromium.org/401083002/) on Windows that resulted in
an improvement of 7% of the entire system's battery life while running Chrome.
This particular bug gathered[ over 7,000 stars on the issue
tracker](https://code.google.com/p/chromium/issues/detail) - the most of any bug
by [several thousand](https://code.google.com/p/chromium/issues/list). While
these savings are impressive, our power work is nowhere near complete. Stay
tuned for more improvements!

### 2014-06-18

Jakob Kummerow landed [two](https://code.google.com/p/v8/source/detail)[
optimizations](https://code.google.com/p/v8/source/detail) to V8 specifically
targeted at optimizing the [React](http://facebook.github.io/react/) framework.
Thanks for your work!

### 2014-06-11

This week, Emil Eklund [finished up
work](https://codereview.chromium.org/315623002/) on
[DirectWrite](http://msdn.microsoft.com/en-us/library/windows/desktop/dd368038(v=vs.85).aspx)
for Windows. In addition to being a widely requested feature by users and
developers with [over 500 stars on the
bug](https://code.google.com/p/chromium/issues/detail), DirectWrite also has
performance considerations. For example, we're seeing about a 7-10% warm page
[load](https://chromeperf.appspot.com/report)[
time](https://chromeperf.appspot.com/report)[
improvement](https://chromeperf.appspot.com/report) on pages with non-Latin
fonts. Thanks Emil, for your work toward a beautiful and speedy user experience.

### 2014-05-28

Over the past few weeks, Sami Kyostila landed a
[series](https://src.chromium.org/viewvc/chrome)[
of](https://src.chromium.org/viewvc/chrome)[
patches](https://src.chromium.org/viewvc/chrome) for increased reliability and
decreased cycle time of our performance tests. Performance improvements are
fantastic, but without work like Sami's we would be flying blind with a bunch of
broken tests. Thanks for your hard work Sami!

### 2014-04-30

Simon Hatch[ upgraded](https://src.chromium.org/viewvc/chrome) the capabilities
of our bisect bots so that they can now bisect functional breakages and changes
in variance. You can find instructions in the ["tips" section of the
documentation](http://www.chromium.org/developers/tree-sheriffs/perf-sheriffs/bisecting-performance-regressions#TOC-Tips),
but it's as easy as setting bisect_mode to return_code or std_dev in your bisect
jobs. Simon's work should help us quite a bit in our quest for reliable, stable
benchmarks!

### 2014-04-16

Dale Curtis landed a[ patch](https://src.chromium.org/viewvc/chrome) this week
that increases the buffer size for audio streams when appropriate, reducing both
CPU and power usage. For certain media types (such as mp3) the system-wide power
consumption improved by[ up to 35%](https://chromeperf.appspot.com/report), with
about[ 20% savings on average](https://chromeperf.appspot.com/report). This is
the first of many great power patches we expect to see now that the
infrastructure is in place. Great work Dale!

### 2014-03-26

This week David Reveman landed a [patch](http://src.chromium.org/viewvc/chrome)
to remove task references from RasterWorkerPool on all platforms. I can't
possibly produce a better summary than his own patch description: "This moves
the responsibility to keep tasks alive while scheduled from the RasterWorkerPool
to the client where unnecessary reference counting can be avoided. The result is
a [~5x improvement in BuildRasterTaskQueue
performance](https://chromeperf.appspot.com/report), which under some
circumstances translate to almost [2x improvement in ScheduleTasks
performance](https://chromeperf.appspot.com/report)." Thanks David!

### 2014-03-12

Last week Hayato Ito reduced checking if a DOM tree is a descendent of another
from O(N) in the height of the tree of trees to O(1). In smaller trees this
produces[ 2-3x faster event dispatching](https://chromeperf.appspot.com/report),
but in the deeply nested trees Hayato created he saw more than a 400x
improvement! I'd also like to thank Hayato for the[ fantastic
description](http://src.chromium.org/viewvc/blink) of the patch and its effects
in the CL description. Great work!

### 2014-03-05

This week's improvement goes to Chris Harrelson, who [landed a
patch](http://src.chromium.org/viewvc/blink) speeding up CSS descendant
selectors by an astounding factor of [20-30x across all
platforms](https://chromeperf.appspot.com/report). Though it can be difficult to
trust microbenchmark results, this change is expected to save 90% or 50ms of
style recalc time from expand animations. One more step in the direction of
silky smooth web apps!

### 2014-02-26

This week's improvement belongs to Kentaro Hara, whose[ V8 bindings
patch](http://src.chromium.org/viewvc/blink) resulted in a 20-30% improvement
in[ several](https://chromeperf.appspot.com/report)[
bindings](https://chromeperf.appspot.com/report)[
benchmarks](https://chromeperf.appspot.com/report) across all platforms. Great
work!

### 2014-02-19

This week Oystein Eftevaag landed a
[patch](https://codereview.chromium.org/157963002) that allows faster first
paints in the lack of pending stylesheet loads. This produced a [Speed
Index](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index)
improvement of about 5% on Android, and a radically faster Google Search loading
time -- beginning to show the page a full 2.5s sooner! Oystein's work also
unlocked the possibility for several further performance enhancements, so stay
tuned for more progress.

### 2012-02-12

This week it was impossible to choose between three truly epic improvements! So
they’ll have to share the winnings. First, Daniel Sievers
[dropped](https://codereview.chromium.org/148243011) Windows cold message loop
start time from [~4s to ~1s](https://chromeperf.appspot.com/report), returning
us to pre-Aura levels. David Reveman pwnd some compositing benchmarks in a
[series](https://codereview.chromium.org/154003006)[
of](https://codereview.chromium.org/131543014)[
patches](https://codereview.chromium.org/144463012), improving them [several
fold](https://chromeperf.appspot.com/report) across platforms. Last but not
least, Camille Lamy shaved [a couple hundred
milliseconds](https://chromeperf.appspot.com/report) off some page loads in the
top 10 mobile sites suite by [moving](https://codereview.chromium.org/88503002/)
unload event handling off of the critical path.

### 2012-02-05

This week's improvement has been over a year in the making. Toon Verwaest
succeeded in reducing code duplication and complexity by removing call inline
caches from the V8 codebase. The result was the deletion of over 10,000 lines of
code and several [unexpected](https://chromeperf.appspot.com/report)[
perf](https://chromeperf.appspot.com/report)[
improvements](https://chromeperf.appspot.com/report) - not to mention the
improvement to the developers' lives who would have had to maintain that code.
Thank you Toon for all your hard work!

### 2014-01-22

This week’s improvement is in our ability to measure. We’re now receiving the
first [energy consumption metrics](https://chromeperf.appspot.com/report) on the
Mac 10.9 perf bots (with Android soon to follow). This enables us to begin
optimizing while avoiding regressions. Huge thanks to Jeremy Moskovich, Elliot
Friedman, and the Chrome Infra team for getting our first energy benchmark up
and running!

### 2014-01-08

Just before the holidays, the on-duty performance sheriff Victoria Clarke
noticed significant [startup time performance
regressions](https://code.google.com/p/chromium/issues/detail); in some cases,
the regression was as much as 350%. Victoria traced it back to an
innocuous-looking [change in the password
manager](http://src.chromium.org/viewvc/chrome). Upon revert our [startup
metrics](https://chromeperf.appspot.com/report) recovered completely. Thanks
Victoria!

## 2013

### 2013-12-18

Simon Hatch landed a [patch](http://src.chromium.org/viewvc/blink) that
prioritizes the loading of visible images. This is a huge user win in perceived
loading time, but the initial attempt also unexpectedly introduced
[several](https://chromeperf.appspot.com/report)[
large](https://chromeperf.appspot.com/report)[
performance](https://chromeperf.appspot.com/report)[
regressions](https://chromeperf.appspot.com/report) which probably would have
went to stable in the olden days. Pat Meenan, the performance sheriff on duty,
[tracked them back to Simon’s
patch](https://code.google.com/p/chromium/issues/detail). This enabled Simon to
[revert](http://src.chromium.org/viewvc/blink) the patch and
[reland](http://src.chromium.org/viewvc/blink) it a few days later with all
regressions resolved.

### 2013-12-11

More compositor improvements this week, thanks to Vlad Levin. Vlad [introduced
the concept of TileBundles](http://src.chromium.org/viewvc/chrome) into the
compositor, resulting in a [3-4x performance
gain](https://chromeperf.appspot.com/report) in updating tile priorities on
desktop.

### 2013-12-04

This week we saw a [70-90% improvement](https://chromeperf.appspot.com/report)
in composited layer tree host commit time across all platforms with impl-side
painting. This is due in part to two changes, [one by Adrienne
Walker](http://src.chromium.org/viewvc/chrome) and [one by Eric
Penner](http://src.chromium.org/viewvc/chrome). The former ensures that on a
page with many layers, Chrome only spends time updating ones that have actually
changed; the latter optimizes tiling resolution when scaling. Thanks to you
both!

### 2013-11-13

This week’s improvement comes from outside Google: Jun Jiang from Intel landed
an [order of magnitude speed increase](https://chromeperf.appspot.com/report)
for drawing dynamic WebGL to hardware-accelerated Canvas 2D.

### 2013-11-07

Elly Jones [landed a fix](https://src.chromium.org/viewvc/chrome) that reduces
startup time by 1.5s for most users on Windows. The win was secured by
decreasing the timeout for
[WPAD](http://en.wikipedia.org/wiki/Web_Proxy_Autodiscovery_Protocol) to a
reasonable value.

### 2013-10-31

This week we wanted to recognize the folks working on Aura and the
Ubercompositor, who not only reversed a number of Windows regressions but pushed
them further into solid performance enhancements. Specifically they were able to
improve framerate (as much as double!) on the [blob
demo](http://webglsamples.googlecode.com/hg/blob/blob.html), [deferred
irradiance volume
demo](http://codeflow.org/webgl/deferred-irradiance-volumes/www/), and [WebGL
aquarium](http://webglsamples.googlecode.com/hg/aquarium/aquarium.html). The
changes also affected real-world applications, similarly improving framerate on
properties such as Google Maps.

### 2013-10-23

This week’s top improvement is from a perf sheriff, Prasad Vuppalapu, who
diagnosed a 50% regression in loading Japanese and Chinese web pages on Windows.
The [revert](https://code.google.com/p/chromium/issues/detail) recovered the
performance. Holding on to the speed we have is equally as important as
improving our speed in the first place.

### 2013-10-16

This week’s top improvement is from Elliott Sprehn, who landed a massive 93.5%
performance improvement to CSS/StyleSheetInsert. Great work Elliott!