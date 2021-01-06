import os
import re
import argparse
import glob
from functools import partial


# Usage:
#   make-toc.py  article/
#
# Find articles, write article list with title to article/ReadMe.md.


def find_title(path):
    re_title = re.compile(r"# (.*)")

    with open(path) as reader:
        for line in reader:
            match = re_title.match(line)
            if not match:
                continue
            return match.group(1)

    raise ValueError("cannot found title of: " + path)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("dir")
    cli = parser.parse_args()

    with open(os.path.join(cli.dir, "ReadMe.md"), 'w') as writer:
        fprint = partial(print, file=writer)
        for file in sorted(public_article_names(cli.dir)):
            title = find_title(os.path.join(cli.dir, file + ".md"))
            fprint("- [{}]({})".format(title, file))

    print("Ok")


def public_article_names(dir):
    for file in os.listdir(dir):
        if (
            len(file) > 0
            and "A" <= file[0] <= "Z"
            and file.endswith(".md")
            and file != "ReadMe.md"
        ):
            yield file[:-3]


main()
