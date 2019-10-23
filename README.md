# In Viewport

[![Build Status](https://www.travis-ci.com/xg4/in-viewport.svg?branch=master)](https://www.travis-ci.com/xg4/in-viewport)
[![npm](https://img.shields.io/npm/v/@xg4/in-viewport.svg)](https://www.npmjs.com/package/@xg4/in-viewport)
[![GitHub](https://img.shields.io/github/license/xg4/in-viewport.svg)](https://github.com/xg4/in-viewport/blob/master/LICENSE)

> Get callback when a DOM element enters or leaves the viewport.

## Installation

### Install with npm or Yarn

```bash
# npm
$ npm install @xg4/in-viewport --save
```

```bash
# yarn
$ yarn add @xg4/in-viewport
```

## Usage

```js
import InViewport from '@xg4/in-viewport'

const iv = new InViewport()
// or
const options = {} // IntersectionObserverInit options
const iv = new InViewport(options)

// entry: IntersectionObserverEntry
// observer: IntersectionObserver
function onEnter(entry, observer) {
  console.log('el enter the viewport')
}

function onLeave(entry, observer) {
  console.log('el leave the viewport')
}

// on
iv.on(el, onEnter)
iv.on(el, onEnter, onLeave)
iv.on(el, {
  onEnter,
  onLeave
})

// off
iv.off(el)

// once
iv.once(el, onEnter)
iv.once(el, onEnter, onLeave)
iv.once(el, {
  onEnter,
  onLeave,
  once: true
})

// also use it, like this
iv.on(el)
  .on(el2)
  .once(el3)
  .off(el4)
```

## Example

> [https://xg4.github.io/in-viewport/](https://xg4.github.io/in-viewport/)

## Contributing

Welcome

- Fork it

- Submit pull request

## Browsers support

Modern browsers and IE10.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE10, Edge                                                                                                                                                                                                      | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           |

## LICENSE

MIT
