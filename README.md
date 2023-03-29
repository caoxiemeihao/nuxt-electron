<p align="center">
  <img width="170" src="https://github.com/caoxiemeihao/nuxt-electron/raw/main/logo.svg?raw=true">
</p>

# Nuxt Electron

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> Integrate Nuxt and Electron

## Features

- 🚀 High-performance <sub><sup>(Not Bundle, based on esbuild)</sup></sub>
- 📦 Out of the box
- 🔥 Hot restart

## Quick Setup

1. Add the following dependency to your project

```sh
# Using pnpm
pnpm add -D nuxt-electron vite-electron-plugin vite-plugin-electron-renderer electron electron-builder

# Using yarn
yarn add --dev nuxt-electron vite-electron-plugin vite-plugin-electron-renderer electron electron-builder

# Using npm
npm install --save-dev nuxt-electron vite-electron-plugin vite-plugin-electron-renderer electron electron-builder
```

2. Add `nuxt-electron` to the `modules` section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-electron',
  ],
})
```

3. Create the `electron/main.ts` file and type the following code

```ts
import { app, BrowserWindow } from 'electron'

app.whenReady().then(() => {
  new BrowserWindow().loadURL(process.env.VITE_DEV_SERVER_URL)
})
```

4. Add the `main` entry to `package.json`

```diff
{
+ "main": "dist-electron/main.js"
}
```

That's it! You can now use Electron in your Nuxt app ✨

## Electron Options

Here is the default `electron` options

```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-electron',
  ],
  electron: {
    include: ['electron'],
    outDir: 'dist-electron',
  },
})
```

Full types definition

> This is based on the `vite-electron-plugin`, see the **[Documents](https://github.com/electron-vite/vite-electron-plugin#configuration)** for more detailed options

```ts
import type { Configuration } from 'vite-electron-plugin'

export interface ElectronOptions extends Partial<Configuration> {
  /**
   * @see https://github.com/electron-vite/vite-plugin-electron-renderer
   */
  renderer?: Parameters<typeof import('vite-plugin-electron-renderer').default>[0]
  /**
   * nuxt-electron will modify some options by default
   * 
   * ```js
   * export default defineNuxtConfig({
   *   ssr: false,
   *   app: {
   *     baseURL: './',
   *     buildAssetsDir: '/',
   *   },
   *   runtimeConfig: {
   *     app: {
   *       baseURL: './',
   *       buildAssetsDir: '/',
   *     },
   *   },
   * })
   * ```
   */
  disableDefaultOptions?: boolean
}
```

## Recommend Structure

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

## [Examples](https://github.com/caoxiemeihao/nuxt-electron/tree/main/examples)

- [quick-start](https://github.com/caoxiemeihao/nuxt-electron/tree/main/examples/quick-start)
- [nuxt-electron-trpc-prisma](https://github.com/gurvancampion/nuxt-electron-trpc-prisma)

## Notes
By default, we force the App to run in SPA mode since we don't need SSR for desktop apps

If you want to fully customize the default behavior, you can disable it by `disableDefaultOptions`

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-electron/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-electron

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-electron.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-electron

[license-src]: https://img.shields.io/npm/l/nuxt-electron.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-electron
