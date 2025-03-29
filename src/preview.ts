// @ts-expect-error markdown-it-diagram/dom
import { markdownItDiagramDom } from 'markdown-it-diagram/dom'
import mermaid from 'mermaid'

async function init() {
  console.warn('init')

  mermaid.initialize({ startOnLoad: false })
  await mermaid.run()
  markdownItDiagramDom(undefined)
}

// 初始化调用
init()
