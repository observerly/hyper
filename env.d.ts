/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIBER_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
