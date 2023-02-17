<p align="center">
  <img width="170" src="https://github.com/caoxiemeihao/nuxt-electron/raw/main/logo.svg?raw=true">
</p>

<div align="center">
  <h1>nuxt-electron</h1>
</div>
<p align="center">Integrate Nuxt and Electron</p>
<p align="center">
  <a href="https://npmjs.org/package/nuxt-electron">
    <img src="https://img.shields.io/npm/v/nuxt-electron.svg">
  </a>
  <a href="https://npmjs.org/package/nuxt-electron">
    <img src="https://img.shields.io/npm/dm/nuxt-electron.svg">
  </a>
</p>

<br/>

## Features

- 🚀 High-performance (Not Bundle, based on esbuild)
- 📦 Out of the box
- 🔥 Hot restart

## Quick Setup

1. Add the following dependency to your project

```sh
npm i -D nuxt-electron vite-electron-plugin electron electron-builder
```

2. Add `nuxt-electron` to the modules section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-electron',
  ],
})
```

That's it! You can now use Electron in your Nuxt app ✨

## Recommend structure

Let's use the official [nuxt-starter-v3](https://codeload.github.com/nuxt/starter/tar.gz/refs/heads/v3) template as an example

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

## ElectronOptions

> This is based on the `vite-electron-plugin`, see the **[Documents](https://github.com/electron-vite/vite-electron-plugin#configuration)** for more detailed options

Here is the default `nuxt-electron` options

```ts
import type { ElectronOptions } from 'nuxt-electron'

export default defineNuxtConfig({
  modules: [
    'nuxt-electron'
  ],
  electron: {
    include: ['electron'],
    outDir: 'dist-electron',
  }
})
```

## Examples

- [quick-start](https://github.com/caoxiemeihao/nuxt-electron/tree/main/examples/quick-start)
- [nuxt-electron-trpc-prisma](https://github.com/gurvancampion/nuxt-electron-trpc-prisma)

## Notes
By default, we force the App to run in SPA mode since we don't need SSR for desktop apps
