import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['cjs'],
    shims: false,
    dts: false,
    external: ['vscode'],
    noExternal: ['markdown-it-diagram'],
  },
  {
    entry: ['src/preview.ts'],
    format: ['iife'],
    shims: false,
    dts: false,
  },
])
