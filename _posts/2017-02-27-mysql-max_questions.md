---
layout: post
title: MySQL max_questions
tags: dev
---

This past week I learned about MySQL `max_question` which is the maximum number of
queries your database user can use in an hour. This usually has its value set to 0 by
default which means unlimited queries per hour on your development machine. It
is a different case though when you are on production. Take for example our app
which is hosted on heroku with cleardb's scream plan, it allows up to 54000
queries per hour. We happen to execute more queries than it allowed at a
some points and it leads us to this error:


  ```
     User 'someusername' has exceeded the 'max_questions' resource (current value: 54000)
  ```

So was caused by a daily mail batch that we are sending to our users with
contents changing depending on quite a number of parameters and leads us to
issue a hell lot of queries.

To solve this problem we optimized queries, by using `includes` feature of
ActiveRecord which eagerloads associations in order to avoid n + 1 queries
(this issue taught me to always mind about them).
Moving some logic on Plain Ruby Object also helps. It's like loading all
records at once in a hash and then matching other objects through that hash and
not from the database thus saving trips to the db.

It also turned out that cleardb allows creation of a readonly user on their paid
plans. The readonly user will have its `max_question` limited to half of the normal value
so we it is still very useful when used on a dedicated process like the daily
sending of mail.

We can still possibly hit the limit depending on the number of users or pageviews but for now it will suffice.
Hopefully we'll be able to migrate to a mysql plan with unlimited max_questions
soon.
