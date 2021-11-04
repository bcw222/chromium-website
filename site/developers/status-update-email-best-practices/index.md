---
breadcrumbs:
- - /developers
  - For Developers
page_name: status-update-email-best-practices
title: Status Update Email Best Practices
---

### General suggestions

*   Send to list with +status, e.g. blink-dev+status@chromium.org
*   Minimize boilerplate subject line.
*   Summarize highlights in subject, or as the first line of the email.
*   Main content follows as a bullet list of key status updates.
*   Every 2 weeks works well for many projects. Adjust as appropriate
            given the news of an update.
*   For feature status updates, link the feature on
            [chromestatus.com](http://chromestatus.com).
*   Optimize for skimmability.

## Example

To: blink-dev+status@chromium.org

Subject: **Bluetooth Status - Experiment targeting M51, Opera demoed at MWC.**

[Web Bluetooth](https://www.chromestatus.com/feature/5264933985976320) provides
Bluetooth GATT Access to web apps.

*   Additional [launch
            requirements](https://www.chromestatus.com/feature/5264933985976320)
            have moved the planned experiment launch from M50 to M51.
    *   [Issues](https://bugs.chromium.org/p/chromium/issues/list)
                include tab indicator and fuzzing. Additional feature
                improvements are stretch goals to improve demos.
*   Started migration to Mojo, and eventual migration to Blink.
*   Starting to seek partners to have in hand for Chrome Dev Summit.
*   [Opera demoed Web Bluetooth at Mobile Web
            Congress](http://www.opera.com/blogs/news/2016/02/opera-heads-to-mobile-world-congress-2016/)
            and [shipped it behind a
            flag](https://dev.opera.com/articles/web-bluetooth-intro/) in Opera
            for Android beta.