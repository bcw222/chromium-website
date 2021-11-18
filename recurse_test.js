const m = require('./recurse.js');

let pages = [
  { data: { page: { title: '/a/d t', url: '/a/d' }}},
  { data: { page: { title: '/a t', url: '/a' }}},
  { data: { page: { title: '/a/b1/c1 t', url: '/a/b1/c1' }}},
  { data: { page: { title: '/a/b1 t', url: '/a/b1' }}},
  { data: { page: { title: '/a/b2 t', url: '/a/b2' }}},
  { data: { page: { title: '/a/b1/c2 t', url: '/a/b1/c2' }}},
  { data: { page: { title: '/a/b2/c3 t', url: '/a/b2/c3' }}},
  { data: { page: { title: '/a/b3 t', url: '/a/b3' }}},
];

/*
let map = new Map();

for (let page of pages) {
  let comps = page.url.split('/');
  page.dirname = comps.slice(0, comps.length - 1).join('/');
  page.basename = comps[comps.length - 1];
  page.children = []
  map.set(page.url, page);
  if (map.has(page.dirname)) {
    map.get(page.dirname).children.push(page);
  }
}


function walk(obj, depth) {
  let indent = '';
  for (i = 0; i < depth; i++) {
    indent += '  ';
  }
  if (obj.children.length) {
    let s = `${indent}<details>\n${indent}  <summary><a href="${obj.url}">${obj.title}</a></summary>\n${indent}  <ul>\n`;
    for (ch of obj.children) {
      s += `${indent}    <li>\n${walk(ch, depth + 3)}`;
    }
    s += `${indent}  </ul>\n${indent}</details>\n`;
    return s;
  } else {
    return `${indent}<a href="${obj.url}>${obj.title}</a>\n`;
  }
}
*/

console.log(m.render('/a', pages));
