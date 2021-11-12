# Authoring changes to www.chromium.org

www.chromium.org is a relatively simple static website. Nearly all of
the pages are written in Markdown and use a simple SASS-based stylesheet.

Pages are written in Markdown and translated using a single extremely simple
[LiquidJS](LiquidJS) [template](site/_includes/page.html) into HTML
during the build process.

The site uses a single basic [Sass/SCSS](sass-lang.com)
[stylesheet](site/_stylesheets/default.scss)
(using the Node/NPM library version of Sass).

Binary objects (PDFs, images, etc.) are stored in a
[Google Cloud Storage](cloud.google.com/storage) bucket, indexed by
SHA-1 checksums that are committed into this repo. Run
[//scripts/upload_lobs.py](../scripts/upload_lobs.py) to upload things
(you must be a Chromium contributor to run this script).

The Markdown pages contain a "front matter" section that can set a few
variables to control aspects of the page appearance. The front matter
must be in the form of a YAML document, and the following variables are
supported:

*   `breadcrumbs`: An optional list of (page_title, link) link pairs to
    parent pages for a given page. If set, they will show up as a
    "breadcrumbs" trail at the top of the page, above the title.
*   `page_name`: The name of the page (usually the name of the enclosing
    directory).
*   `title`: The title of this page. By default, the title will
    be included as an `H1` tag on the page, and is the value that should
    be used in other breadcrumbs lists.
*   `redirect`: To automatically redirect this page/URL to somewhere else,
    set this to a URL.
*   `use_title_as_h1`: If this is set to `true` (the default), the title
    will be included as an H1.

Each page should be named `index.md` and live in its own directory, in
order to match the link structure used by the old Google Sites layout.
Once enough time as passed from the migration and launch, we'll probably
relax this requirement.

Please write pages following the
[Google Markdown style guide](https://github.com/google/styleguide/blob/gh-pages/docguide/style.md).

The site supports embedding arbitrary HTML, but please be careful when doing
so, because we want the site to maintain a consistent look and feel
(which the old site didn't do so much).

You must not use any inline CSS or inline JavaScript. We can support
custom styling and scripts, but doing so requires the approval of the
[//OWNERS](../OWNERS) at this time.

### Known issues

*   [crbug.com/1260451](crbug.com/1260451): The `%TOC%` shortcode doesn't
    work.
*   [crbug.com/1260453](crbug.com/1260453): There's no mechanism for listing
    all the sub-pages of a page yet.
*   [crbug.com/1269867](crbug.com/1269867): We should have an auto-formatter
    for the Markdown pages.
*   [crbug.com/1269868](crbug.com/1269868): We should consider using a linter.
*   [crbug.com/1260460](crbug.com/1260460): We should be automatically
    generating the `page_name` and `breadcrumbs` fields, rather than relying
    on authors to set them.
*   [crbug.com/1269860](crbug.com/1269860): We need to document the flavor
    of Markdown that is supported along with any extensions that are enabled.
*   [crbug.com/1267094](crbug.com/1267094): We want a better, more WYSIWYG
    authoring environment.
