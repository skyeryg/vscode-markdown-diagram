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

async function copyImage(image: HTMLImageElement, retries = 5) {
  if (!document.hasFocus() && retries > 0) {
    // copyImage is called at the same time as webview.reveal, which means this function is running whilst the webview is gaining focus.
    // Since navigator.clipboard.write requires the document to be focused, we need to wait for focus.
    // We cannot use a listener, as there is a high chance the focus is gained during the setup of the listener resulting in us missing it.
    setTimeout(() => { copyImage(image, retries - 1) }, 20)
    return
  }

  try {
    if (!image.src.startsWith('http://127.0.0.1')) {
      const response = await fetch(image.src)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      // 2. 转换为 Blob
      const blob = await response.blob()
      // 3. 使用 Clipboard API 写入剪贴板
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ])
    }
    else {
      await navigator.clipboard.write([new ClipboardItem({
        'image/png': new Promise((resolve) => {
          const canvas = document.createElement('canvas')
          if (canvas !== null) {
            canvas.width = image.naturalWidth
            canvas.height = image.naturalHeight
            const context = canvas.getContext('2d')
            context?.drawImage(image, 0, 0)
          }
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob)
            }
            canvas.remove()
          }, 'image/png')
        }),
      })])
    }
  }
  catch (e) {
    console.error(e)
    const selection = window.getSelection()
    if (!selection) {
      await navigator.clipboard.writeText(image.getAttribute('data-src') ?? image.src)
      return
    }
    selection.removeAllRanges()
    const range = document.createRange()
    range.selectNode(image)
    selection.addRange(range)
    document.execCommand('copy')
    selection.removeAllRanges()
  }
}

function createElementFromHTML(htmlString: string) {
  const div = document.createElement('div')
  div.innerHTML = htmlString.trim()
  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild
}

// 下载

const svgStr = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" height="16" viewbox="0 0 16 16" version="1.1" width="16" class="fg-success fg-none octicon-check"> <path fill-rule="evenodd" fill="currentColor" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"> </path> </svg>'

const checkElement = createElementFromHTML(svgStr)

onceDocumentLoaded(async () => {
  // 初始化调用
  await initMermaid()
  // 监听所有下载按钮的点击事件
  document.querySelectorAll('[data-control-btn="download"]').forEach((button) => {
    if (checkElement) {
      button.appendChild(checkElement.cloneNode(true))
    }

    button.addEventListener('click', async (event: any) => {
      // 1. 找到最近的父容器 [data-controll-panel-container]
      const container = event.target.closest('[data-controll-panel-container]')

      // 2. 从容器中获取 img 元素
      const svgElement = container.querySelector('pre.diagram-m>svg')
      const imgElement = container.querySelector('div.diagram-m>img')

      if (svgElement) {
        // 3. 序列化 SVG
        const svgString = new XMLSerializer().serializeToString(svgElement)
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(svgString)
          const copyIcon = button.querySelector('svg')
          const checkIcon = button.querySelector('.octicon-check')
          copyIcon?.classList.add('fg-none')
          checkIcon?.classList.remove('fg-none')
          // button.appendChild(checkIcon)
          setTimeout(() => {
            copyIcon?.classList.remove('fg-none')
            checkIcon?.classList.add('fg-none')
            // button.removeChild(checkIcon)
          }, 1000)
        }
        else {
          console.warn('The Current Environment Does Not Support Clipboard API')
        }
      }
      else if (imgElement) {
        await copyImage(imgElement)
        const copyIcon = button.querySelector('svg')
        const checkIcon = button.querySelector('.octicon-check')
        copyIcon?.classList.add('fg-none')
        checkIcon?.classList.remove('fg-none')
        // button.appendChild(checkIcon)
        // setTimeout(() => {
        //   copyIcon?.classList.remove('fg-none')
        //   checkIcon?.classList.add('fg-none')
        //   // button.removeChild(checkIcon)
        // }, 1000)
      }
    })
  })
})

window.addEventListener('vscode.markdown.updateContent', initMermaid)
