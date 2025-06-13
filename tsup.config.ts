import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['cjs'],
    shims: false,
    dts: false,
    external: ['vscode'],
  },
  {
    entry: ['src/preview.ts'],
    format: ['iife'],
    shims: false,
    dts: false,
  },
])
