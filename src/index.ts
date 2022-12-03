import type { NuxtConfig } from 'nuxt/config'
import notbundle, { type Configuration } from 'notbundle'
import { type AddressInfo } from 'net'

export interface ElectronConfig extends Configuration {

}

export function withElectron(config: ElectronConfig): (nuxtConfig: NuxtConfig) => NuxtConfig {
  config.output ??= 'dist-electron'
  config.watch ??= {}
  config.plugins ??= []

  return nuxtConfig => {
    nuxtConfig.hooks ??= {}

    // For development
    const listen = nuxtConfig.hooks.listen
    nuxtConfig.hooks.listen = (server, listener) => {
      listen?.(server, listener)

      const addressInfo = server.address() as AddressInfo
      Object.assign(process.env, {
        // This is required, and it is used in Electron-Main.
        VITE_DEV_SERVER_URL: `http://localhost:${addressInfo.port}`,
      })

      config.plugins!.push({
        name: 'nuxt-plugin-electron:statup',
        ondone() {
          startup()
        },
      })

      notbundle(config)
    }

    // For build
    const build_done = nuxtConfig.hooks['build:done']
    nuxtConfig.hooks['build:done'] = () => {
      build_done?.()

      if (process.env.NODE_ENV === 'production') {
        notbundle(config)
      }
    }

    return nuxtConfig
  }
}

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
