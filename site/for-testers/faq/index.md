
### Program FAQ

#### What’s happening?

Chromium has moved  to a different issue tracker to provide a well-supported user experience for the long term. We migrated all Chromium issues, including issue history and stars, from Monorail to a different tool: Chromium Issue Tracker, powered by the [Google Issue Tracker](https://developers.google.com/issue-tracker). This tooling change will provide a feature-rich and well-supported issue tracker for Chromium's ecosystem. Chromium will join other open source projects (Git, Gerrit) on this tooling. Existing transparency levels to bugs will be maintained.

#### I have a concern or feedback, how do I reach out?

You can reach out at any time to [issue-tracker-support@chromium.org](mailto:issue-tracker-support@chromium.org) with questions or concerns.

#### What will happen to historic bug links?

Existing Monorail issue links will redirect to the migrated issues in the new issue tracker.

---

### General Workflow FAQ

*FAQs specifically focused on what common Monorail workflows now look like in Issue Tracker and how things will generally work in Issue Tracker.*

#### How do I file an issue?

See Issue Tracker’s documentation on [how to file an issue](https://developers.google.com/issue-tracker/guides/create-issue-ui).

#### How do I search for an issue?

See Issue Tracker’s documentation on [how to search for an issue](https://developers.google.com/issue-tracker/concepts/searches).

Issue Tracker has its own distinct query syntax that is very similar to Monorail, supporting the majority of issue search features that Monorail did. For more detail on how to convert Monorail searches into Issue Tracker, see [Issue Tracker Query Syntax for Monorail users](/for-testers/query-syntax).

#### How do I search for a component?

See Issue Tracker’s documentation on [how to search for a component](https://developers.google.com/issue-tracker/guides/find-a-component). 

Also see [Issue Tracker Query Syntax for Monorail users](/for-testers/query-syntax).

#### How do I find my Monorail labels?

**Step 1)** All labels in Monorail have been migrated to either a hotlist or custom field in Issue Tracker.  
Note: the majority of Monorail labels have been migrated to the “Chromium Labels” custom field.

**Stpe 2)**  
* *[Option A]* <br>
   If your label has been mapped to a hotlist, see Issue Tracker’s documentation on [how to work with hotlists](https://developers.google.com/issue-tracker/guides/work-with-hotlist#:~:text=Click%20the%20magnifying%20glass%20icon%20next%20to%20Hotlists%20in%20the%20left%2Dhand%20navigation). Also see the predefined migration Bookmark Groups:

      * The [“Chromium Migrated Hotlists” Bookmark group](https://g-issues.chromium.org/bookmark-groups/835579) contains ALL hotlists that have been created as part of Chromium’s migration to Issue Tracker.

      * The [“Chromium Critical Hotlists” Bookmark group](https://g-issues.chromium.org/bookmark-groups/860925) contains critical hotlists needed to manage Chrome.

      * Example search query: `hotlistid:<hotlistid>`

* *[Option B]* <br>
   If your label has been mapped to a custom field, see Issue Tracker’s documentation on [how to search by a custom field value](https://developers.google.com/issue-tracker/concepts/custom-fields#searching_for_issues_by_custom_fields).

  * QA example search query: `'customfield[id]:<value>`

#### How do I search for hotlists?

See Issue Tracker’s documentation on [how to search for a hotlist](https://developers.google.com/issue-tracker/guides/work-with-hotlist#:~:text=Click%20the%20magnifying%20glass%20icon%20next%20to%20Hotlists%20in%20the%20left%2Dhand%20navigation).

*Tip:* Autocomplete will help find the hotlist ID if you start typing the name of the hotlist in the search bar after `hotlistid:`

#### How do I search by custom fields?

See Issue Tracker’s documentation on [how to search by a custom field value](https://developers.google.com/issue-tracker/concepts/custom-fields#searching_for_issues_by_custom_fields).

#### How do I determine the urgency of an issue?

Issue urgency is indicated by Issue Tracker’s required Priority field. See Issue Tracker’s documentation on [issue priority](https://developers.google.com/issue-tracker/concepts/issues#priority).

#### How do I mark an issue as a duplicate?

See Issue Tracker’s documentation on [how to mark an issue as duplicate](https://developers.google.com/issue-tracker/guides/duplicate-issue).

#### Will I be able to add labels to issues in Issue Tracker?

Issue Tracker does not support the concept of labels or tags. All labels in Monorail have been migrated to either a hotlist or custom field in Issue Tracker. 

To add new labels to Issue Tracker issues, we recommend creating new hotlists.

#### How do I ensure I’m automatically CC’d on all of the things I care about?

Like Monorail, Issue Tracker supports the ability to Auto-CC users on a particular component. In Issue Tracker, this feature is supported by adding yourself or others to the CC field in the default template for a given component. 

Issue Tracker will automatically CC any users listed in the default template of a component when issues are filed within that component. Additionally, Issue Tracker will also CC these users if an existing issue is moved into the component.

If you would like to request a new template or change for an existing template, please reach out to [chromium-issue-tracker-admins@google.com](mailto:chromium-issue-tracker-admins@google.com). <span style = "background-color:pink">--> Need Link

#### How do I bulk edit bugs?

See Issue Tracker’s documentation on [how to edit issues in bulk](https://developers.google.com/issue-tracker/guides/edit-issue-bulk).

#### How do I view migrated issues in Monorail post migration?

Post migration, Chromium’s Monorail project will be marked as read-only, and all Chromium bugs in Monorail will automatically redirect to their counterparts in Issue Tracker. To prevent this redirect, append the `?no\_tracker\_redirect=true` parameter to a Monorail issue URL.

Example: https://crbug.com/skia/4905?no\_tracker\_redirect=true

#### What happened to my Monorail hotlists? How do I find them?

Given hotlists in Monorail are not project-specific (ie. a hotlist can contain issues from multiple Monorail projects), we only migrated hotlists that
* are owned by an @chromium.org account

AND
* B) contain at least one Chromium issue.

To search for a hotlist, use the following search query: `hotlistid:<hotlistid>`

#### Will I be able to star issues in Issue Tracker?

Like Monorail, Issue Tracker allows individual users to star issues. One difference is that Issue Tracker splits up Monorail's concept of starring into two separate concepts. In Issue Tracker, users can either +1 an issue or star an issue. A +1 is a publicly visible vote while a star is a private subscription to an issue. For public users interacting with Issue Tracker, by default, clicking to star an issue both stars and +1s an issue. See official documentation [here](https://developers.google.com/issue-tracker/guides/subscribe#subscribing_by_starring_an_issue).

As part of Chromium’s migration, all historical Monorail stars will be migrated to Issue Tracker as +1s <span style="text-decoration:underline;">and</span> stars. This will ensure that users who have starred issues in Monorail will be subscribed to the same issues in Issue Tracker.

#### Will I be able to add multiple components to an issue in Issue Tracker?

No, Issue Tracker does not support adding multiple components to issues. Monorail issues with multiple components will use heuristics to select a single primary component then list all additional components in the “Component Tags” custom field.

#### Since many labels will be replaced by hotlists, how will hotlists differ from labels?

Here are a few key differences between Monorail labels and Issue Tracker hotlists: 

<table>
  <tr>
   <td style="background-color: #4a86e8">
   </td>
   <td style="background-color: #4a86e8"><strong>Monorail Labels</strong>
   </td>
   <td style="background-color: #4a86e8"><strong>Issue Tracker Hotlists</strong>
   </td>
  </tr>
  <tr>
   <td><strong>Who can add them to an issue?</strong>
   </td>
   <td>Any issue editor in a Monorail project
   </td>
   <td>Anyone that has <code>View</code> permission for the issue and <code>Append</code> permission for the Hotlist.
   </td>
  </tr>
  <tr>
   <td><strong>Who can see them?</strong>
   </td>
   <td>Anyone who can view an issue can see all labels on the issue
   </td>
   <td>Anyone added as a hotlist viewer, which can include the Public (anyone on the Internet)
   </td>
  </tr>
  <tr>
   <td><strong>Are names unique?</strong>
   </td>
   <td>Yes, labels are uniquely identified in Monorail by their name
   </td>
   <td>No, hotlists are uniquely identified by their ID
   </td>
  </tr>
  <tr>
   <td><strong>Can names be updated?</strong>
   </td>
   <td>No, changing the name of a Monorail label changes the label
   </td>
   <td>Yes, hotlists can be renamed in Issue Tracker without changing the identity of the hotlist or issues in them
   </td>
  </tr>
  <tr>
   <td><strong>How do you search for them?</strong>
   </td>
   <td>label=<em><labelname></em>
   </td>
   <td>hotlistid:<em><hotlistid></em>
<p>
<strong>Tip:</strong> Autocomplete will help find the hotlist ID if you start typing the name of the hotlist in the search bar after <em>hotlistid:</em>
   </td>
  </tr>
</table>

#### Are there any Bookmark Groups that are important to note?

Bookmark Groups are intended to give users quick access to important hotlists. The following Bookmark Groups have been created for Chromium users and are available if you’d like quick access to the following hotlists:

* The [“Chromium Migrated Hotlists” Bookmark group](https://g-issues.chromium.org/bookmark-groups/835579) contains ALL hotlists that have been created as part of Chromium’s migration to Issue Tracker.

* The [“Chromium Critical Hotlists” Bookmark group](https://g-issues.chromium.org/bookmark-groups/860925) contains critical hotlists needed to manage Chrome.

#### Information about Triage workflows

The common triage CUJ in Monorail consisted of 3 steps

1. New issues created in Monorail are in “Unconfirmed” (has not been looked at) or “Untriaged” (verified as valid issue) state.
2. Issues get triaged then moved to “Available” state to indicate they are ready for further handling (may already be assigned at this state).
3. Issues get assigned to a user and follow the life cycle of an issue until resolution.

How does this work in Issue Tracker for Chromium?

1. New issues are in “New” state (special handling for migrated issues for “Unconfirmed” see below).
2. Issues get an initial review then add the “Available” hotlist.
3. Issues get assigned to a user and follow the life cycle of an issue until resolution.

Example CUJS:

* I would like to see **all new** (including unconfirmed + available)
  * Issue Tracker query: `status:new` or see [savedsearches/6673293](https://g-issues.chromium.org/savedsearches/6673293)
* I would like to see all new issues that are **unconfirmed**
  * Issue Tracker query: [hotlistid:[5437934]](https://g-issues.chromium.org/hotlists/5437934)
* I would like to see all new issues that **need assignment/further triage**
  * Issue Tracker query: `-hotlistid:[5438642] -hotlistid:[5437934]` or see [savedsearches/6673474](https://g-issues.chromium.org/savedsearches/6673474)
* I would like to see all that **have been triaged**
  * Issue Tracker query: [hotlistid:[5438642]](https://g-issues.chromium.org/hotlists/5438642)
* I would like to see all triaged **but not assigned**
  * Issue Tracker query: `hotlistid:[5438642] assignee:none` or see [savedsearches/6673294](https://g-issues.chromium.org/savedsearches/6673294)

### Data Mapping Callouts 

*Notable mappings for Chromium’s migration to Issue Tracker.*

1. All issues with no Priority in Monorail are set to P2 in Issue Tracker.
2. For issues that contain multiple priorities in Monorail, the last set priority is used in Issue Tracker. If there is no history of priorities being set, the highest priority (P0 being the highest) is selected and applied to the issue.
3. All unassigned issues with the `Fixed` or `Verified` statuses in Monorail are assigned to monorail-chromium-migration-no-assignee@google.com in Issue Tracker.
4. All unassigned, open issues in Monorail are marked as `New` in Issue Tracker.
5. All Monorail labels, with some small exceptions, are mapped to the new `Chromium Labels` custom field.
6. Issues with multiple components in Monorail have had one primary component selected to be the issue's `Component`. Additional components have been added to the `Component Tags` custom field.
7. Only migrate hotlists that are owned by an @google.com or @chromium.org account and the hotlist needs to contain at least one Chromium issue.
8. Derived values added from Chromium filter rules are reflected in migrated issues.
9. Monorail stars have been migrated to Issue Tracker +1s and stars. See FAQ above for more information on stars, +1s and issue subscriptions.

---

### Known Issues

#### Monorail label casing problems

Monorail (mostly) ignored label casing differences (e.g. foobar-baz is mostly the same thing as FooBar-Baz), but Issue Tracker equivalents (hotlists, custom fields, etc) needed to pick a consistent casing (e.g. Foobar-Baz). We attempted to automatically decide the most popular casing in the source data.

#### Catch-All Custom Field

Many labels are only used very rarely in Monorail (e.g. the ☂️ emoji is used on 5 issues) and mapping these labels to individual hotlists would have generated ~60k almost-empty Issue Tracker hotlists. We have mapped these rare labels to the "Monorail Labels" custom field to preserve historical data without generating so many hotlists. 

#### Custom field problems

Custom field casing problems

* Monorail was inconsistent about label casing, and that carried over to some custom fields.

#### Hotlist problems

Hotlist casing problems

* Monorail was inconsistent about label casing, and that carried over to some hotlists.

#### Intra-issue comment links broken

Monorail’s intra-issue comment links (eg: "comment #c5", "#comment5", "comment 5", "#c5") will be replaced with a full link to the comment (eg: "https://crbug.com/${project}/${issue}#c5") in the migrated Issue Tracker issue.

These full links are currently broken in our early validation prior to migration, but will be fixed for the final migration.
