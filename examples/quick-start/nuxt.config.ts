export default defineNuxtConfig({
  modules: [
    'nuxt-electron',
  ],
  electron: {
    renderer: {},
  },
  vite: {
    build: {
      // https://github.com/electron-vite/vite-plugin-electron-renderer/blob/v0.13.13/src/index.ts#L57
      cssCodeSplit: true,
    },
  },
})
