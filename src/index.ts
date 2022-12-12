import { type AddressInfo } from 'net'
import { defineNuxtModule } from '@nuxt/kit'
import notbundle, { type Configuration } from 'notbundle'

export interface ElectronOptions extends Configuration {

}

export default defineNuxtModule<ElectronOptions>({
  setup(options, nuxt) {
    const production = process.env.NODE_ENV === 'production'

    options.output ??= 'dist-electron'
    options.watch ??= {}
    options.plugins ??= []

    if (production) {
      // Ensure that is works with the `file://` protocol.
      nuxt.options.app.baseURL ??= './'
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
          name: 'nuxt-electron:statup',
          ondone() {
            startup()
          },
        })

        notbundle(options)
      },
      // For build
      'build:done'() {
        if (production) {
          notbundle(options)
        }
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
  // @ts-ignore
  const electron = await import('electron')
  const electronPath = <any>(electron.default ?? electron)

  if (process.electronApp) {
    process.electronApp.removeAllListeners()
    process.electronApp.kill()
  }

  // Start Electron.app
  process.electronApp = spawn(electronPath, argv, { stdio: 'inherit' })
  // Exit command after Electron.app exits
  process.electronApp.once('exit', process.exit)
}
