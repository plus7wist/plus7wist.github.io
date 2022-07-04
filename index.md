- Email: jiazhongguci@foxmail.com
- Github: <https://github.com/plus7wist>

## Mon, 04 Jul 2022 11:11:58 +0800

- Title: Bad Compare Function Makes `std::sort` Crash
- Tags: C++

Compare function of std::sort must makes container establish strict week
ordering relation, or sort function might cause segmentation fault because of
index out of range. One general situation is use `<=` to compare a field.

    bool CompareT(T const &lhs, T const &rhs) { return lhs.x <= rhs.x; }

- <https://en.cppreference.com/w/cpp/named_req/Compare>
- <https://en.wikipedia.org/wiki/Weak_ordering#Strict_weak_orderings>

## Mon, 04 Jul 2022 10:22:54 +0800

- Title: Copy Elision
- Tags: C++

Following function:

    C f() { return C(); }

In C++17 don't copy or move any instance of C, this is called copy elision.
