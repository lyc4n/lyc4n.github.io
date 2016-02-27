---
layout: post
title: Trying out Rails 5's Action Cable
---

Rails 5 has been on Beta since the last part of December 2015 and right now the
latest is at 5.0.0.beta2.

Probably the greatest addition brought by Rails 5 is the built in usage of
WebSockets through its new **ActionCable** framework. So, lets try to make
something out of it!

First, make sure you have Rails 5 installed

{% highlight sh %}
# As of today, this would instal version 5.0.0.beta2
gem install rails --pre
{% endhighlight %}

Next, we could now create a new app. For this demo we'll be creating a
Displayer App. It works as a live announcement board for the public and whenever
a new information has been posted, the view for the public would automatically
be updated. We'll skip spring as it has a bug right now(which according to
@dhh, would be fixed before the official release of Rails 5). Then cd into our
app's directory

{% highlight sh %}
rails new displayer_app --skip-spring && cd displayer_app
{% endhighlight %}

Now we'd like to create an announcement model with the following properties:
content, marquee, background ,foreground and a key. Where content would be the main
content of the announcement, marquee would be some other text scrolling at the
bottom and you guess it right and yep text color and background color, and key
as another unique property to identify from different announcement(id could be
used here but we'd like it to be easily set by the user) since we would also want
to be able to post and update multiple announcements realtime.

So lets create a model

{% highlight sh %}
rails g model announcement content:text marquee:text foreground:string
background:string key:string
{% endhighlight %}

Then run our migration with

{% highlight sh %}
rails db:migrate
{% endhighlight %}

although the old `rake db:migrate` would still work, it would be removed in
the future.

Then create controllers and views for index, show and new actions with the
following generator:

{% highlight sh %}
rails g controller announcements index show new create edit
{% endhighlight %}

You probably noticed no update action? We'll let action cable take
care of it this time. Now let us open the **announcements_controller.rb** and
replace with the following:

{% highlight ruby %}
class AnnouncementsController < ApplicationController
  before_filter :set_key_cookie, except: [:new, :create]

  def index
    @announcements = Announcement.all
  end

  def show
    attrs = {key: params[:key]}.merge(defaults)
    @announcement = Announcement.where("key like ?", params[:key]).
      first || Announcement.new(attrs)
  end

  def new
    @announcement = Announcement.new(defaults)
  end

  def create
    @announcement = Announcement.create(create_params)
    redirect_to announcement_path(key: @announcement.key)
  end

  private
  def defaults
    { content: "Waiting...",
      marquee: "Hello from displayer_app",
      background: "black",
      foreground: "green" }
  end

  def create_params
    params.require(:announcement).permit(:content, :marquee, :background, :foreground, :key)
  end

  def set_key_cookie
    cookies[:announcement_key] = params[:key]
  end
end
{% endhighlight %}

and add the routes in config/routes.rb, notice we set param to :key, this is
for us to generate route of **announcements/:key** instead of **announcement/:id**
since we'll be using key rather than id.

{% highlight ruby %}
root to: "announcements#index"
resources :announcements, only: [:index, :show, :new, :edit], param: :key
{% endhighlight %}

Next lets add some view

in app/views/announcements/_form.html.erb

{% highlight erb %}
<% colors = %w(red green blue black white) %>
<% color_options = %>
<%= f.label :content %>
<br>
<%= f.text_area :content %>
<br>
<%= f.label :marquee %>
<br>
<%= f.text_area :marquee %>
<br>
<%= f.label :background %>
<br>
<%= f.select :background, options_for_select(colors, f.object.background) %>
<br>
<%= f.label :foreground %>
<br>
<%= f.select :foreground, options_for_select(colors, f.object.foreground) %>
<br>
<%- if action_name == 'new' %>
  <%= f.label :key%>
  <br>
  <%= f.text_field :key%>
  <br>
<%- else %>
  <%= f.hidden_field :key%>¬  
<% end %>
{% endhighlight %}

in app/views/announcements/new.html.erb

{% highlight erb %}
<h1>New Announcement</h1>
<%= form_for @announcement, class: "new-announcement-form" do |f| %>
  <%= render partial: "form", locals: {f: f} %>
  <%= f.submit %>
<% end %>
{% endhighlight %}

in app/views/announcements/edit.html.erb

{% highlight erb %}
<h1>Edit Announcement</h1>
<%= form_for @announcement, class: "new-announcement-form", method: :put do |f| %>
  <%= render partial: "form", locals: {f: f} %>
  <%= f.submit  "data-disable-with" => false %>
<% end %>
{% endhighlight %}

in app/views/announcements/index.html.erb

{% highlight erb %}
<h1>Announcements</h1>
<% @announcements.each do |announcement| %>
  <span><%= announcement.key %></span>
  <span><%= link_to "Show", announcement_path(announcement) %></span>
  <span><%= link_to "Edit", edit_announcement_path(announcement.key) %></span>
<% end %>
<%= link_to "New announcement", new_announcement_path %>
{% endhighlight %}

in app/views/announcements/show.html.erb

{% highlight erb %}
<div class='announcement-container'>
  <%= render @announcement %>
</div>
{% endhighlight %}

in app/views/announcements/_announcement.html.erb

{% highlight erb %}
<div class='announcement' style="color:<%= announcement.foreground %>;background:<%= announcement.background %>">
  <div class='content'>
    <%= simple_format(announcement.content) %>
  </div>
  <marquee class='marquee'>
    <%= announcement.marquee%>
  </marquee>
</div>
{% endhighlight %}

Now let us activate the ActionCable feature by uncommenting following codes

config/routes.rb

{% highlight coffee %}
mount ActionCable.server => '/cable'
{% endhighlight %}

app/assets/javascripts/cable.coffee

{% highlight coffee %}
@App ||= {}
App.cable = ActionCable.createConsumer()
{% endhighlight %}

We now have to create a channel with the following:

{% highlight sh %}
rails g channel announcement
{% endhighlight %}

This creates two files

- **app/channels/announcement_channel.rb**

    This file will serve as the "controller" of the action cable which will
    receive events sent from the client, you would be needing to create
    different channels for different sub systems in the app but now we
    need only this one. Lets change it to the following:

{% highlight ruby %}
class AnnouncementChannel < ApplicationCable::Channel
  def subscribed
    stream_from "#{current_announcement_key}_announcement"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def announce(data)
    attrs = data['announcement_attrs']
    Announcement.where(key: attrs['key']).first!.tap do |announcement|
      announcement.update_attributes(attrs.except('key'))
    end
  end
end
{% endhighlight %}

- **app/assets/javascripts/channels/announcement.coffee**

    This file contains client code that would call events in the
    announcement_channel.rb. In this case we'd call it upon the submission of
    the form. Lets update it as the following:

{% highlight coffeescript %}
App.announcement = App.cable.subscriptions.create {channel: "AnnouncementChannel"},
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    $('.announcement-container').html(data)

  announce: (data) ->
    @perform 'announce', data

$(document).on 'submit', '.edit_announcement', (e) ->
  e.preventDefault()
  form = $(e.target)
  App.announcement.announce(announcement_attrs: {
    content: form.find('#announcement_content').val(),
    marquee: form.find('#announcement_marquee').val(),
    background: form.find('#announcement_background').val(),
    foreground: form.find('#announcement_foreground').val(),
    key: form.find('#announcement_key').val()
  })
  form.find('input[type=submit]').attr('disabled', false)
  return false
{% endhighlight %}

Next we'd have to set `identified_by` method in our ApplicationCable::Connection.
We pass it a symbol for the name of the instance variable that we would use to identify
which channel our connection should `stream_from`.

We would see its usage in **app/channels/announcement_channel.rb**.

So now lets head to **app/channels/application_cable/connection.rb** and update it:

{% highlight ruby %}
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    # This identified_by macro will set an attr acessor
    # for each of the symbols you pass in here.
    # Yes I meant you can pass multiple identifiers
    # here is the link to it's source if you'd like to check:
    # https://github.com/rails/rails/blob/d3f0aa36c388310fbbbcab6295548dc18e385d0f/actioncable/lib/action_cable/connection/identification.rb#L19
    identified_by :current_announcement_key #, :current_user_id, etc..

    def connect
      self.current_announcement_key = cookies[:announcement_key]
    end
  end
end
{% endhighlight %}

Now let us also update our Announcement class to automatically Broadcast whenever it gets updated:

{% highlight ruby %}
class Announcement < ApplicationRecord
  after_update_commit { BroadcastAnnouncementUpdateJob.perform_now(self) }
end
{% endhighlight %}

And also let us create the Job. Putting the broadcast action into job makes the 
process non-blocking.

{% highlight sh %}
rails g job BroadcastAnnouncementUpdate
{% endhighlight %}

Then lets change app/jobs/broadcast_announcement_update_job.rb to this:
{% highlight ruby %}
class BroadcastAnnouncementUpdateJob < ApplicationJob
  queue_as :default

  def perform(announcement
    view = ApplicationController.renderer.render(announcement)
    ActionCable.server.broadcast "#{announcement.key}_announcement", view
  end
end
{% endhighlight %}

Let as add some stylesheet to make the view a bit nicer:

{% highlight scss %}
html, body, .announcement-container, .announcement-container > .announcement{
  height: 100;
}

body{ margin: 0px;}

.announcement{
  text-align: center;
  font-size: 52px;
  padding-top: 40px;
  position: relative;
  box-sizing: border-box;
  font-weight: bolder;
  .marquee{
    font-size: 25px;
    position: absolute;
    bottom: 10px;
    padding-left: 5px;
    padding-right: 5px;
    left: 0px;
    right: 0px;
    border-top: 1px solid gray;
  }
}
{% endhighlight %}



And that's it for our app, to run it:

1. Run the server with `rails s`
2. Open http://localhost:3000/announcements/new
3. Fill up announcement details (for now lets set the key to 'company')
4. Submit the form, it would be directed to the announcment show page
5. Open http://localhost:3000/announcements/company/edit in another tab
6. When we submit the edit form, the previous tab gets updated!

Here's how it would look like:

![Final output](https://drive.google.com/uc?export=view&id=0BzzUFuhnnJrWTlJUUHVSbU9RTzQ)


# TLDR;

ActionCable in Rails 5 is pretty straight forward. When you create a new app, some codes you need to enable 
ActionCable functions are just commented out: 

1. The cable webserver path in config/routes.rb
2. The javascript initialization for the framework in app/assets/javascripts/cable.coffee

After those you would need to generate a channel with:

{% highlight sh %}
rails g channel announcement
{% endhighlight sh %}

The above creates 2 files:

1. app/assets/javascripts/channels/announcement.coffee

    - This contains the JS object that you can use to call actions from the channel in the web server
    - We usually use that JS object as callbacks to DOM events like to trigger a server method upon the submission of a form and also use the data returned by the server

2. app/channels/announcement_channel.rb

    - It has default methods subscribed and unscubscribed
    - In subscribed method we set the channel to stream from via `stream_from`
    - We add custom methods in here that can be called from the client. These methods could contain save, update or any other operation
    - In custom method we can return the data back to the client with `ActionCable.server.broadcast(channel_name, data)`, but broadcasting is not limited inside the channel class, it can also be called within an activerecord model or within a job to make it non blocking.

I'd like to add that another thing new in Rails 5 that complements action cable is the ability to render outside the controller with the following:

{% highlight sh %}
# Given that announcement is an instance of Announcment class which is an active_record class
# the following will render 'app/vies/announcments/_announcement.html.erb and store in in the view object
view = ApplicationController.renderer.render(announcement)
{% endhighlight %}

The sample app we used the above method to render and broadcast inside a Job class.

So thats it, ActionCable is a great addition into the Rails framework. :punch: :rocket:
