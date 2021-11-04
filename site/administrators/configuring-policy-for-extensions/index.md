---
breadcrumbs:
- - /administrators
  - Documentation for Administrators
page_name: configuring-policy-for-extensions
title: Configuring Apps and Extensions by Policy
---

Policies can also be configured for extensions that support policy management
via the [managed storage
API](http://developer.chrome.com/extensions/manifest/storage). The sample
[Managed
Bookmarks](http://developer.chrome.com/extensions/examples/extensions/managed_bookmarks.zip)
extension can be used to configure Chrome bookmarks via a policy, for example.
Extensions that support policy management are listed in **chrome://policy**,
together with the policies configured for them.

This page documents how to configure policies for extensions, using the Managed
Bookmarks extension as an example. Extensions can also be [installed via
policy](http://www.chromium.org/administrators/policy-list-3#ExtensionInstallForcelist);
the examples below assume that the Managed Bookmarks extension has been loaded
as an unpacked extension from **chrome://extensions** and got the extension ID
"gihmafigllmhbppdfjnfecimiohcljba".

This extension supports two policies: "Bookmarks Bar" and "Other Bookmarks".
Each is a list of bookmarks, where each bookmark is a dictionary that contains a
"title" and either a "url" or a list of "children". The examples below configure
a "Chromium" bookmark to "chromium.org" and a "Videos" folder with a bookmark to
"youtube.com".

**Chrome OS**

Policies for Chrome OS must be configured via the admin console at
<https://admin.google.com>.

The policy for the extension can be uploaded in a txt file after the extension
has been selected to be configured. Note that this option only appears for
extensions that support policy configuration.

The txt file should contain a valid JSON object, mapping a policy name to an
object describing the policy. For now only the policy value can be configured;
other options may be added in the future, such as the policy level.

Example txt file for simple policy values:

<table>
<tr>
<td>{</td>
<td> "Server": {</td>
<td> "Value": "http://my.server/api"</td>
<td> },</td>
<td> "CloudSync": {</td>
<td> "Value": true</td>
<td> },</td>
<td> "Allowlist": {</td>
<td> "Value": \[ "foo", "bar", "baz" \]</td>
<td> }</td>
<td>}</td>
</tr>
</table>

The following example txt file is equivalent to the bookmarks configurations
above:

<table>
<tr>
<td>{</td>
<td> "Bookmarks Bar": {</td>
<td> "Value": \[</td>
<td> {</td>
<td> "title": "Chromium",</td>
<td> "url": "chromium.org"</td>
<td> },</td>
<td> {</td>
<td> "title": "Videos",</td>
<td> "children": \[</td>
<td> {</td>
<td> "title": "YouTube",</td>
<td> "url": "youtube.com"</td>
<td> }</td>
<td> \]</td>
<td> }</td>
<td> \]</td>
<td> }</td>
<td>}</td>
</tr>
</table>

## Windows

Policies for extensions should be written to the registry under
HKLM\\Software\\Policies\\Google\\Chrome\\3rdparty\\extensions\\gihmafigllmhbppdfjnfecimiohcljba\\policy
or under
HKLM\\Software\\Policies\\Chromium\\3rdparty\\extensions\\gihmafigllmhbppdfjnfecimiohcljba\\policy
for Chromium. It's also possible to use HKCU instead of HKLM. The equivalent
path can be configured via GPO.

Example reg file to configure bookmarks (TODO: this hasn't been verified yet):

<table>
<tr>
<td>Windows Registry Editor Version 5.00</td>
<td>\[HKEY_LOCAL_MACHINE\\Software\\Policies\\Google\\Chrome\\3rdparty\\extensions\\gihmafigllmhbppdfjnfecimiohcljba\\policy\\Bookmarks Bar\\1\]</td>
<td>"title"="Chromium"</td>
<td>"url"="chromium.org"</td>
<td>\[HKEY_LOCAL_MACHINE\\Software\\Policies\\Google\\Chrome\\3rdparty\\extensions\\gihmafigllmhbppdfjnfecimiohcljba\\policy\\Bookmarks Bar\\2\]</td>
<td>"title"="Videos"</td>
<td>\[HKEY_LOCAL_MACHINE\\Software\\Policies\\Google\\Chrome\\3rdparty\\extensions\\gihmafigllmhbppdfjnfecimiohcljba\\policy\\Bookmarks Bar\\2\\children\\1\]</td>
<td>"title"="YouTube"</td>
<td>"url"="youtube.com"</td>
</tr>
</table>

## Linux

Policies for Chrome are configured via JSON files placed in
/etc/opt/chrome/policies/managed/ (for Chrome) or
/etc/chromium/policies/managed/ (for Chromium). These JSON files should contain
dictionaries that map a policy name to its value. The special 3rdparty key can
be used to configure policies for Chrome components. Under that key, the
extensions key is used to configure extensions, by mapping an extension's ID to
its policies. For example:

<table>
<tr>
<td>{</td>
<td> "ShowHomeButton": true,</td>
<td> "3rdparty": {</td>
<td> "extensions": {</td>
<td> "gihmafigllmhbppdfjnfecimiohcljba": {</td>
<td> "Bookmarks Bar": \[</td>
<td> {</td>
<td> "title": "Chromium",</td>
<td> "url": "chromium.org"</td>
<td> },</td>
<td> {</td>
<td> "title": "Videos",</td>
<td> "children": \[</td>
<td> {</td>
<td> "title": "YouTube",</td>
<td> "url": "youtube.com"</td>
<td> }</td>
<td> \]</td>
<td> }</td>
<td> \]</td>
<td> }</td>
<td> }</td>
<td> }</td>
<td>}</td>
</tr>
</table>

In this configuration, ShowHomeButton is one of the Chrome policies, and the
policies for the extension are listed under the gihmafigllmhbppdfjnfecimiohcljba
key.

## Mac

The policies for the extension can be configured via MCX preferences for the
com.google.Chrome.extensions.gihmafigllmhbppdfjnfecimiohcljba bundle, or for the
org.chromium.Chromium.extensions.gihmafigllmhbppdfjnfecimiohcljba bundle if
using Chromium. This can be done by creating a plist file with the configuration
and importing it using dscl:

<table>
<tr>
<td>&lt;?xml version="1.0" encoding="UTF-8"?&gt;</td>
<td>&lt;!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"&gt;</td>
<td>&lt;plist version="1.0"&gt;</td>
<td>&lt;dict&gt;</td>
<td> &lt;key&gt;com.google.Chrome.extensions.gihmafigllmhbppdfjnfecimiohcljba&lt;/key&gt;</td>
<td> &lt;dict&gt;</td>
<td> &lt;key&gt;Bookmarks Bar&lt;/key&gt;</td>
<td> &lt;dict&gt;</td>
<td> &lt;key&gt;state&lt;/key&gt;</td>
<td> &lt;string&gt;always&lt;/string&gt;</td>
<td> &lt;key&gt;value&lt;/key&gt;</td>
<td> &lt;array&gt;</td>
<td> &lt;dict&gt;</td>
<td> &lt;key&gt;title&lt;/key&gt;</td>
<td> &lt;string&gt;Chromium&lt;/string&gt;</td>
<td> &lt;key&gt;url&lt;/key&gt;</td>
<td> &lt;string&gt;chromium.org&lt;/string&gt;</td>
<td> &lt;/dict&gt;</td>
<td> &lt;dict&gt;</td>
<td> &lt;key&gt;title&lt;/key&gt;</td>
<td> &lt;string&gt;Videos&lt;/string&gt;</td>
<td> &lt;key&gt;children&lt;/key&gt;</td>
<td> &lt;array&gt;</td>
<td> &lt;dict&gt;</td>
<td> &lt;key&gt;title&lt;/key&gt;</td>
<td> &lt;string&gt;YouTube&lt;/string&gt;</td>
<td> &lt;key&gt;url&lt;/key&gt;</td>
<td> &lt;string&gt;youtube.com&lt;/string&gt;</td>
<td> &lt;/dict&gt;</td>
<td> &lt;/array&gt;</td>
<td> &lt;/dict&gt;</td>
<td> &lt;/array&gt;</td>
<td> &lt;/dict&gt;</td>
<td> &lt;/dict&gt;</td>
<td>&lt;/dict&gt;</td>
<td>&lt;/plist&gt;</td>
</tr>
</table>

The first key indicates the bundle ID that is to be configured. Note that each
policy maps first to its metadata, and its value is listed inside the value key.
The state key is used by the MCX preferences to determine how often this policy
should be enforced; setting it to always keeps this policy in place at all
times. This configuration can be imported with dscl using an administrator
account:

<table>
<tr>
<td>$ dscl -u admin_username /Local/Default -mcximport /Computers/local_computer configuration.plist</td>
</tr>
</table>

Substitute admin_username with a valid administrator username, and
configuration.plist with the path to the plist configuration listed above. If
dscl complains that the path is invalid then you can create a node for the local
computer with these commands:

<table>
<tr>
<td>$ GUID=\`uuidgen\`</td>
<td>$ ETHER=\`ifconfig en0 | awk '/ether/ {print $2}'\`</td>
<td>$ dscl -u admin_username /Local/Default -create /Computers/local_computer</td>
<td>$ dscl -u admin_username /Local/Default -create /Computers/local_computer RealName "Local Computer"</td>
<td>$ dscl -u admin_username /Local/Default -create /Computers/local_computer GeneratedUID $GUID</td>
<td>$ dscl -u admin_username /Local/Default -create /Computers/local_computer ENetAddress $ETHER</td>
</tr>
</table>

The preferences system can be told to propagate these changes immediately:

<table>
<tr>
<td>$ sudo mcxrefresh -n username</td>
</tr>
</table>

If username is running Chrome with the Managed Bookmarks extension then Chrome
will load this policy in the next 10 seconds. Pressing "Reload policies" in
**chrome://policy** loads them immediately.