source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)
gem 'github-pages', versions['github-pages']

gem 'uglifier'
gem 'sass'

group :jekyll_plugins do
  gem 'jekyll-gist'
  gem 'jemoji'
  gem 'jekyll-mentions'
  gem 'jekyll-assets'
  gem 'jekyll-seo-tag'
end
