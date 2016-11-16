---
layout: post
title: Checking if fragment caching works in development env
tags: [caching, rails, fragment-caching]
---

Lets say we have the following

{% gist lyc4n/5ffda03305ede3cd936cb9898112894e static_pages_controller.rb %}

{% gist lyc4n/5ffda03305ede3cd936cb9898112894e index.html.erb %}

Caching is disabled by default in Rails' development environment but if you
want to see it in action you can turn it on and restart your server:

{% gist lyc4n/5ffda03305ede3cd936cb9898112894e development.rb %}

Then we just need to change values in our controller and then refresh to check
and see if the caching worked.

{% gist lyc4n/5ffda03305ede3cd936cb9898112894e static_pages_controller_updated.rb %}


These cache values can also be changed throug the console, given that we know
the hash key of the cached fragment which we can see in the server logs.


![server_log](https://drive.google.com/uc?export=view&id=0BzzUFuhnnJrWb0trSUtqRi1zcXc)


Here we can determine that the key for our fragment that we can use in the
console is:

`['welcome', 'f146f47a28c36ad4bca4e687f94ff78a']`

So to change or read it's value while we are in the console we can do the
following:

{% gist lyc4n/5ffda03305ede3cd936cb9898112894e console.rb %}
