import { type AddressInfo } from 'net'
import { defineNuxtModule } from '@nuxt/kit'
import {
  type Configuration,
  build,
  watch,
  startup,
} from 'vite-electron-plugin'

export interface ElectronOptions extends Configuration { }

export default defineNuxtModule<ElectronOptions>({
  setup(options, nuxt) {
    const isProduction = process.env.NODE_ENV === 'production'

    options.outDir ??= 'dist-electron'
    options.watch ??= {}
    options.plugins ??= []

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

    nuxt.hooks.addHooks({
      // For development
      listen(server, listener) {
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

        watch(options)
      },
      // For build
      'build:done'() {
        if (isProduction) build(options)
      }
    })
  }
}) as any
