export default <import('nitropack/dist/runtime').NitroAppPlugin>(nitro => {
  // https://github.com/nuxt/nuxt/issues/14195#issuecomment-1397369535
  // https://github.com/nuxt/nuxt/blob/v3.2.3/packages/nuxt/src/core/runtime/nitro/renderer.ts#L300-L301
  nitro.hooks.hook('render:html', html => {
    // fix(🐞): `exports is not defined` in "use strict"
    const exportsShim = `<script id="shim-exports">var exports = typeof module !== 'undefined' ? module.exports : {};</script>`
    html.head.push(exportsShim)
  })
}) 
