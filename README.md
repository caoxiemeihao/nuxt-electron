# nuxt-electron

Integrate Nuxt and Electron

[![NPM version](https://img.shields.io/npm/v/nuxt-electron.svg)](https://npmjs.org/package/nuxt-electron)
[![NPM Downloads](https://img.shields.io/npm/dm/nuxt-electron.svg)](https://npmjs.org/package/nuxt-electron)

![screenshort.png](https://github.com/caoxiemeihao/nuxt-electron/blob/main/screenshot.png?raw=true)

## Install

```sh
npm i nuxt-electron electron electron-builder -D
```

## Examples

- [quick-start](https://github.com/caoxiemeihao/nuxt-electron/tree/main/examples/quick-start)
- [nuxt-electron-trpc-prisma](https://github.com/gurvancampion/nuxt-electron-trpc-prisma)

## Usage

nuxt.config.ts

```ts
import type { ElectronOptions } from 'nuxt-electron'

export default defineNuxtConfig({
  modules: [
    ['nuxt-electron', <ElectronOptions>{
      include: ['electron'],
    }],
  ],
})
```

## Notes
By default, we force the App to run in SPA mode since we don't need SSR for desktop apps.
