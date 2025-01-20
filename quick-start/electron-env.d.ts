/// <reference types="vite-plugin-electron/electron-env" />

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer: import('electron').IpcRenderer
}
