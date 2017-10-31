---
layout: post
title: OpenStruct and ActiveRecord Combo
tags: [ruby, activerecord, techniques]
---

**What is OpenStruct?**

> An OpenStruct is a data structure, similar to a Hash, that allows the definition of arbitrary attributes with their    
> accompanying values. This is accomplished by using Ruby’s metaprogramming to define methods on the class itself.
> — from [ruby-doc](http://ruby-doc.org/stdlib-2.0.0/libdoc/ostruct/rdoc/OpenStruct.html)

Here is it's basic usage

```ruby
require 'ostruct'
dog = OpenStruct.new

dog.name = 'Snoop'
dog.age  = 1

puts dog.name # => 'Snoop'
puts dog.age  # =>  1
```

You can also inherit from it

```ruby
require 'ostruct'

class Dog < OpenStruct
end

dog = Dog.new({name: 'Brownie', age: 2})
puts dog.name # => 'Snoop'
puts dog.age  # =>  2
```

**Rails ActiveRecord**

You probably know what is [Rails ActiveRecord](http://guides.rubyonrails.org/active_record_basics.html#what-is-active-record-questionmark) so we will move to the interesting part which is querying using raw sql statements. Yes, ActiveRecord provides `find_by_sql` but something deeper lies the `exec_query`. `exec_query` is a method you can call on ActiveRecord's connection adapter:

```ruby
ActiveRecord::Base.connection.class => ActiveRecord::ConnectionAdapters::Mysql2Adapter
```

So, the ActiveRecord::Base.connection returns an instance of `ActiveRecord::ConnectionAdapters::Mysql2Adapter` and it can change depending on what database you will be using. That adapter has the `exec_query` method which can be used to perform raw queries like this:

```ruby
results = ActiveRecord::Base.connection.exec_query('Select * from users limit 2')
puts results.class # => ActiveRecord::Result
ActiveRecord::Result.ancestors # [... Enumerable ...]
```

`exec_query` takes in the query which is a string then returns an instance of `ActiveRecord::Result`. `ActiveRecord::Result` inherits from a number of classes and modules including the `Enumerable` module which means it behaves like an array and enumerates row results which are represented by Hash.

Here we print out each of the hash contained in the result
```ruby
results = ActiveRecord::Base.connection.exec_query('Select id, name from users limit 2')
results.each do |result|
  puts result
end

# => {'id'=>1, 'name'=>'user1'}
# => {'id'=>2, 'name'=>"user2'}
```


**Finally, the combo**

```ruby
class PersonnelSalesReport < OpenStruct
   def self.initialize_collection(attributes_list)
     attributes_list.map do |attributes|
       PersonnelSalesReport.new(attributes)
     end
   end
   
   def foo
     # ...
   end
   
   def bar
     # ...
   end
end
```

```ruby
class PersonnelSalesReportsController < ApplicationController
  def show
     query   = build_complex_query
     results = ActiveRecord::Base.connection.exec_query('Select * from users limit 2')
     @personnel_sales_report = PersonnelSalesReport.initialize_collection(results)
  end
end
```
