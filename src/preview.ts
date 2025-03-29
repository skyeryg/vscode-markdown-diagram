// @ts-expect-error markdown-it-diagram/dom
import { markdownItDiagramDom } from 'markdown-it-diagram/dom'
import mermaid from 'mermaid'

async function init() {
  mermaid.initialize({ startOnLoad: false })
  await mermaid.run()
  markdownItDiagramDom()
}

// 初始化调用
init()
