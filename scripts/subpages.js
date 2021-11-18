// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// This file implements support for the "subpages" extensions. If a
// page author inserts `{% subpages collections.all %}` into a document,
// this function will find all of the pages that are sub-pages of
// the specified page (sub-pages in the sense that /blink/design-documents
// is a sub-page of /blink) and display them in a hierarchical tree
// format. `path` should be the path of the current page (Eleventy's
// `page.url`) and `collection_of_all_pages` should be Eleventy's
// `collections.all`.
//
// TODO(crbug.com/1271672): Figure out how to make this cleaner so the
// syntax is less clunky.
function render(path, collection_of_all_pages) {
  path = rtrim(path, '/');

  let subPages = [];
  for (const item of collection_of_all_pages) {
    if (item.data.page.url.startsWith(path)) {
      let item_url = rtrim(item.data.page.url, '/');
      let comps = item_url.split('/');
      subPages.push({
        title: item.data.title,
        url: item_url,
        dirname: comps.slice(0, comps.length - 1).join('/'),
        children: [],
      })
    }
  }

  sortBy(subPages, 'url');

  let map = new Map();
  map.set(path, {url: path, children: []});

  for (subPage of subPages) {
    map.set(subPage.url, subPage);
    if (map.has(subPage.dirname)) {
      map.get(subPage.dirname).children.push(subPage);
    }
  }

  function walk(obj, depth) {
    let indent = '';
    for (i = 0; i < depth; i++) {
      indent += '  ';
    }

    sortBy(obj.children, 'title');

    if (obj.children.length) {
      let s = `${indent}<details>
${indent}  <summary><a href="${obj.url}">${obj.title}</a></summary>
${indent}  <ul>
`;
      for (ch of obj.children) {
        s += `${indent}    <li>\n${walk(ch, depth + 3)}`;
      }
      s += `${indent}  </ul>\n${indent}</details>\n`;
      return s;
    } else {
      return `${indent}<a href="${obj.url}">${obj.title}</a>\n`;
    }
  }

  s = (
    '<div class="subpage-listing" role="nav">\n' +
    '  <h4>Subpage Listing</h4>\n' +
    '  <ul>\n');

  children = map.get(path).children;
  sortBy(children, 'title');
  for (let child of children) {
    s += '    <li>\n' +  walk(child, 3);
  }
  s += '  </ul>\n</div>\n';

  return s;
}

function rtrim(s, ch) {
  if (s.endsWith(ch)) {
    return s.substr(0, s.length - 1);
  }
  return s;
}

function sortBy(arr, fld) {

  function cmp(x, y) {
    a = x[fld].toLowerCase();
    b = y[fld].toLowerCase();
    return (a > b ? 1 : (a == b ? 0 : -1));
  }

  arr.sort(cmp);
}

exports.render = render;
