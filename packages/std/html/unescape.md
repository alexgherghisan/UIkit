---
title: escpe
collection: html
tags:
  - html
  - unescape
---

Unescape HTML characters.

`unescape(source)`

- source - the string containing escaped HTML characters

```js
import { unescape } from "@nore/std/html";

unescape("&lt;🦄/&gt; &amp; &lt;🐐/&gt;");
// => "<🦄/> & <🐐/>"
```
