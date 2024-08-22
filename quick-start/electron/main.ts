import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'


let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (process.env.NODE_ENV === 'development') {
    win.loadURL(JSON.parse(process.env.__NUXT_DEV__!).proxy.url)
    win.webContents.openDevTools()
  } else {
    win.loadFile('.output/public/200.html')
  }
}

function initIpc() {
  ipcMain.handle('app-start-time', () => (new Date).toLocaleString())
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  initIpc()
  createWindow()
})
