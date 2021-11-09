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

"""Simple script to download the original chromium.org files.

This script downloads a (crawled version of) the files on the
Sites v1 version of www.chromium.org into //build/originals.

This script exists because the originals.tar.gz.sha1 contains
files under build/originals, and download_from_google_storage.py won't let
download to files that aren't under a directory matching the basename
of the tgz (i.e., originals/).

TODO(dpranke): We should fix this in download_from_google_storage, but
for now we work around it explicitly (and clumsily).
"""

import argparse
import hashlib
import os
import subprocess
import sys
import tarfile

SRC_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))

def main():
  parser = argparse.ArgumentParser(description=__doc__)
  parser.parse_args()

  with open(os.path.join(SRC_ROOT, 'originals.tar.gz.sha1')) as fp:
    expected_sha1 = fp.read().strip()

  actual_sha1 = None
  tgz = os.path.join(SRC_ROOT, 'originals.tar.gz')
  if os.path.exists(tgz):
    with open(tgz, 'rb') as fp:
      s = hashlib.sha1()
      s.update(fp.read())
      actual_sha1 = s.hexdigest()

  # TODO(dpranke): Consider whether we should validate that node_modules/
  # and all of the expected files exist as well.
  if actual_sha1 == expected_sha1:
    return 0

  retcode = subprocess.call([
      'gsutil.py',
      'cp',
      'gs://chromium-website-lob-storage/%s' % expected_sha1,
      tgz
  ])
  if retcode:
    return retcode

  try:
    # TODO(dpranke): download_from_google_storage puts in a fair amount
    # of effort to not clobber an existing directory until it is sure it
    # can extract the archive completely. Consider whether we should do
    # the same.
    with tarfile.open(tgz, 'r:gz') as tar:
      tar.extractall(path=SRC_ROOT)
    return 0
  except Exception as e:
    print(e)
    return 1

if __name__ == '__main__':
  sys.exit(main())
