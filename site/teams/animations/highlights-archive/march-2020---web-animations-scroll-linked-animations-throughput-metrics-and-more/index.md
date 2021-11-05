---
breadcrumbs:
- - /teams
  - Teams
- - /teams/animations
  - Animations Team
- - /teams/animations/highlights-archive
  - Highlights Archive
page_name: march-2020---web-animations-scroll-linked-animations-throughput-metrics-and-more
title: March 2020 - Web Animations, Scroll-linked Animations, Throughput Metrics and
  more!
---

<table>
<tr>

<td>March 2020</td>

<td>Chrome Animations Highlights</td>

<td>Archives: <a href="http://go/animations-team-highlights">go/animations-team-highlights</a></td>

</tr>
</table>

<table>
<tr>

<td>The Animation Festival</td>

<td>The team made solid progress towards moving Web-Animations forward, as you can see in these demos from Kevin (kevers@) and Hao (haozhes@)!</td>

<td>A kinder gentler cancel - add support for animationcancel</td>

<td><table></td>
<td><tr></td>

<td><td><img alt="image" src="https://lh5.googleusercontent.com/n-dDYATk36izRhk8Cz3rT5xe0LszrOxy-N912z4UE_mNyXXye1zW1yeEqfyi9Ab74tZkNrOPLhkeSXIsMMx5is5yKSy9LxB47Gf2yyNG7dqqCKzS0KNPbGqsVeWaKK3U0VZcDArE" height=132 width=272></td></td>

<td><td>This example illustrates using a combination of CSS animations and CSS transitions, getAnimations, commitStyles and animationcancel to smoothly reset the state of a cancelled CSS animation.</td></td>

<td><td>Performing a commit style prior to cancelling the animation prevents the animation from snapping back to the start position.</td></td>

<td><td>Within the animationcancel listener we can smoothly transition back to the starting point by triggering a CSS transition.</td></td>

<td><td>#box {</td></td>

<td><td> transition: transform 0.5s ease-in-out;</td></td>

<td><td>}</td></td>

<td><td>.slide {</td></td>

<td><td> animation: ...</td></td>

<td><td>}</td></td>

<td><td>document.addEventListener(</td></td>

<td><td> 'animationcancel', (evt) =&gt; {</td></td>

<td><td> if(evt.target != box) return;</td></td>

<td><td> // Smoothly transition back to</td></td>

<td><td> // starting point.</td></td>

<td><td> box.style.transform = 'none';</td></td>

<td><td>});</td></td>

<td><td>function slide() {</td></td>

<td><td> box.classList.add('slide');</td></td>

<td><td>}</td></td>

<td><td>function reset() {</td></td>

<td><td> document.getAnimations().</td></td>

<td><td> forEach(animation =&gt; {</td></td>

<td><td> animation.commitStyles();</td></td>

<td><td> animation.event.target.</td></td>

<td><td> classList.remove('slide');</td></td>

<td><td> });</td></td>

<td><td>}</td></td>

<td></tr></td>
<td><tr></td>

<td><td colspan=2>Taking the scenic route - fix CSS transition events after updating the effect</td></td>

<td></tr></td>
<td><tr></td>

<td><td><img alt="image" src="https://lh3.googleusercontent.com/h4X1AOZRN5TrzSKcCke98ILTBrzYtCcgQR2XwnDubxcZModEokR37BGkqacpWaFoPNSt7TdWsiDA25l8RgSVEYQsR4_ynoNVOsHPnb4dV3jh4JlywYBgArRAYwju_3xHNqJ8N5ib" height=61 width=265></td></td>

<td><td>This example demonstrates a means of customizing the path of a transition by replacing the keyframe effect.</td></td>

<td><td>After changing the effect, events still need to be directed to the original target. Previously, changing the effect resulted in dropping the transitionend or tansitioncancel event, which in turn broke the chain of transitions.</td></td>

<td><td>document.addEventListener(</td></td>

<td><td> 'transitionrun', (evt) =&gt; {</td></td>

<td><td> if (evt.propertyName !=='transform')</td></td>

<td><td> return; </td></td>

<td><td> const animation = circle.getAniamtions()</td></td>

<td><td> .find(anim =&gt;</td></td>

<td><td> anim.transitionProperty ===</td></td>

<td><td> 'transform');</td></td>

<td><td> animation.effect =</td></td>

<td><td> new KeyframeEffect(circle,</td></td>

<td><td> keyframes,</td></td>

<td><td> options);</td></td>

<td><td>});</td></td>

<td><td>document.addEventListener(</td></td>

<td><td> 'transitionend', (evt) =&gt; {</td></td>

<td><td> circle.style.opacity = 0;</td></td>

<td><td>});</td></td>

<td><td>// … wait until rendered … </td></td>

<td><td>circle.style.transform =</td></td>

<td><td> 'translateX(200px)';</td></td>

<td></tr></td>
<td><tr></td>

<td><td colspan=2>Playing nicely together - CSS Animation / Web Animation API interactions</td></td>

<td><td colspan=2><img alt="image" src="https://lh5.googleusercontent.com/AgXlDRi8AKQKKAxYgJ2SdFhDjIvVYtKe2d00lYtqS88DvxrkUUOP-rq7_X0dU9R6cSKKMgkQxiLA8JypElSTPRY5n35KlS5vP-UeTBEDOeksnGufimjfVM0G0fsMWQUfYybDnOLw" height=119 width=580></td></td>

<td><td colspan=2>This demo illustrates how AnimationEvent.updateTiming overrides properties set via CSS properties. The updateTiming API may be used to set/override one or more animation properties. A subsequent change via CSS animation properties must not replace values set via the API call. The override behavior is on a per-property basis.</td></td>

<td><td colspan=2>Resolve animation ordering issues with free vs markup bound animations</td></td>

<td><td colspan=2><img alt="image" src="https://lh4.googleusercontent.com/HNr4kbgj998Pe7W1MmP8PM7JvWnPhmOaezC3q4F8WJ7oX7F9LjJw2wm_6JCj3L4SNSWEMaipsGlOClXVyIapJJpv35kX8-zPpTuNiaNwScjH-jHxN0SnKbLrOuytmZrtuHadNNzv" height=249 width=453></td></td>

<td></tr></td>
<td><tr></td>

<td><td colspan=2>This example illustrates effect ordering and composite: add. Each rectangle starts with a pair of animations: a web animation (scale), and a CSS animation (rotation). As the CSS Animation has lower composite ordering, the resultant animation is “rotate then scale” which indicates the expected result from before. In the left rectangle, we grab a reference to the CSS Animation before cancelling (clearing the animation property). When the rotate animation is replayed, it is now a “free” animation and the ordering flips to be creation order: i.e. “scale then rotate”. Since scale and rotate operations are not commutative, we can find the end results are different from the left to right.</td></td>

<td><td colspan=2>--- To be continued ---</td></td>

<td><td colspan=2>Special thanks to Rob (flackr@) and Majid (majidvp@) who reviewed 40+ non-trivial patches for the excellent work.</td></td>

<td><td colspan=2>Scroll-linked Animations</td></td>

<td><td colspan=2>On the standardization front, Majid triaged all outstanding specification issues and identified <a href="https://github.com/w3c/csswg-drafts/milestone/6">12 of them</a> as P1 for the First Public Working Draft (FPWD). Rob proposed <a href="https://github.com/w3c/csswg-drafts/issues/4862">progress-based animations</a> for cleaner developer ergonomic (<a href="https://github.com/w3c/csswg-drafts/pull/4890">pull request</a>) getting rid of the arbitrary duration that is currently needed. And Olga (gerchiko@microsoft.com) drove the discussion on the inactive timeline spec <a href="https://github.com/w3c/csswg-drafts/issues/2066">issue</a> and proposed the timeline state <a href="https://edotor.net/">chart</a>.</td></td>

<td><td colspan=2>On the implementation side, this sprint Yi (yigu@) added support for running scroll-linked animations on the compositor to free them from the <a href="https://codepen.io/yigu/full/ExjJVQr">busy main thread</a>, Majid <a href="https://chromium-review.googlesource.com/c/chromium/src/+/2070673">landed</a> the initial patch IDL changes to support <a href="https://github.com/w3c/csswg-drafts/issues/4337">element-based scroll offset, and</a> Jordan (jortaylo@microsoft.com) added ScrollTimeline.phase which will be used specially to replace the fill mode.</td></td>

<td><td colspan=2><img alt="image" src="https://lh3.googleusercontent.com/1W1LxJTG6s7Znk7NhC_evWlDBQcxcSC9rAnT3iVPhyMDdFbte5t95MFGv5mjeeYcDgGpmKI40RVm370kDHCKlCKOYfXxtfiiSE5a5umWNf18l88HNyH5x0YvDSXJbww0hb_Jz1Oe" height=258 width=281><img alt="image" src="https://lh4.googleusercontent.com/Xj2XRYqsx2AL-quX7e2OYg3JmhJzzvONhBsZEPSImL_3HnP42tmS1hUn96J1RW1vi8wpDu-IfqAend__rYuE6Ulo1yYKrH0wc5RixwQ8t2USAzj6A3I4iHeyaSDkS4VyX4LfgSMQ" height=259 width=282></td></td>

<td><td colspan=2>Left: the animation becomes janky after adding artificial jank on the main thread.</td></td>

<td><td colspan=2>Right: the animation is composited therefore it’s still smooth with artificial jank.</td></td>

<td><td colspan=2>Finally after sprints of hard work on the rather complex problem, Olga landed the scroll snapshotting <a href="https://chromium-review.googlesource.com/c/chromium/src/+/2005629">work</a> to make the timeline invalidation correct and avoid<a href="https://docs.google.com/presentation/d/12UNGCTJybiL5gEMAGY2f-05WxXARvNz4k-RS02qgNuU/edit#slide=id.g740960215a_1_0"> potential layout cycles</a>. This was a ship-blocker! \\ o /</td></td>

<td><td colspan=2>Frame Throughput Metrics</td></td>

<td><td colspan=2>Xida (xidachen@) made solid progress on refining high-level metrics to measure renderer performance this sprint.</td></td>

<td><td colspan=2>Thread throughput unification</td></td>

<td></tr></td>
<td><tr></td>

<td><td><img alt="image" src="https://lh5.googleusercontent.com/C-IASVz_2FBnKTJAeqH9H1PNUdfRq8RQ2QOr_pA0cYTFOcR7lH8-voMoVsXMMVHTsLHyHI32FUJgNHXNpqOS6cUbDJQPfbymI9nkTUBOFz3P7t9HUspopVAOLvUIGYGsHXm0bG_K" height=112 width=187></td></td>

<td><td>Top: width animation runs on the main thread</td></td>

<td><td>Bottom: transform animation runs on compositor</td></td>

<td><td>When we have animations running on both main thread and compositor we used to report the one with worse throughput regardless. e.g. the transform animation’s throughput is ~98%; the width animation starts 3 seconds after and its throughput is ~10%. In the past we reported 10%. Now when we are not expecting to produce a main frame such as the first 3 seconds, we take the compositor throughput therefore the reported throughput is ~65%.</td></td>

<td></tr></td>
<td><tr></td>

<td><td colspan=2>Tracking the last frame</td></td>

<td><td colspan=2>It’s possible that after a BeginImpl\[Main\]Frame is reported, the tracker is scheduled to terminate. e.g. an impl-frame could have started right before a sequence stops such as the end of a touch scroll. We will completely lose track of it under such circumstances. With Xida’s <a href="https://chromium-review.googlesource.com/c/chromium/src/+/2079134">work</a>, we can now track the last BeginImplFrame and soon the last BeginMainFrame. </td></td>

<td></tr></td>
<td></table></td>

</tr>
</table>

<table>
<tr>

<td>Chrome Animations Highlights | March 2020</td>

<td><a href="http://go/animations-team">go/animations-team</a></td>

</tr>
</table>