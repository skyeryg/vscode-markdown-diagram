import type { MermaidConfig } from 'mermaid'
// @ts-expect-error markdown-it-diagram/dom
import { markdownItDiagramDom } from 'markdown-it-diagram/dom'
import mermaid from 'mermaid'

function getMarkdownDiagramConfig(): MermaidConfig {
  const configEl = document.getElementById('data-diagram-config')
  const darkTheme = configEl?.dataset.darkTheme ?? 'dark'
  const lightTheme = configEl?.dataset.lightTheme ?? 'default'
  const theme = document.body.classList.contains('vscode-dark') || document.body.classList.contains('vscode-high-contrast') ? darkTheme : lightTheme
  console.warn('mermaidConfig el', configEl)

  return {
    startOnLoad: false,
    theme: theme as MermaidConfig['theme'],
  }
}
async function init() {
  const mermaidConfig = getMarkdownDiagramConfig()
  console.warn('mermaidConfig', mermaidConfig)
  mermaid.initialize(mermaidConfig)
  await mermaid.run()
  markdownItDiagramDom()
}

// 初始化调用
init()
