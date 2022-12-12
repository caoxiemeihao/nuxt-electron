# nuxt-electron

Integrate Vite and Electron

[![NPM version](https://img.shields.io/npm/v/nuxt-electron.svg)](https://npmjs.org/package/nuxt-electron)
[![NPM Downloads](https://img.shields.io/npm/dm/nuxt-electron.svg)](https://npmjs.org/package/nuxt-electron)

![screenshort.png](https://github.com/caoxiemeihao/nuxt-electron/blob/main/screenshort.png?raw=true)

## Install

```sh
npm i nuxt-electron -D
```

## Examples

- [quick-start](https://github.com/caoxiemeihao/nuxt-electron/tree/main/examples/quick-start)

## Usage

nuxt.config.ts

```js
import type { ElectronOptions } from 'nuxt-electron'

export default defineNuxtConfig({
  modules: [
    ['nuxt-electron', <ElectronOptions>{
      include: ['electron'],
    }],
  ],
})
```
