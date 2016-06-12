---
layout: post
title: 'TIL: Variable Hoisting - Terminology'
---

Been developing for quite sometime in the web but it is just today that I
learned about the term **Variable Hoisting**. Literally to **hoist** means *to raise* or *to lift*.

It turns out this is what happens when you have the following code:

{% gist lyc4n/d02da3f8e91b25fba3d1db5137330546 variable_hoisting.js %}

Javascript internally hoists the declaration(not including the assignment) of the variable at the beginning of the block enabling us to
call it within.
