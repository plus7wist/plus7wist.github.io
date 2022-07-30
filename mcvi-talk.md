- Email: jiazhongguci@foxmail.com
- Github: <https://github.com/plus7wist>
- Home: <https://plus7wist.github.io>

## Wed, 06 Jul 2022 08:45:36 +0800

To understand reference collapsing, we have to take a note that T can match any
type U, U& or U&&, which match is used is decided by function resolve order and
function declares (not definitions).

Let's treat T as a patten match of U, U& or U&&, so T& can't match U if U is
not a reference, and T&& can't match U if U is not a rvalue reference.

## Wed, 06 Jul 2022 08:26:04 +0800

- Title: Implicitly Construction, Reference Collapsing and Template Functions
- Tags: C++

In C++20:

    void Foo(std::string const &) {} // Foo-cref
    void Foo(std::string &&) {} // Foo-rref
    void FooCall(auto &&s) { Foo(s); }

And in main function, `FooCall("")` calls Foo-cref, `FooCall(std::string{})`
and `FooCall` with local std::string variable calls`Foo-cref`.

Basicly in function FooCall, s is a named value, so Foo in each variant will
receive a lref or the value directly, depends on the arguments types of Foo. So
the two cref calls is reasonable.

However in case of call FooCall with string literal, both Foo-rref and Foo-cref
works if that literal construct a std::string implicitly, C++ standard choose
rref version, for that will be more effective in most cases.

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
