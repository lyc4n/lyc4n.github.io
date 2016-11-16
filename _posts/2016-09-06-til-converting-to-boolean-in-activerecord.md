---
layout: post
title: 'TIL: Converting to Boolean in ActiveRecord'
tags: [activerecord]
---

Every once in a while there is a need to pass string representations of boolean in Rails.
The framework intelligently handles this work for us developers and today I learned
the method in ActiveRecord that does the job:

in Rails < 4.2:
{% highlight ruby %}
  ActiveRecord::ConnectionAdapters::Column.value_to_boolean('0') => false
  ActiveRecord::ConnectionAdapters::Column.value_to_boolean('1') => true
{% endhighlight %}

 
From Rails 4.2:
{% highlight ruby %}
  ActiveRecord::Type::Boolean.new.type_cast_from_user('0') => false
  ActiveRecord::Type::Boolean.new.type_cast_from_user('1') => true
{% endhighlight %}

Rails 5:
{% highlight ruby %}
  ActiveRecord::Type::Boolean.new.deserialize('0') => false
  ActiveRecord::Type::Boolean.new.deserialize('1') => true
{% endhighlight %}
