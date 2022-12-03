# nuxt-plugin-electron

Integrate Vite and Electron

[![NPM version](https://img.shields.io/npm/v/nuxt-plugin-electron.svg)](https://npmjs.org/package/nuxt-plugin-electron)
[![NPM Downloads](https://img.shields.io/npm/dm/nuxt-plugin-electron.svg)](https://npmjs.org/package/nuxt-plugin-electron)

![screenshort.png](https://github.com/caoxiemeihao/nuxt-plugin-electron/blob/main/screenshort.png?raw=true)

## Install

```sh
npm i nuxt-plugin-electron -D
```

## Examples

- [quick-start](https://github.com/caoxiemeihao/nuxt-plugin-electron/tree/main/examples/quick-start)

## Usage

nuxt.config.ts

```js
import { defineNuxtConfig } from 'nuxt/config'
import { withElectron } from 'nuxt-plugin-electron'

const nuxtConfig = defineNuxtConfig({})

export default withElectron({
  include: ['electron'],
})(nuxtConfig)
```
