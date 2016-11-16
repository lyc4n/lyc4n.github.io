---
layout: post
title: Default hash value mutated unexpectedly!
tags: [hash, ruby]
---

Ruby provided us ability to set a default value in it's Hash class like:

`foo = Hash.new([])`

That creates a hash that when called with an unset key returns an empty array
instead of `nil`.

Lets say we have an array of words and we'd like to know on what indexes each
of those words appear in our array one might think to use hash default like
the following:

{% highlight ruby %}
foo = Hash.new([])
%w(i am the eye in the sky).each_with_index do |word, index|
  foo[word] << index
end

# Now we expect 
{% endhighlight %}

Here we expect foo to be:

{% highlight ruby %}
{"i"=>[0], "am"=>[1], "the"=>[2, 5], "eye"=>[3], "in"=>[4], "sky"=>[6]}
{% endhighlight %}

**But NO!!!!** Here's what we get instead:

{% highlight shell %}
2.2.0 :011 > foo['i']
 => [0, 1, 2, 3, 4, 5, 6] 
2.2.0 :012 > foo['am']
 => [0, 1, 2, 3, 4, 5, 6] 
2.2.0 :013 > foo['thiskeyshouldnotexists']
 => [0, 1, 2, 3, 4, 5, 6] 
{% endhighlight %}


What happens is our default value gets mutated everytime we perform the shovel operator on the non existent key of the hash

{% highlight ruby %}
foo = Hash.new([])
# ...
#some code omitted
# ...
# The default value changes everytime
# the word key is nonexistent in our hash
foo[word] << index 
{% endhighlight %}


The solution here is to use `+=` operator rather than the `<<` operator because the latter will mutate the array which means it would use and return the same object.
We can confirm that by looking at the object's id (Object#object_id)

{% highlight shell %}
2.2.0 :018 > my_array = []
 => [] 
2.2.0 :019 > my_array.object_id
 => 22368740 
2.2.0 :020 > foo = my_array << 23
 => [23] 
2.2.0 :021 > foo.object_id # foo will have the same object_id with my_array
 => 22368740 
2.2.0 :022 > bar = foo += [22]
 => [23, 22] 
2.2.0 :023 > bar.object_id
 => 22230500 
{% endhighlight %}

So our final code will be changed to:
{% highlight ruby %}
foo = Hash.new([])
%w(i am the eye in the sky).each_with_index do |word, index|
  foo[word] += [index]
end

foo #  {"i"=>[0], "am"=>[1], "the"=>[2, 5], "eye"=>[3], "in"=>[4], "sky"=>[6]}
{% endhighlight %}

