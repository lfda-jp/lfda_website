const RSS_URL = 'https://note.com/genial_iris250/rss'
const PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(RSS_URL)}`

/**
 * note RSS を取得してパースした記事配列を返す
 * @returns {Promise<Array<{title: string, link: string, pubDate: string, thumbnail: string|null}>>}
 */
export async function fetchNoteArticles() {
  const res = await fetch(PROXY_URL)
  if (!res.ok) throw new Error('RSS fetch failed')
  const { contents } = await res.json()
  const doc = new DOMParser().parseFromString(contents, 'text/xml')
  const items = [...doc.querySelectorAll('item')].slice(0, 5)
  return items.map((item) => ({
    title: item.querySelector('title')?.textContent ?? '',
    link: item.querySelector('link')?.textContent ?? '',
    pubDate: item.querySelector('pubDate')?.textContent ?? '',
    thumbnail: extractThumbnail(item.querySelector('description')?.textContent ?? ''),
  }))
}

function extractThumbnail(html) {
  const match = html.match(/<img[^>]+src="([^"]+)"/)
  return match ? match[1] : null
}
