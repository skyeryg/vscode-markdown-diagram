import markdownItDiagram from 'markdown-it-diagram'
import { defineExtension, watchEffect } from 'reactive-vscode'
import { commands, window } from 'vscode'
import { config } from './config'

function injectDiagramMaxHeight(md: any, options: { height: number }) {
  const injectScript = `
      <style>
          div[data-controll-panel-container] {
            max-height: ${options.height}px;
          }
      </style>
  `

  md.core.ruler.push('inject_diagram_max_height', (state: any) => {
    const token = new state.Token('html_block', '', 0)
    token.content = injectScript
    state.tokens.push(token)
  })
}

const { activate, deactivate } = defineExtension(() => {
  watchEffect(() => {
    const diagramMaxHeight = config.diagramMaxHeight

    if (diagramMaxHeight) {
      commands.executeCommand('markdown.api.reloadPlugins')
    }
  })
  // 注册Markdown预览贡献点
  return {
    extendMarkdownIt(md: any) {
      try {
        // 配置图表插件支持mermaid/plantuml/dot/ditaa
        const diagramPlugin = markdownItDiagram
        md.use(diagramPlugin, {
          showController: true, // 显示控制工具栏
          imageFormat: 'svg', // 统一图片格式为svg
        })

        if (config.diagramMaxHeight && config.diagramMaxHeight > 220) {
          md.use(injectDiagramMaxHeight, { height: config.diagramMaxHeight })
        }
      }
      catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        window.showErrorMessage(`图表插件初始化失败: ${msg}`)
      }
      return md
    },
  }
})

export { activate, deactivate }
