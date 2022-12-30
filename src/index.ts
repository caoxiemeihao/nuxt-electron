import { type AddressInfo } from 'net'
import { defineNuxtModule } from '@nuxt/kit'
import notbundle, { type Configuration } from 'notbundle'

export interface ElectronOptions extends Configuration { }

export default defineNuxtModule<ElectronOptions>({
  setup(options, nuxt) {
    const isProduction = process.env.NODE_ENV === 'production'

    options.output ??= 'dist-electron'
    options.watch ??= {}
    options.plugins ??= []

    // Force to SPA mode always since we don't need SSR for a desktop app.
    nuxt.options.ssr = false

    if (isProduction) {
        // Fix path to make it works with Electron protocol `file://`
        nuxt.options.app.baseURL = './'
        nuxt.options.runtimeConfig.app.baseURL = './'
        nuxt.options.router.options.hashMode = true // Avoid 404 errors
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

        notbundle(options)
      },
      // For build
      'build:done'() {
        if (isProduction) notbundle(options)
      }
    })
  }
}) as any

/**
 * Electron App startup function.  
 * It will mount the Electron App child-process to `process.electronApp`.  
 * @param argv default value `['.', '--no-sandbox']`
 */
export async function startup(argv = ['.', '--no-sandbox']) {
  const { spawn } = await import('child_process')
  const electron = await import('electron')
  const electronPath = (electron.default ?? electron)

  if (!electron) throw new Error('Electron is required, please install it as devDependencies.')

  if (process.electronApp) {
    process.electronApp.removeAllListeners()
    process.electronApp.kill()
  }

  // Start Electron.app
  process.electronApp = spawn(`${electronPath}`, argv, { stdio: 'inherit' })
  // Exit command after Electron.app exits
  process.electronApp.once('exit', process.exit)
}
