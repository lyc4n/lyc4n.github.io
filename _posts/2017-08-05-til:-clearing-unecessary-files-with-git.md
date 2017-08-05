---
layout: post
title: Clearing unecessary files with git
---

Have you ever been on a situation when there are some unecessary untracked
files on your repository? Probably yes. It would be easy to just perform an `rm`
to delete a single untracked file  or `rm -rf ./unwanted_dir` to remove a directory plus it's content.
However, this could take time when there are a lot that needs to be remove.

That's where `git clean` comes in handy. By default it would remove only the
untracked the files. Passing it the **-d** flag also removes the untracked the
directory. Another useful flag is the **-i** which lets you enter in an
interactive clean prompt which will let you confirm removal of the
files/directories:

```sh
$ git clean -d -i
```

So, save some time by using [git clean](https://git-scm.com/docs/git-clean)!
