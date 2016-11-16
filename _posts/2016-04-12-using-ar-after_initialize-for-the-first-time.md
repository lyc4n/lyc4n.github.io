---
layout: post
title: Using AR after_initialize for the first time
tags: [activerecord, rails, after_initialize]
---

So I have been using Rails for quite some time but it was only today that I get
to use the `after_initialize` callback. This is called everytime an
ActiveRecord object is initialized (eg. when fetched from the database or when
called with the `new` constructor)

The requirement was to move default value of a model which was previously set
from the database into a constant in order to make it easier to change. Here is
how my solution looked like(this is not actual code but it is algorithmically
same)

{% gist lyc4n/b53b91258f966ef118081204c9e084b0 foo.rb %}

Notice above the use of **self keyword**. The reason behind this
is that setters and getters in rails are actually methods. So here we actually
have a `def bar=` that we would like to be invoked. Removing the
`self` in the code above would make Ruby assume that bar is a **local variable**.
