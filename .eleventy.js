module.exports = config => {
  config.addWatchTarget('./site/_stylesheets/');

  // `markdown-it` is Eleventy's default Markdown rendering engine.
  // We need a reference to it to customize its behavior, below.
  const md = require('markdown-it');

  // `markdown-it-anchor` is an Eleventy plugin that will add <a> tags to header elements.
  // (this improves the accessibility of linking to headers.)
  const anchor = require('markdown-it-anchor');

  // `uslug` is a Node package that convert text strings into "slugs" in a
  // Unicode-friendly way. (Slugs are the kebab-cased equivalents of text that
  // we use for page names, id's, etc. "Hello world" turns into 'hello-world".
  const uslug = require('uslug');

  // `markdown-it-attrs` is a markdown-it plugin that lets us customize the
  // `id` and `class` attributes of an element in the generated output;
  // we use this mostly for customizing the links in header tags.
  //
  // `markdown-it-toc-done-right` is a markdown-it plugin that adds support
  // for the `[TOC]` mechanism for generating the table of contents in a page.
  let mdlib = md({
    html: true,
  }).use(require('markdown-it-attrs'), {
    leftDelimiter: '{:',
    rightDelimiter: '}',
    allowedAttributes: ['id', 'class'],
  }).use(anchor, {
    slugify: s => uslug(s),
    level: 2,
    permalink: anchor.permalink.headerLink(),
  }).use(require('markdown-it-toc-done-right'), {
    slugify: uslug,
    tocClassName: 'toc',
    tocFirstLevel: 2,
    tocPattern: /\[TOC\]/,
  });

  config.setLibrary('md', mdlib);

  // TODO(crbug.com/1271672): Figure out how to make this syntax and API
  // less clunky.
  const subpages = require('./scripts/subpages.js')
  function handleSubPages(collectionAll) {
    let pageUrl = this.page.url;
    return subpages.render(pageUrl, collectionAll);
  };
  config.addNunjucksShortcode("subpages", handleSubPages);

  // Copy binary assets over to the dist/ directory.

  // This list must be kept in sync with the lists in //.eleventy.js and
  // //scripts/upload_lobs.py.
  // TODO(dpranke): Figure out how to share these lists to eliminate the
  // duplication and need to keep them in sync.
  let lob_extensions = [
    '.ai',
    '.bin',
    '.bmp',
    '.brd',
    '.bz2',
    '.crx',
    '.config',
    '.dia',
    '.gif',
    '.graffle',
    '.ico',
    '.jpg',
    'jpg', // Some files are missing the '.' :(.,
    '.jpeg',
    '.mp4',
    '.msi',
    '.pdf',
    'pdf',  // Some files are missing the '.' :(.
    '.png',
    'png',  // Some files are missing the '.' :(.
    '.PNG',
    '.swf',
    '.svg',
    '.tar.gz',
    '.tiff',
    '_trace',
    '.webp',
    '.xcf',
    '.xlsx',
    '.zip',
  ];

  // This should basically pick up everything that isn't a .md file
  // or a .sha1.
  // TODO(dpranke): Figure out how to actually enforce this and get
  // rid of the "basically". There has to be a better approach. :).
  let extensions = lob_extensions.concat([
    '.cpp',
    '.css',
    '.csv',
    '.dot',
    '.ebuild',
    '.el',
    '.html',
    '.js',
    '.json',
    'patch',
    '.py',
    '.txt',
    '.xml'
  ]);

  for (let ext of extensions) {
    config.addPassthroughCopy('site/**/*' + ext);
  }

  return {
    dir: {
      input: 'site',
      output: 'build'
    },
    markdownTemplateEngine: 'njk',
    templateFormats: ['md', 'njk'],
    htmlTemplateEngine: 'njk',
  };
};
