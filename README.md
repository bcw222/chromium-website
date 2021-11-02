# Source code for www.chromium.org

This Git repo contains the source content for
[www.chromium.org](https://www.chromium.org).

*NOTE: 2021-11-02.* This is not (yet) actually true. This is a work-in-progress
repo that we plan to move to.

The website is implemented by serving static content (mostly Markdown files)
that is translated / built ahead of time into HTML using the
[Eleventy](https://11ty.dev) static site generator (which is written in
Node/JS) and deployed onto [Firebase Cloud Hosting](firebase.google.com/products/hosting).

The Markdown is translated using a single extremely simple
[LiquidJS](LiquidJS) [template](site/_templates/default.tmpl)
and the site is served with a single basic
[Sass/SCSS](sass-lang.com) [stylesheet](site/_stylesheets/default.scss)
(using the Node/NPM library version of Sass).

Large objects (PDFs, big images, etc.) are stored in a
[Google Cloud Storage](cloud.google.com/storage) bucket, indexed by
SHA-1 checksums that are committed into this repo.

See [//docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) if you wish to contribute
to the site.
