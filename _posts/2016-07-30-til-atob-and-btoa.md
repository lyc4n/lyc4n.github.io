---
layout: post
title: 'TIL: atob and btoa functions in JS'
---

I came across a JS code like this (not the exact code):

`var foo = atob(bar)`

and wondered if it was a typo error because atob was never defined in the code.
But it turned out that **atob** is a built in function in JS that **decodes base64 encoded string**
and that there exists a supplementary function **btoa** which **encodes string as base64**.
