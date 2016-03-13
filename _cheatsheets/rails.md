---
layout: cheatsheet
title: Rails Cheatsheet
---
# Rails Cheatsheet

## Rescuing within a Transaction

___

{% highlight ruby %}
def foo
  begin
    ActiveRecord::Base.transaction do
      p = Post.first
      p.content = "Once upon a time in Camarin"
      p.save! # p object is valid and would save at this point
      p1 = Post.last
      p1.user_id = nil #lets say this is required
      p1.save!
    end
  rescue ActiveRecord::RecordInvalid => e
    # at this point, rollback is already done
    false
  end
end
{% endhighlight %}

From the rails guides:

> Also have in mind that exceptions thrown within a transaction block will be propagated (after triggering the ROLLBACK), so you should be ready to catch those in your application code."

