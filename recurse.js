function render(page, collection) {
  if (page.endsWith('/')) {
    page = page.substr(0, page.length - 1);
  }

  let subPages = [];
  for (const item of collection) {
    if (item.data.page.url.startsWith(page)) {
      let comps = item.data.page.url.split('/');
      subPages.push({
        title: item.data.title,
        url: item.data.page.url,
        dirname: comps.slice(0, comps.length - 1).join('/'),
        children: [],
      })
    }
  }

  subPages.sort((x, y) => (x.url > y.url ? x : (x.url === y.url ? 0 : -1)));

  console.log(subPages);

  let map = new Map();
  map.set(page, {url: page, children: []});

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
    if (obj.children.length) {
      let s = `${indent}<details>
${indent}  <summary><a href="${obj.url}">${obj.title}</a></summary>
${indent}  <ul>
`;
      for (ch of obj.children) {
        s += `${indent}    <li>\n${walk(ch, depth + 3)}`;
      }
      s += `${indent}  </ul>\n${indent}</details>`;
      return s;
    } else {
      return `${indent}<a href="${obj.url}">${obj.title}</a>\n`;
    }
  }

  return `\n${ walk(map.get(page), 0) }\n`;
}

exports.render = render;
