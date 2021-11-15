module.exports = config => {
  config.addWatchTarget('./site/_stylesheets/');

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
