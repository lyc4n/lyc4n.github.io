---
layout: post
title: Uploading file in controller spec
tags: [rails, rspec, file-upload]
---

Here is how to create an uploaded file in your Rails' controller spec;

{% gist lyc4n/c4bf35eba50f427b169f8724758eb0f3 users_controller_spec.rb %}

`Rack::Test::UploadedFile` is from the rack-test gem which is being required by Rails' actionpack gem.
It is initialized with path, optional content_type which is optional(auto sets to "text/plain" when not specified),
and an optional binary flag which is default to false.

`Rack::Test::UploadedFile` behaves similarly with `ActionDispatch::Http::UploadedFile` which is the actual class used when a file is uploaded in a real controller class.
The former provides reader for the `original_filename` and the `tempfile` then an accessor for the `content_type` while
the latter provides read and write options and a bit more public methods like
`open`, `read` and `rewind` to work with the tempfile.

For more details here is the link to the [rack-test](https://github.com/brynary/rack-test) repository and
documentation of [ActionDispatch::Http::UploadedFile](http://api.rubyonrails.org/classes/ActionDispatch/Http/UploadedFile.html).
