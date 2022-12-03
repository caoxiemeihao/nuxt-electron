
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    VITE_DEV_SERVER_URL: string
  }

  interface Process {
    electronApp: import('child_process').ChildProcess
    _resolved_config: import('.').ResolvedConfig
  }
}

interface ImportMeta {
  /** shims Vite */
  env: Record<string, any>
}
