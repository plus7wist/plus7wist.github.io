#! /usr/bin/env python3

import argparse
import datetime
import re


def main():
    red4 = r"(\d{4})"
    red2 = r"(\d{2})"
    redate = r"## {d4}/{d2}/{d2} {d2}:{d2}:{d2}".format(d4=red4, d2=red2)

    redate = re.compile(redate)

    parts = [part for part in parse_article(redate, "journal.md")]
    parts.sort(reverse=True)

    for line in merge_empty_line(normal_article_lines_from_parts(parts)):
        print(line)


def normal_article_lines_from_parts(parts):
    for title, content in parts:
        yield "## " + title
        for line in content:
            yield line


def merge_empty_line(lines):
    previous_empty = False
    for line in lines:
        if len(line) == 0 and previous_empty:
            continue
        yield line
        previous_empty = len(line) == 0


def parse_article(redate, path):
    title = None
    content = []
    weekname = "一二三四五六日"

    with open(path) as reader:
        for line in reader:
            match = redate.match(line)
            line = line.rstrip()

            if not match:
                content.append(line)
                continue

            if title is not None:
                yield title, content[:]
                content.clear()

            date_info = list(map(int, match.groups()))
            date = datetime.datetime(*date_info)
            title = "{:04}/{:02}/{:02} {:02}:{:02}:{:02} {}".format(
                *date_info, weekname[date.weekday()]
            )

    if title is not None:
        yield title, content


main()
