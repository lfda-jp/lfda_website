import { useRef } from 'react'
import { useNoteArticles } from '../../hooks/useNoteArticles'
import styles from './NoteArticles.module.css'

function formatDate(pubDate) {
  if (!pubDate) return ''
  const d = new Date(pubDate)
  return isNaN(d) ? '' : d.toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' })
}

function SkeletonCard() {
  return <div className={styles.skeleton} aria-hidden="true" />
}

function ArticleCard({ article }) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      aria-label={article.title}
    >
      <div className={styles.thumb}>
        {article.thumbnail ? (
          <img src={article.thumbnail} alt="" loading="lazy" className={styles.thumbImg} />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
      <div className={styles.overlay}>
        {article.pubDate && <p className={styles.date}>{formatDate(article.pubDate)}</p>}
        <p className={styles.title}>{article.title}</p>
        <span className={styles.readMore}>noteで読む →</span>
      </div>
    </a>
  )
}

export default function NoteArticles() {
  const { articles, loading, error } = useNoteArticles()
  const trackRef = useRef(null)

  const scroll = (dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('[class]')
    const cardW = card ? card.offsetWidth + 12 : 320
    track.scrollBy({ left: dir * cardW, behavior: 'smooth' })
  }

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>note</p>
          <h3 className={styles.heading}>Articles</h3>
        </div>
        <div className={styles.arrows}>
          <button className={styles.arrow} onClick={() => scroll(-1)} aria-label="前へ">←</button>
          <button className={styles.arrow} onClick={() => scroll(1)} aria-label="次へ">→</button>
        </div>
      </div>

      <div className={styles.track} ref={trackRef}>
        {loading && [...Array(4)].map((_, i) => <SkeletonCard key={i} />)}

        {error && (
          <div className={styles.fallback}>
            <a
              href="https://note.com/genial_iris250"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.fallbackLink}
            >
              noteで最新記事を読む →
            </a>
          </div>
        )}

        {!loading && !error && articles.map((article) => (
          <ArticleCard key={article.link} article={article} />
        ))}
      </div>
    </div>
  )
}
