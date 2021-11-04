---
breadcrumbs:
- - /developers
  - For Developers
- - /developers/how-tos
  - How-Tos
page_name: submitting-a-performance-bug
title: Submitting a Performance Bug
---

For more advanced use cases, click for [advanced
instructions](/developers/how-tos/trace-event-profiling-tool/recording-tracing-runs).

**Note: Uploading a trace to Google may share personal information such as the
titles and URLs of open tabs.**

**Android:**

1. Connect the Android device to a host PC

2. Navigate the host PC to **chrome://inspect?tracing**

3. Find the instance of Chrome on your device you'd like to trace and click on
the "trace" link.

[<img alt="image"
src="/developers/how-tos/submitting-a-performance-bug/Screenshot%20from%202019-11-27%2023-09-36.png">](/developers/how-tos/submitting-a-performance-bug/Screenshot%20from%202019-11-27%2023-09-36.png)

4. Follow the **Desktop** instructions starting from step 2.

**Desktop:**

1. In the address bar of a new tab, type **chrome://tracing**

2. In the upper left, press the **Record** button.

[<img alt="image"
src="/developers/how-tos/submitting-a-performance-bug/Screenshot%20from%202015-03-10%2014%3A52%3A09.png">](/developers/how-tos/submitting-a-performance-bug/Screenshot%20from%202015-03-10%2014%3A52%3A09.png)

3. In the dialog that opens, select **Manually select settings**

> [<img alt="image"
> src="/developers/how-tos/submitting-a-performance-bug/Screenshot%20from%202015-03-24%2011%3A16%3A39.png">](/developers/how-tos/submitting-a-performance-bug/Screenshot%20from%202015-03-24%2011%3A16%3A39.png)

4. Under **Record Categories**, click **All**.

5. In the lower right, click **Record**.

6. Complete whatever action reproduces the performance issue: opening a new tab,
navigating to a certain website, scrolling a page, etc. If possible, the
duration of your recording should be about 10 seconds or less.

7. Return to the tracing tab and press **Stop**.

> [<img alt="image"
> src="/developers/how-tos/submitting-a-performance-bug/Screenshot%20from%202015-03-10%2014%3A54%3A06.png">](/developers/how-tos/submitting-a-performance-bug/Screenshot%20from%202015-03-10%2014%3A54%3A06.png)

8. When the recording has been imported, click **Save** at the top of the
screen, then choose where to save it on your computer.

> [<img alt="image"
> src="/developers/how-tos/submitting-a-performance-bug/Screenshot%20from%202015-03-10%2014%3A55%3A28.png">](/developers/how-tos/submitting-a-performance-bug/Screenshot%20from%202015-03-10%2014%3A55%3A28.png)

9. File a [new performance
bug](https://code.google.com/p/chromium/issues/entry). Make sure to add a
descriptive title, your Chrome version, your operating system and version, URLs
(if applicable), and details about your issue.

10. Click **Attach a file** and locate the trace file you saved in step 7. There
is a 10MB limit, so you may need to compress the file first.

11. In the bottom left, click **Submit Issue**. Thank you!