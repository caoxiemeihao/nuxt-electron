import path from 'path'
import { fileURLToPath } from 'url'
import { type AddressInfo } from 'net'
import { defineNuxtModule } from '@nuxt/kit'
import {
  type Configuration,
  build,
  watch,
  startup,
} from 'vite-electron-plugin'

const cjs__dirname = typeof __dirname === 'undefined'
  ? path.dirname(fileURLToPath(import.meta.url))
  : __dirname

// Fix tsc build error
import { NuxtModule } from '@nuxt/schema'

export interface ElectronOptions extends Partial<Configuration> {
  /**
   * @see https://github.com/electron-vite/vite-plugin-electron-renderer
   */
  renderer?: Parameters<typeof import('vite-plugin-electron-renderer').default>[0],
}

export default defineNuxtModule<ElectronOptions>({
  meta: {
    name: 'nuxt-electron',
    configKey: 'electron',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    include: ['electron'],
    outDir: 'dist-electron',
  },
  async setup(options, nuxt) {
    const isProduction = process.env.NODE_ENV === 'production'

    // Force to SPA mode always since we don't need SSR for a desktop app.
    nuxt.options.ssr = false

    if (isProduction) {
      // Fix path to make it works with Electron protocol `file://`
      nuxt.options.app.baseURL ??= './'
      if (nuxt.options.app.baseURL.startsWith('/')) {
        nuxt.options.app.baseURL = '.' + nuxt.options.app.baseURL
      }
      nuxt.options.runtimeConfig.app.baseURL ??= './'
      if (nuxt.options.runtimeConfig.app.baseURL.startsWith('/')) {
        nuxt.options.runtimeConfig.app.baseURL = '.' + nuxt.options.runtimeConfig.app.baseURL
      }
      nuxt.options.router.options.hashMode ??= true // Avoid 404 errors
    }

    // Use Node.js in Renderer process
    if (options.renderer) {
      // For Vite
      nuxt.options.vite.plugins ??= []
      nuxt.options.vite.plugins.push((await import('vite-plugin-electron-renderer')).default(options.renderer))

      // TODO: For Webpack

      nuxt.options.nitro.plugins ??= []
      nuxt.options.nitro.plugins.push(path.join(cjs__dirname, 'cjs-shim')) // #14
    }

    nuxt.hooks.addHooks({
      // For development
      listen(server, listener) {
        options.watch ??= {}
        options.plugins ??= []

        const addressInfo = server.address() as AddressInfo
        Object.assign(process.env, {
          // This is required, and it is used in Electron-Main.
          VITE_DEV_SERVER_URL: `http://localhost:${addressInfo.port}`,
        })

        options.plugins!.push({
          name: 'nuxt-electron:startup',
          ondone() {
            startup()
          },
        })

        watch(options as Configuration)
      },
      // For build
      'build:done'() {
        if (isProduction) build(options as Configuration)
      }
    })
  }
})
