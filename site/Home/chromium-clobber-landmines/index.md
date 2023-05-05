as close as possible after the roll, since this leaves little gap between therarely necessar
For a given build:

1.  Check out some version of the code
2.  landmines.py runs with the current GYP environment
    1.  This calls get_landmines() for each POSSIBLE target (not just
                the one that's going to be built).
    2.  If &lt;build_dir&gt;/&lt;target&gt;/.landmines doesn't exist,
                it's written with the result of get_landmines(&lt;target&gt;)
    3.  Else
        1.  If the result of get_landmines(&lt;target&gt;) differs from
                    the content of the .landmines file, the diff is written out
                    to &lt;build_dir&gt;/&lt;target&gt;/.landmines_triggered .
        2.  Else &lt;build_dir&gt;/&lt;target&gt;/.landmines_triggered
                    is deleted
3.  compile.py runs with a --target passed to it
    1.  if &lt;build_dir&gt;/&lt;target&gt;/.landmines_triggered exists,
                compile.py prints the contents of the file and behaves as if
                --clobber was specified on the command line.
        1.  clobbering includes removing both .landmines and
                    .landmines_triggered

## Use cases

### Moving generated files

If you move [generated files](/developers/generated-files), then you need to
clobber the build, otherwise stale files may be used (if they are found earlier
during header search). Subtly, this shows up only on *later* CLs that change the
generated file in the new location, but don't overwrite the stale one. See for
example Issue
[381111](https://code.google.com/p/chromium/issues/detail?id=381111)
([comment](https://code.google.com/p/chromium/issues/detail?id=381111#c4)).
Further, if this change happens in a separate repository (e.g., Blink), then CLs
that change the generated files don't work until the repo has rolled and a
landmine has been added. I.e., the steps are:

1.  Submit Blink CL moving generated files.
2.  Roll Blink to Chromium, including landmine (or include in separate
            followup CL).
3.  Submit Blink CL changing generated files.
