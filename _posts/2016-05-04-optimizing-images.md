---
layout: post
title: Optimizing Images
---

When building a web app we cannot deny the fact that there would be need to
present user with images and there are apps that require a lot of them. When
using images we need to make sure it is optimized for the web. To do so we can
use tools such as `optipng` and `jpegoptim` for `png` and `jpeg` images
respectively.

First we need to install those packages. For ubuntu:

jpegoptim

`sudo apt-get install jpegoptim`

optipng

1. Download stable version from [sourceforge](http://optipng.sourceforge.net/)
2. Untar downloaded file and [install](/cheatsheets/ubuntu/#install-and-uninstall-package)
3. `sudo apt-get install optipng`


Then we need to execute them on the files. Say we have png and jpg files in the
folder called image-assets within the current directory we then have to execute
the following:

`for image in image-assets/*.jpg; do  jpegoptim $image -f --strip-all --all-progressive; done`

- `strip-all` option removes metadata for the image which is not necessary for displaying it
- `all-progressive`  option lets the image load progressively meaning unlike the usual loading which is from top to bottom it will load the whole image and little by little adding the details.

`for image in image-assets/*.png; do  optipng $image -o7 -strip all; done`

- `o7` optimizes the image on the scale of 7 (between 0 to 7 with default of 2)where 7 is the most optimized but the slowest especially for larger images.
- `strip all` removes metadata from the image.
