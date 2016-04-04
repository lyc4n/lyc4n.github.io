---
layout: post
title: Uploading file in controller spec
---

Here is how to create an uploaded file in your Rails' controller spec

{% gist lyc4n/c4bf35eba50f427b169f8724758eb0f3 users_controller_spec.rb %}

It uses `Rack::Test::UploadedFile` which is initialized with path, and the content_type which is optional.
This class from the rack-test gem which is being required by Rails' actionpack gem.

`Rack::Test::UploadedFile` behaves similarly `ActionDispatch::Http::UploadedFile` which is the actual class used when a file is uploaded in a real controller class.
`Rack::Test::UploadedFile` provides reader for the
**original_filename** and the **tempfile** then an accessor for the **content_type** while
the ActionDispatch::Http::UploadedFile provides read and write options and a
bit more functionality.

For more details here is the lik to the [rack-test repository](https://github.com/brynary/rack-test) and
documentation of [ActionDispatch::Http::UploadedFile](http://api.rubyonrails.org/classes/ActionDispatch/Http/UploadedFile.html)
