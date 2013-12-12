# italiansubs-plus-plus

---

**ItaSA++** is a Google Chrome extension that adds features to the [Italiansubs.net](http://www.italiansubs.net "ItaSA") website.

[![Get it it from the Chrome WebStore](https://developers.google.com/chrome/web-store/images/branding/ChromeWebStore_Badge_v2_340x96.png "Get it it from the Chrome WebStore")](https://chrome.google.com/webstore/detail/italiansubs++/pmgjnimdciihbnpncflnkcmjpkmklooh)

The extension is in Italian, since the website it works on targets Italian speakers.

## Authors

**Francesco Pontillo** (<macgyver@italiansubs.net>), **Sebastiano Poggi** (<rock3r@italiansubs.net>).

## Features
 
* **Better ITASA.** Bugfixes and improvements to the whole website.
* **Open all unread answers.** Shows the "Open all" button in the forum "Unread answers" page. A click on the button opens each thread in a separate tab/window.
* **Open all new topics.** Shows the "Open unread" button in each forum page. A click on the button opens each thread with unread posts in a separate tab/window.
* **High contrast forum.** Increase contrast between adjacent posts in a thread. Colors are similar to those of version 2 of the forum.
* **Posts separator.** Add a separator between adjacent posts in a thread.
* **Compact posts.** Reduces posts size to the minimum, compacting the view.
* **Smaller fonts.** The font of the posts is smaller. AKA: "eleven tenths".
* **Bigger fonts.** The font of the posts is bigger. AKA: "myopia I don't want ya".
* **Droid Mode.** Use Android 4's "Roboto" font throughout the website.
* **KitKat Mode.** Overhaul the website appearance to look Android-y and modern. *#HOLOYOLO!*
* **Focus Mode.** Make the distinction between read and unread, with and without linked TV series, topics throughout the forum.
* **Highlighted Mode.** Highlight the "PMs" and "likes" buttons in red when you have unread items in those categories.
* **Yvonne ♥ Better Spoiler.** Adds buttons to expand or collapse all spoilers in a topic page.
* **Android KitKat Mode.** New version of Droid mode, inspired to Android 4.4 KitKat. It can't be used together with Droid Mode, and it can change the behaviour of other mods.

## Building

### Prerequisites

In order to build this extension, you need a working **NodeJS** and **ruby** environment. Then, open a shell and execute:

	npm install grunt-cli bower yo generator-chrome-extension -g
	gem install compass

To install all of the required dependencies, move into the root of the project and call

	npm install & bower install

### Build tasks

The list of supported task is:
* `grunt`, executes JSHint, tests and builds the extension
* `grunt jshint` executes JSHint on the project
* `grunt build` builds the project (inside the `dist` folder and as a zip in the `package` folder)

## Version History

* **v1.2.1:** Some fixes.
* **v1.2.0:** Added the *Android KitKat mode* mod, fixes to the *Droid mode*, plus under-the-hood changes.
* **v1.1.5:** Minor bug fix for Better ITASA.
* **v1.1.4:** Bugfix for the Christmas theme.
* **v1.1.3:** Bugfix for Macs.
* **v1.1.2:** Opening multiple tabs keeps focus on the current tab.
* **v1.1.1:** Bugfixes.
* **v1.1.0:** Added the *Compact posts* mod, added throttling when opening multiple posts, bugfixes.
* **v1.0.10:** Bugfixes.
* **v1.0.9:** Added the *Bigger fonts* mod. Made fonts smaller in the *Smaller fonts* mode.
* **v1.0.8:** Added the *Yvonne ♥ Better Spoiler* mod.
* **v1.0.7:** Added the *Highlighted Mode* mod.
* **v1.0.6:** Bugfixes.
* **v1.0.5:** Added the *Better Itasa* mod. Added the ability to selectively open unread posts.
* **v1.0.4:** Added the *Focus Mode* mod.
* **v1.0.3:** Fixes for some different page sizes, and added support for n-th level domains.
* **v1.0.2:** Added the *Smaller fonts* and *Droid Mode* mods
* **v1.0.1:** Bugfixes
* **v1.0:** First release

## License

```
Copyright 2013 Francesco Pontillo and Sebastiano Poggi

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
