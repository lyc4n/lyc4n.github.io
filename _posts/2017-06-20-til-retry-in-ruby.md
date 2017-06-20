---
layout: post
title: 'TIL: Retry in Ruby'
---

I was working with an api and encountered a situation where the api server tend to raise some unexpected error.
The case seems to be inevitable when working with api. So I thought maybe there is a way in ruby to handle those times
wherein we prefer to perform the operation once again whenever we hit a specific error.

Here Ruby's `retry` function will come in handy. It can be called within a rescue block in order to
perform the rescued block again.

```ruby
  def fetch_api_records
    begin
      api.perform
    rescue SomeApiTimeoutError
      retry
    end
  end
```

This however could possibly result to a never ending retry.


We can improve this by adding a limit to the number of tries:

```ruby
  def fetch_api_records
    begin
      api.perform
    rescue SomeApiTimeoutError
      # @fetch_api_retry_counter should be set probably in the class initializer
      retry if (@fetch_api_retry_counter =- 1) > 0
    end
  end
```
