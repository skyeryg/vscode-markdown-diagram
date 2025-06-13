import type { MermaidConfig } from 'mermaid'
import mermaid from 'mermaid'
import { markdownItDiagramDom } from './markdown-it-diagram/dom'

function onceDocumentLoaded(f: () => void) {
  if (document.readyState === 'loading' || document.readyState as string === 'uninitialized') {
    document.addEventListener('DOMContentLoaded', f)
  }
  else {
    f()
  }
}

function getMarkdownDiagramConfig(): MermaidConfig {
  const configEl = document.getElementById('data-diagram-config')
  const darkTheme = configEl?.dataset.darkTheme ?? 'dark'
  const lightTheme = configEl?.dataset.lightTheme ?? 'default'
  const theme = document.body.classList.contains('vscode-dark') || document.body.classList.contains('vscode-high-contrast') ? darkTheme : lightTheme

  return {
    startOnLoad: false,
    theme: theme as MermaidConfig['theme'],
  }
}
async function initMermaid() {
  const mermaidConfig = getMarkdownDiagramConfig()
  mermaid.initialize(mermaidConfig)
  await mermaid.run()
  markdownItDiagramDom()
}

onceDocumentLoaded(async () => {
  // 初始化调用
  await initMermaid()
})

window.addEventListener('vscode.markdown.updateContent', initMermaid)
