
# [![xterm.js logo](logo-full.png)](https://xtermjs.org)

![Github Actions](http://aliyunfc.tarocch1.com/github-actions-badge/yinshuxun/xterm-addon-search-bar/gh-pages)
[![NPM](https://img.shields.io/npm/v/angular-translate.svg)](https://www.npmjs.com/package/angular-translate)
![License](https://img.shields.io/npm/l/angular-translate.svg)



## xterm-addon-search-bar

An addon for [xterm.js](https://github.com/xtermjs/xterm.js) that enables show search bar in terminal. This addon requires xterm.js & xterm-addon-search v4+.

### Install

```bash
npm install --save xterm-addon-search-bar
```

### Usage

```ts
import { Terminal } from 'xterm';
import { SearchAddon } from 'xterm-addon-search';
import { SearchAddonBar } from 'xterm-addon-search-bar';

const terminal = new Terminal();
const searchAddon = new SearchAddon();
const searchAddonBar = new SearchAddonBar({searchAddon});
terminal.loadAddon(searchAddon);
terminal.loadAddon(searchAddonBar);
// Can be uesd in a action as click
searchbarAddon.show();
```

See the full [API](https://github.com/yinshuxun/xterm-addon-search-bar/typings/index.d.ts) for more advanced usage.
