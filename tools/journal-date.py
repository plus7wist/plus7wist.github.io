#! /usr/bin/env python

import datetime


def current_datetime():
    return datetime.datetime.now()


def main():
    current = current_datetime()
    weekday_name = "一二三四五六日"

    print(
        "{:04d}/{:02d}/{:02d} {:02d}:{:02d}:{:02d} {}".format(
            current.year,
            current.month,
            current.day,
            current.hour,
            current.minute,
            current.second,
            weekday_name[current.weekday()],
        )
    )


if __name__ == "__main__":
    main()
