# Contributing to www.chromium.org

So far these instructions have only been tested to run on a Mac, but should work
on Linux and Windows with only a modicum of hoop-jumping.

1.  Install depot_tools:

    ```bash
    $ git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
    $ export PATH=/path/to/depot_tools:$PATH
    ```

2. Check out the repo:

    ```bash
    $ git clone https://chromium.googlesource.com/website
    ```

3. `cd` into the checkout and download any dependencies:

    ```bash
    $ cd website
    $ gclient sync
    ```

    Note that there is a //.gclient file checked in, so you don't need to
    run `gclient config` or have a .gclient file in a directory above the
    website.

4.  *Optional*: Refresh the content from Classic Sites via the public GData
    APIs.

    ```bash
    ./scripts/export.py
    ```

    This downloads all of the HTML pages and converts them to Markdown,
    and also fetches any associated assets (images, attachments, etc.).

    `export` caches the metadata and HTML from Sites locally in the
    `//export/feeds` directory (but not images or other assets). This is useful
    when you need to iterate on the HTML->Markdown conversion or other changes
    where the raw data isn't likely to be needed. To force the script to
    explicitly re-fetch things, use the `--force` flag.

5.  *Optional*: Build all of the static pages up-front to check for errors.
    The content will be built into `//build` by default.

    ```bash
    $ ./npmw build
    ```

    It should only take a few seconds to build out the website.

    (`npmw` is a simple wrapper around the version of `npm` that is bundled
    as part of this checkout.)

7.  Start a local web server to view the site. The server will (re-)generate
    the pages on the fly as needed if the input or conversion code changes.
    The content will be built into `//build`.

    ```bash
    $ ./npmw start
    ```

8.  Check in your changes and upload a CL to the Gerrit code review server.
    Get one of the [//OWNERS](../OWNERS) to review your changes, and then
    submit the change via the commit queue.

    *NOTE:* If this is your first time contributing something to Chromium
    or ChromiumOS, please make sure you (or your company) has signed
    [Google's Contributor License Agreement](https://cla.developers.google.com/),
    and add yourself to the [//AUTHORS](../AUTHORS) file as part of your change.

    ```bash
    $ git commit -a -m 'whatever'
    $ git-cl upload
    ```

    If you are adding binary assets (images, etc.) to the site, you will
    need to upload them to the GCS bucket using `//scripts/upload-lobs.py`.
