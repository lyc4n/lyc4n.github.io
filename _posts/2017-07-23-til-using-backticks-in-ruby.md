---
layout: post
title: "TIL: Using backticks in Ruby"
---

So I was looking for a way to display the revision hash of a rails app
repository and found this:

```ruby
module AppName
  REVISION = `git log --pretty=format:'%h' -n 1`
end
```

The above code makes use of **backticks** which lets us __execute code into the
shell__ and return it's result so that we can store it into a variable that we
can use in the app to display the hash of the latest revision.

While playing with the backicks I noticed that you can also do string
interpolation with it but you probably don't want to do it unless you surely
know what you are doing because just like the *eval* method it could also lead
to execution of unwanted codes.
