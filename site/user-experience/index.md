---
breadcrumbs: []
page_name: user-experience
title: User Experience
---

This section describes the motivations, assumptions, and directions behind
Chromium and Chromium OS's user interface design.
Its goal is to explain the current design in a way that further work can be
developed in-style, or so that our assumptions can be challenged, changed, and
improved.

<table>
<tbody>
<tr>
<td cellpadding="10" style="width:50%;">
<div style="text-align:left;display:block"><a href="/user-experience/Chrome.png" imageanchor="1"><img border="0" src="/user-experience/Chrome.png"></a></div>
<div style="display:block;text-align:left"><br>
</div>
<h2><a name="TOC-Chrome-Features"></a>Chrome Features</h2>
<div><b>Window</b></div>
<div><a href="/user-experience/window-frame">Window Frame</a>&nbsp;|&nbsp;
<a href="/user-experience/tabs">Tabs</a>&nbsp;|&nbsp;
<a href="/user-experience/tabs/throbber">Throbber</a>&nbsp;|&nbsp;
<a href="/user-experience/toolbar">Toolbar</a>&nbsp;|&nbsp;
<a href="/user-experience/omnibox">Omnibox</a>
</div>
<div><span style="border-collapse:collapse"><br>
</span></div>
<div><b>Browsing</b></div>
<div>
<div><a href="/user-experience/bookmarks">Bookmarks</a>&nbsp;|&nbsp;
<a href="/user-experience/history">History</a>&nbsp;|&nbsp;
<a href="/user-experience/new-tab-page">New Tab Page</a>
</div>
<div><span style="border-collapse:collapse"><br>
</span></div>
</div>
<div><b>Additional UI</b></div>
<div><a href="/user-experience/downloads">Downloads</a>&nbsp;|&nbsp;
<a href="/user-experience/status-bubble">Status Bubble</a>&nbsp;|&nbsp;
<a href="/user-experience/find-in-page">Find in Page</a>&nbsp;|&nbsp;
<a href="/user-experience/options">Options</a>&nbsp;|&nbsp;
<a href="/user-experience/incognito">Incognito</a>
</div>
<div><a href="/user-experience/notifications">Notifications</a> |
<a href="/user-experience/infobars">Infobars</a>&nbsp;|
<a href="/user-experience/multi-profiles">Multiple Chrome Users</a>
</div>
<div><span style="border-collapse:collapse"><br>
</span></div>
<div><b>Appearance</b></div>
<div><a href="/user-experience/visual-design">Visual Design</a>&nbsp;|&nbsp;
<a href="/user-experience/resolution-independence">Resolution Independence</a>&nbsp;|&nbsp;
<a href="https://developer.chrome.com/docs/extensions/mv3/themes/">Themes</a></div>
<div><span style="border-collapse:collapse"><br>
</span></div>
<div><b>Accessibility</b></div>
<div><a href="/user-experience/keyboard-access">Keyboard Access</a>&nbsp;| &nbsp;<a href="/user-experience/touch-access">Touch Access</a> |&nbsp;<a href="/user-experience/low-vision-support">Low-Vision Support</a>&nbsp;|&nbsp;
<a href="/user-experience/assistive-technology-support">Screen reader support</a>
</div><div><br></div><div><b>UI text</b></div><div><a href="/user-experience/ui-strings">Write strings</a> | <a href="/developers/design-documents/ui-localization#TOC-Use-message-meanings-to-disambiguate-strings">Write message descriptions</a></div>
<div></div>
<div>
<span style="border-collapse:collapse"><span style="border-collapse:separate">
<div dir="ltr">
<div><br></div>
<h2><a name="TOC-UX-themes"></a>UX themes</h2>
</div>
<div dir="ltr">
<div><b>Content not chrome</b>&nbsp;</div>
<div>
<ul><li>In the long term, we think of Chromium as a tabbed window manager or shell for the web rather than a browser application. We avoid putting things into our UI in the same way you would hope that Apple and Microsoft would avoid putting things into the standard window frames of applications on their operating systems.<br>
</li>
<li>The tab is our equivalent of a desktop application's title bar; the frame containing the tabs is a convenient mechanism for managing groups of those applications. In future, there may be other tab types that do not host the normal browser toolbar.</li>
<li>Chrome OS: A system UI that uses as little screen space as possible by combining apps and standard web pages into a minimal tab strip: While existing operating systems have web tabs and native applications in two separate strips, Chromium OS combines these, giving you access to everything from one strip. The tab is the equivalent of a desktop application's title bar; the frame containing the tabs is a simple mechanism for managing sets of those applications and pages. We are exploring&nbsp;<a href="/chromium-os/user-experience/window-ui">three main variants</a>&nbsp;for the window UI. All of them reflect this unified strip.</li>
<li>Chrome OS: Reduced window management: No pixel-level window positioning, instead operating in a full-screen mode and exploring new ways to handle secondary tasks:</li>
<ul><li>Panels, floating windows that can dock to the bottom of the screen as a means of handling tasks like chat, music players, or other accessories.</li>
<li>Split screen, for viewing two pieces of content side-by-side.</li></ul></ul>
<div><b>Light, fast, responsive, tactile</b><br>
</div>
<ul><li>Chromium should feel lightweight (cognitively and physically) and fast.</li></ul>
<div><b>Web applications with the functionality of desktop applications</b><br>
</div>
<ul><li>Enhanced functionality through HTML 5: offline modes, background processing, notifications, and more.</li>
<li>Better access points and discovery: On Chromium-based browsers, we've addressed the access point issue by allowing applications to install shortcuts on your desktop. Similarly, we are using&nbsp;<a href="/chromium-os/user-experience/tab-ui">pinned tabs</a>&nbsp;and search as a way to quickly access apps in Chromium OS.</li>
<li>While the tab bar is sufficient to access existing tabs, we are creating a new primary&nbsp;<a href="/chromium-os/user-experience/access-points">access point</a>&nbsp;that provides a list of frequently used applications and tools.</li></ul>
</div>
<div><b>Search as a primary form of navigation</b><br>
</div>
<div>
<ul><li>Chromium's address bar and the Quick Search Box have simplified the way you access personal content and the web. In Chromium OS, we are unifying the behavior of the two, and exploring how each can be used to make navigation faster and more intuitive.</li></ul>
</div>
</div>
</span></span>
</div>
</td>
<td>
<div style="display:block;text-align:left"><a href="/user-experience/ChromeOS.png" imageanchor="1"><img border="0" src="/user-experience/ChromeOS.png"></a></div>
<div style="display:block;text-align:left"><br>
</div>
<h2><a name="TOC-Chrome-OS-Features"></a>Chrome OS Features</h2>
<div><span ><span ><b><font color="#E69138"><span >Note: UI under development. Designs are subject to change.</span></font></b></span></span></div>
<div><span style="border-collapse:collapse"><br>
</span></div>
<div><b>Primary UI</b></div>
<div><a href="/chromium-os/user-experience/window-ui">Window UI Variations</a>&nbsp;|
<a href="/chromium-os/user-experience/window-management">Window Management</a> |&nbsp;
<a href="/chromium-os/user-experience/tab-ui">Pinned Tabs</a>&nbsp;|&nbsp;
<a href="/chromium-os/user-experience/access-points">Apps Menu</a>&nbsp;|&nbsp;
<a href="/chromium-os/user-experience/panels">Panels</a>
</div>
<div><a href="/user-experience/toolbar/#ui-elements">UI Elements</a>&nbsp;|
<a href="/user-experience/multitouch">Gestures</a> |
<a href="/chromium-os/user-experience/system-status-icons">System Status Icons</a></div>
<div><span style="border-collapse:collapse"><br></span></div>
<div><b>Core Applications</b></div>
<div>
<a href="/chromium-os/user-experience/settings">Settings</a>&nbsp;|&nbsp;
<a href="/chromium-os/user-experience/content-browser">Content Browser</a>&nbsp;|
<a href="/chromium-os/user-experience/opensave-dialogs">Open/Save Dialogs</a> |
<a href="/chromium-os/user-experience/shelf">Shelf</a>
</div>
<div><b><span ><span ><br>
</span></span></b></div>
<div><b>Devices</b></div>
<div>
<a href="/chromium-os/user-experience/form-factors">Form Factors</a>&nbsp;|
<a href="/user-experience/resolution-independence">Resolution Independence</a>
</div>
<div><span>
<div><br>
</div>
<h2><a name="TOC-Video-and-Screenshots"></a>Video and Screenshots</h2>
<p>The implementation, the concept video, and the screenshots are presenting different UI explorations. Expect to see some variation.</p>
<p><span style="border-collapse:collapse"><b><span><a href="http://www.youtube.com/watch?v=hJ57xzo287U" imageanchor="1"><img border="0" src="/chromium-os/user-experience/Concept2.jpg"></a></span></b></span></p>
<div><a href="/chromium-os/user-experience/sdres_0000_Basic.png" imageanchor="1"><img border="0" height="112" src="/chromium-os/user-experience/sdres_0000_Basic.png?height=112&amp;width=200" width="200"></a>&nbsp;<a href="/chromium-os/user-experience/sdres_0001_App-Menu.png" imageanchor="1"><img border="0" height="112" src="/chromium-os/user-experience/sdres_0001_App-Menu.png?height=112&amp;width=200" width="200"></a>&nbsp;<a href="/chromium-os/user-experience/sdres_0002_Panels.png" imageanchor="1"><img border="0" height="112" src="/chromium-os/user-experience/sdres_0002_Panels.png?height=112&amp;width=200" width="200"></a>&nbsp;</div>
</span></div>
</td>
</tr>
</tbody>
</table>

<table>
<tr>
</tr>
</table>