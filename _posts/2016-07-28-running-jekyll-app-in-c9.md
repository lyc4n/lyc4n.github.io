---
layout: post
title: 'TIL: Running jekyll app in C9 IDE'
tags: [c9, jekyll]
---

Today I tried to use c9 ide and discovered that it does not automatically run jekyll applications.
You can exectue the following in c9's terminal instead:

{% gist lyc4n/9938d27bdaa722ad349f8498db27d746 term %}

But I learned that it is possible to just create a runner specifically for a jekyll app by creating a new runner like this:

{% gist lyc4n/9938d27bdaa722ad349f8498db27d746 c9_jekyll_runner %}

To set this: 

1. Go to Run > Run With > New Runner 
2. Paste the above code
3. Hit Ctrl + S 
4. Set the runner's name as 'Jekyll' or whatever you like


Now we can run the app using our custom runner by going to **Run > Run With > Jekyll**
The next time, we just need to click the 'Run' button and it will use the Jekyll runner.

