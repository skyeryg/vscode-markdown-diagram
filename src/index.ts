import markdownItDiagram from 'markdown-it-diagram'
import { defineExtension } from 'reactive-vscode'
import { window } from 'vscode'

const { activate, deactivate } = defineExtension(() => {
  console.warn('Markdown Diagram插件已激活')
  // 注册Markdown预览贡献点
  return {
    extendMarkdownIt(md: any) {
      try {
        // 配置图表插件支持mermaid/plantuml/dot/ditaa
        console.warn('开始初始化图表插件...')
        const diagramPlugin = markdownItDiagram
        console.warn('获取到图表插件:', diagramPlugin)
        md.use(diagramPlugin, {
          showController: true, // 显示控制工具栏
          imageFormat: 'svg', // 统一图片格式为svg
        })

        console.warn('图表插件配置:', {
          imageFormat: 'svg',
        })
        console.warn('图表插件初始化成功')
      }
      catch (error) {
        console.error('图表插件初始化失败:', error)
        const msg = error instanceof Error ? error.message : String(error)
        window.showErrorMessage(`图表插件初始化失败: ${msg}`)
      }
      return md
    },
  }
})

export { activate, deactivate }
