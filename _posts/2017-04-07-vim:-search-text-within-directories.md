---
layout: post
title: 'Vim: search text within directories'
tags: [vim]
---

Every developer needs a good way to search a text within a directory. And for a some time now I have been using and has been satisfied with something like:

```bash
$ find ./config/  -type f  | xargs grep "8080" --color
```

Which I run from the terminal (outside of vim)

It works but then it can be better. So I looked for another option and found
**Ack**. It is said to be *designed as an alternative to grep for programmers*
according to its man page.

From the terminal you can use it as follows:


```bash
  $ ack --html site-menu-container  ./_site/
```

Which will find the text **site-menu-container** on all html files within the
./_site directory.

Note that the directory and the filetype options are optional.
But this wont work well with vim right out of the box. Thankfully, there
already has been a vim plugin for this which is **mileszs/ack.vim**.

So install that plugin and you will be able to run ack within vim like this:


```vim
  :Ack --html site-menu-container  ./_site/
```

Results will be shown on vim's quickfix window.
And yes, that is capital letter A when running ack within vim.
