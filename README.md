<p align="center">
  <img width="170" src="https://github.com/caoxiemeihao/nuxt-electron/raw/main/logo.svg?raw=true">
</p>

# Nuxt Electron

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[<img src="https://api.gitsponsors.com/api/badge/img?id=564125759" height="20">](https://api.gitsponsors.com/api/badge/link?p=Mz9rvcT08fgHJXo5KS+hQ96a91PyIlbKcr11rzON3xux6OXDlmkpEtfDd/XpYlsw)

> Integrate Nuxt and Electron

## Features

- 📦 Out of the box
- 🔥 Hot restart <sub><sup>(Main process)</sup></sub>
- 🚀 Hot reload <sub><sup>(Preload script)</sup></sub>

## Quick Setup

1. Add `electron` module to project

```sh
npx nuxi module add electron
```

2. Add the following dependency to your project

```sh
# Using pnpm
pnpm add -D vite-plugin-electron vite-plugin-electron-renderer electron electron-builder

# Using yarn
yarn add --dev vite-plugin-electron vite-plugin-electron-renderer electron electron-builder

# Using npm
npm install --save-dev vite-plugin-electron vite-plugin-electron-renderer electron electron-builder
```

3. Add `electron` and related config to `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  ...
  electron: {
    build: [
      {
        // Main-Process entry file of the Electron App.
        entry: 'electron/main.ts',
      },
    ],
  },
  ssr: false, // #43
  ...
})
```

4. Create the `electron/main.ts` file and type the following code

```ts
import { app, BrowserWindow } from 'electron'

app.whenReady().then(() => {
  new BrowserWindow().loadURL(process.env.VITE_DEV_SERVER_URL)
})
```

5. Add the `main` entry to `package.json`

```diff
{
+ "main": "dist-electron/main.js"
}
```

That's it! You can now use Electron in your Nuxt app ✨

## Electron Options

> This is based on the `vite-plugin-electron`, see the **[Documents](https://github.com/electron-vite/vite-plugin-electron)** for more detailed options

```ts
export interface ElectronOptions {
  /**
   * `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
   * 
   * @example
   * 
   * ```js
   * export default defineNuxtConfig({
   *   modules: ['nuxt-electron'],
   *   electron: {
   *     build: [
   *       {
   *         // Main-Process entry file of the Electron App.
   *         entry: 'electron/main.ts',
   *       },
   *     ],
   *   },
   * })
   * ```
   */
  build: import('vite-plugin-electron').ElectronOptions[],
  /**
   * @see https://github.com/electron-vite/vite-plugin-electron-renderer
   */
  renderer?: Parameters<typeof import('vite-plugin-electron-renderer').default>[0]
  /**
   * nuxt-electron will modify some options by default
   * 
   * @defaultValue
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
   *   nitro: {
   *     runtimeConfig: {
   *       app: {
   *         baseURL: './,
   *       }
  *      }
   *   },
      router: {
        options: {
          hashMode: true,
        }
      }
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

## Examples

- [quick-start](https://github.com/caoxiemeihao/nuxt-electron/tree/main/quick-start)
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

## TODO

- [ ] write test
