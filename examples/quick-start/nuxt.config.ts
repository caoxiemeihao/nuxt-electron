import type { ElectronOptions } from 'nuxt-electron'

export default defineNuxtConfig({
  modules: [
    ['nuxt-electron', <ElectronOptions>{}],
  ],
})
