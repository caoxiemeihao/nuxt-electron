# nuxt-electron

Integrate Nuxt and Electron

[![NPM version](https://img.shields.io/npm/v/nuxt-electron.svg)](https://npmjs.org/package/nuxt-electron)
[![NPM Downloads](https://img.shields.io/npm/dm/nuxt-electron.svg)](https://npmjs.org/package/nuxt-electron)

![screenshort.png](https://github.com/caoxiemeihao/nuxt-electron/blob/main/screenshot.png?raw=true)

## Install

```sh
npm i -D nuxt-electron vite-electron-plugin electron electron-builder
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

**This is based on the `vite-electron-plugin`, see the **[Documents](https://github.com/electron-vite/vite-electron-plugin#configuration)** for more detailed options.**

## Recommend structure

Let's use the official [nuxt-starter-v3](https://codeload.github.com/nuxt/starter/tar.gz/refs/heads/v3) template as an example.

```diff
+ ├─┬ electron
+ │ └── main.ts
  ├─┬ public
  │ └── favicon.ico
  ├── .gitignore
  ├── .npmrc
  ├── index.html
  ├── app.vue
  ├── nuxt.config.ts
  ├── package.json
  ├── README.md
  └── tsconfig.json
```

## Notes
By default, we force the App to run in SPA mode since we don't need SSR for desktop apps.
