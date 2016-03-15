---
layout: cheatsheet
title: Vim Cheatsheet
---
# Vim Cheatsheet

## Adding scripts coming from vim.org

___

Eg:

Script to add => Rename2.vim

Add the following in Vundle plugin:

{% highlight ruby %}
Plugin 'vim-scripts/Rename2'
{% endhighlight %}


## Steps to record a macro

___

1. In normal mode press "q"
2. Press another key to register for the macro
3. Perform operations
4. Again press "q" to end the macro
5. Call the macro by pressing @ then the registered key
