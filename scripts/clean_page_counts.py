#!/usr/bin/env python3
# Copyright 2021 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Produce a cleaned CSV from a Google Analytics report.

This takes a report of the page views from Google Analytics and produces
a cleaned CSV by trimming the header and footer from the report (the first
seven rows and last five rows) and a list of the pages sorted by
popularity (most popular first).
"""

import argparse
import csv
from collections import defaultdict
import json
import os
import sys

import common


def main(argv):
    parser = argparse.ArgumentParser(argv)
    parser.add_argument('pageviews_file', nargs='?', default='-')
    parser.add_argument('-o', '--output', default='-')
    parser.add_argument('--json-list')

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
    sorted_pages = sorted(pages.keys(), key=lambda page: pages[page],
                          reverse=True)
    for i, page in enumerate(sorted_pages, start=1):
        cuml += pages[page]
        writer.writerow([page,
                         '%7.5f' % (pages[page] * 1.0 / tot),
                         '%7.5f' % (cuml * 1.0 / tot)])

    if args.json_list:
        with open(args.json_list, 'w') as fp:
            json.dump(sorted_pages, fp, indent=2)
            fp.write('\n')
    return 0


def _normalize(page):
    q = page.find('?')
    if q != -1:
        page = page[:q]

    if page.startswith('/a/chromium.org/dev'):
        page = page.replace('/a/chromium.org/dev', '')
    if page == '/':
        page = '/chromium-projects'
    page = page.rstrip('/')

    return page


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
