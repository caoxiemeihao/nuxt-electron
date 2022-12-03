import { defineNuxtConfig } from 'nuxt/config'
import { withElectron } from 'nuxt-plugin-electron'

const nuxtConfig = defineNuxtConfig({})

export default withElectron({
  include: ['electron'],
})(nuxtConfig)
