#!/usr/bin/env python3

import argparse
import csv
from collections import defaultdict
import os
import sys

import common


def main(argv):
    parser = argparse.ArgumentParser(argv)
    parser.add_argument('pageviews_file', nargs='?', default='-')
    parser.add_argument('-o', '--output', default='-')

    args = parser.parse_args()

    if args.pageviews_file == '-':
        fp = sys.stdin
    else:
        fp = open(args.pageviews_file, newline='')
    reader = csv.reader(fp)

    pages = defaultdict(lambda: 0)
    rows = list(reader)[7:-5]
    for row in rows:
        page = _normalize(row[0])
        if os.path.exists(os.path.join(common.SITE_DIR, page[1:], 'index.md')):
            pages[page] += int(row[1].replace(',', ''))

    fp.close()

    if args.output == '-':
        fp = sys.stdout
    else:
        fp = open(args.output, newline='', mode='w')

    tot = sum(pages.values())
    writer = csv.writer(fp)
    writer.writerow(['Page', 'Pct', 'Cuml_Pct'])
    cuml = 0
    for i, page in enumerate(sorted(pages.keys(), key=lambda page: pages[page],
                                    reverse=True), start=1):
        cuml += pages[page]
        writer.writerow([page,
                         '%6.4f' % (pages[page] * 1.0 / tot),
                         '%6.4f' % (cuml * 1.0 / tot)])

    return 0


def _normalize(page):
    q = page.find('?')
    if q != -1:
        page = page[:q]

    if page.startswith('/a/chromium.org/dev'):
        page = page.replace('/a/chromium.org/dev', '')
    if page == '/':
        page = '/chromium-projects'

    return page


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
