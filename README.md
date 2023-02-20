<p align="center">
  <img width="170" src="https://github.com/caoxiemeihao/nuxt-electron/raw/main/logo.svg?raw=true">
</p>

<div align="center">
  <h1>Nuxt Electron</h1>
</div>
<p align="center">
  <code>Integrate Nuxt and Electron</code>
</p>
<p align="center">
  <a href="https://npmjs.org/package/nuxt-electron">
    <img src="https://img.shields.io/npm/v/nuxt-electron.svg?colorA=18181B&colorB=28CF8D">
  </a>
  <a href="https://npmjs.org/package/nuxt-electron">
    <img src="https://img.shields.io/npm/dm/nuxt-electron.svg?colorA=18181B&colorB=28CF8D">
  </a>
  <img src="https://camo.githubusercontent.com/1355d11db24d82f2b23bbe4957178a05c7d5ca0948ddfc9eec38f5a6864fe4e5/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f6e7578742f6e7578742e7376673f7374796c653d666c617426636f6c6f72413d31383138314226636f6c6f72423d323843463844">
</p>

<br/>

## Features

- 🚀 High-performance <sub><sup>(Not Bundle, based on esbuild)</sup></sub>
- 📦 Out of the box
- 🔥 Hot restart

## Quick Setup

1. Add the following dependency to your project

```sh
# Using pnpm
pnpm add -D nuxt-electron vite-electron-plugin electron electron-builder

# Using yarn
yarn add --dev nuxt-electron vite-electron-plugin electron electron-builder

# Using npm
npm install --save-dev nuxt-electron vite-electron-plugin electron electron-builder
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

> This is based on the `vite-electron-plugin`, see the **[Documents](https://github.com/electron-vite/vite-electron-plugin#configuration)** for more detailed options

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
