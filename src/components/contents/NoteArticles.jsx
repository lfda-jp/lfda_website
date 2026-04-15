import { useNoteArticles } from '../../hooks/useNoteArticles'
import styles from './NoteArticles.module.css'

function formatDate(pubDate) {
  if (!pubDate) return ''
  const d = new Date(pubDate)
  return isNaN(d) ? '' : d.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
}

function SkeletonCard() {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      <div className={styles.skeletonThumb} />
      <div className={styles.skeletonLine} style={{ width: '40%', marginTop: '0.75rem' }} />
      <div className={styles.skeletonLine} style={{ width: '90%', marginTop: '0.5rem' }} />
      <div className={styles.skeletonLine} style={{ width: '70%', marginTop: '0.4rem' }} />
    </div>
  )
}

export default function NoteArticles() {
  const { articles, loading, error } = useNoteArticles()

  return (
    <div className={styles.section}>
      <h3 className={styles.label}>note</h3>

      {loading && (
        <div className={styles.grid}>
          {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

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

      {!loading && !error && (
        <div className={styles.grid}>
          {articles.map((article) => (
            <a
              key={article.link}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <div className={styles.thumb}>
                {article.thumbnail ? (
                  <img src={article.thumbnail} alt="" loading="lazy" />
                ) : (
                  <div className={styles.thumbPlaceholder} />
                )}
              </div>
              <p className={styles.date}>{formatDate(article.pubDate)}</p>
              <p className={styles.title}>{article.title}</p>
              <span className={styles.readMore}>noteで読む →</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
