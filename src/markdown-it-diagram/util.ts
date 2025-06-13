export function escapeHTML(html: string) {
  return html.replace(/[&<>"']/g, function(match) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[match] || '';
  });
}

export function unescapeHTML(escaped: string) {
  const doc = new DOMParser().parseFromString(escaped, 'text/html');
  return doc.documentElement.textContent || '';
}

export async function copyImage(image: HTMLImageElement, retries = 5) {
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