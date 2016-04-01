---
layout: post
title: More organized Constant storage in Ruby
---

Probably when you create an ActiveRecord model you would also have the need to
add some constants bound to that model, and there would be times when there is
a lot of constants you will be adding, some might say that thats just fine to
pile all of those constants at the top of the class but for me it would be
better to move all of them into just a single place that will house the
constants in an more organized way.

{% gist lyc4n/2d3a4d2c9d261c5e8719f73ca68b770e domain_constants.rb %}

{% gist lyc4n/2d3a4d2c9d261c5e8719f73ca68b770e application_controller.rb %}

{% gist lyc4n/2d3a4d2c9d261c5e8719f73ca68b770e user.rb %}
