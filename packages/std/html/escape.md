---
title: escpe
collection: html
tags:
  - html
  - escape
---

Escape HTML characters

`escape(source)`

- source - the string containing unescaped HTML characters

```js
import { escape } from "@nore/std/html";

escape("<🦄/> & <🐐/>");
// => "&lt;🦄/&gt; &amp; &lt;🐐/&gt;"
```
