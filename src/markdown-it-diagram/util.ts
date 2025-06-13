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