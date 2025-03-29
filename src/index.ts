import markdownItDiagram from 'markdown-it-diagram'
import { defineExtension, watch } from 'reactive-vscode'
import { commands, window } from 'vscode'
import { config } from './config'

function injectMarkdownDiagramConfig(md: any, options: { maxHeight: number, darkTheme?: string, lightTheme?: string }) {
  md.core.ruler.push('inject_markdown_diagram_config', (state: any) => {
    if (options.maxHeight && options.maxHeight > 220) {
      const token = new state.Token('html_block', '', 0)
      token.content = `
      <style>
          div[data-controll-panel-container] {
            max-height: ${options.maxHeight}px;
          }
      </style>
  `
      state.tokens.push(token)
    }
    const configToken = new state.Token('html_block', '', 0)
    configToken.content = `
      <span id="data-diagram-config" data-dark-theme="${options.darkTheme}" data-light-theme="${options.lightTheme}"></span>
  `
    state.tokens.push(configToken)
  })
}

const { activate, deactivate } = defineExtension(() => {
  watch(config, () => {
    console.warn('config change')
    commands.executeCommand('markdown.api.reloadPlugins')
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

        md.use(injectMarkdownDiagramConfig, { maxHeight: config.diagramMaxHeight, darkTheme: config.darkTheme, lightTheme: config.lightTheme })
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
