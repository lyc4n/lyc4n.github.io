---
layout: post
title: CSS Spriting in Rails with Compass
tags: [css, rails, sprite]
---

Common websites use multiple images which also
allows the server to receive multiple request for those assets. But as a
developers we would like to lessen the asset request received our servers
so instead it could focus on process related stuffs , and multiple image
requests would not be a help. Lets use sprite. A Sprite is a
single image containing a set of other combined images. The browser would be
needing to send just a single request and still use multiple images. But
of course its not all free, first there is a need to be able to build a
sprite, secondly we need to use css positioning in order to select the proper
image to render within the sprite.

Quick solution would be to use **Compass**.

Compass is defined as 'an open-source CSS authoring framework which uses the
Sass stylesheet language to make writing stylesheets powerful and easy'. Now
we'll try to use it in order to build and use image sprites in a rails project.

Given that we have a Rails project with the image directory of `app/images/hero-icons` that has the following images:

- superman.png
- batman.png
- supermario.png
- spiderman.png


1. First lets add the compass-rails gem. And also make sure you have the sass-rails installed, it is included by default in rails.


    {% gist lyc4n/28ca4daaa309e94f61c2 Gemfile %}

2. Run `bundle install`


3. Lets rename our `application.css` into `application.css.scss` and import compass and the images that we'd like to make sprite out of. Take note that we also wont be able to use sprockets way of including file in our application.css.scss and will use @import instead.


    {% gist lyc4n/28ca4daaa309e94f61c2 application.css.scss %}

4. We then expect to generate the following result


    {% gist lyc4n/28ca4daaa309e94f61c2 application.css %}

5. In the views, we are now able to use those class to display the images :smile:

    {% gist lyc4n/28ca4daaa309e94f61c2 show.html %}


<br>


---

<sub>
<sup>
  Notes:
  <br>
  - Only .png images are supported in the mentioned spriting method above
</sup>
</sub>
