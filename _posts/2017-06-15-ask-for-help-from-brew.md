---
layout: post
title: Ask for help from brew
---

I use OS X when developing application at work. In OS X homebrew is popular.


What is homebrew?


Wikipedia defines it as: *a free and open-source software package management system that simplifies
the installation of software on Apple's macOS operating system. Originally written by Max Howell,
the package manager has gained popularity in the Ruby on Rails community and earned praise for
its extensibility.*

You can install a package in homebrew via brew install command

```sh
$ brew install mysql
```

Today I learned that brew has an info command:


```sh
$ brew info package-name
```

As you might guess this outputs some valuable information about the specified package you pass in the command.
Say you forgot how to run redis server on your machine and you previously didn't take note on how to do it
then just ask brew about it because sometimes google is not necessary:


```sh
$ brew info redis
```

You will get a result like this which informs you where the package came from
and more importantly it gives information on how to run it:

```
  redis: stable 3.2.9 (bottled), devel 4.0RC3, HEAD
  Persistent key-value database, with built-in net interface
  https://redis.io/
  /usr/local/Cellar/redis/3.2.8 (11 files, 1.7MB) *
    Poured from bottle on 2017-05-08 at 16:39:05
  From: https://github.com/Homebrew/homebrew-core/blob/master/Formula/redis.rb
  ==> Options
  --with-jemalloc
    Select jemalloc as memory allocator when building Redis
  --devel
    Install development version 4.0RC3
  --HEAD
    Install HEAD version
  ==> Caveats
  To have launchd start redis now and restart at login:
    brew services start redis
  Or, if you don't want/need a background service you can just run:
    redis-server /usr/local/etc/redis.conf
```

Now take a cup of brewed :coffee:
