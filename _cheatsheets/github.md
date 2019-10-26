---
layout: cheatsheet
title: Github
---
# Github Cheatsheet

## Setting up ssh

___

Check if you have ssh setup in your machine by running:

```sh
$ ls -al ~/.ssh
```

There should be a file called **id_rsa.pub**, **id_dsa.pub**, **id_ecdsa.pub** or **id_ed25519.pub**.

If not you need to generate a new SSH Key with:

```sh
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Copy the public key via

```sh
$ pbcopy < ~/.ssh/id_rsa.pub
# Copies the contents of the id_rsa.pub file to your clipboard
```

Create a new ssh in github settings.
Set the title and for the key you need to paste the public key that was previously stored in the clipboard.
To test if the ssh setup is successful run:

```sh
$ ssh -T git@github.com
```

and you should get a response similar to

```
Hi lyc4n! You've successfully authenticated, but GitHub does not provide shell access.
```
