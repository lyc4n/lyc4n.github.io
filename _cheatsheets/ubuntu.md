---
layout: cheatsheet
title: Ubuntu Cheatsheet
---

# Ubuntu Cheatsheet

##Install and Uninstall Package

---

**Install tar.gz file (tarball)**

1. Untar with `tar xvf package-name.tar.gz`
2. `cd package-name`
3. `./configure`
4. `make`
5. `sudo make install`

**Basic install**

- `sudo apt-get install package-name`

**Install specific verion of package**

- `sudo apt-get install package-name=version`

**Uninstall with apt-get**

- `sudo apt-get remove package-name`

**Show available versions**

- `apt-cache policy package-name`
