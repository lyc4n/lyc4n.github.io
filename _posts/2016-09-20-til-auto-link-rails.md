---
layout: post
title: 'TIL: Auto link Rails gem'
tags: [autolink, rails, gem]
---

The team changed rule on what must be stored on a specific column. We used to store just a single url which we output as a link on the view. Now it is allowed to store combination of plain texts and urls. And all urls have to display as a link in the views.

One quick solution to this is to use the [rails_autolink](https://github.com/tenderlove/rails_autolink){:target="_blank"} gem. It used to be a part of rails but removed at some point and have been extracted as a gem. To use it, just
include it in the Gemfile then run `bundle install`:

`gem 'rails_autolink'`

The `auto_link` helper would then be available on your views as a helper.


{% highlight ruby %}
  <%= auto_link 'A: www.example.com/my_media_page B: www.example.com/my_blog' %>
{% endhighlight %}

Would output:

{% highlight text %}
  A: <a href='www.example.com/a'>www.example.com/a</a>B: <a href='www.example.com/b'>www.example.com/b</a>
{% endhighlight %}

