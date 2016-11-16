---
layout: post
title: Be retina ready with media query
tags: [css, media_query, retina]
---

Apple used the term retina display for their devices that renders with very high
resolution that the naked eye would not be able to see individual pixels.

For the web pages to take advantage of this feature we need to use another image
asset which is double the size of the original. But we need to precautions
since not all devices have retina display and it would be waste to send them hi
resolution images which also have bigger file size rather than the normal
image. So we need to be able to decide which image to render.

Here comes, our CSS **media query**

Say we have an banner.png image  with size of 700px by 400px named avatar.png, we need to
make a version of the same image banner@2x.png(of course we can name it any
name but appending @2x seems most appropriate and widely used.) with size of 1400px by 800px.


We could then use the following CSS to determine if the device supports retina
display or not.

Here is what the css looks like:

{% gist lyc4n/95699123d68bf8687a7b retina-image-detect-via-media-query.css %}

