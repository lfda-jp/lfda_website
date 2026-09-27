import { reels } from '../../data/reels'
import styles from './Reels.module.css'

const BASE = import.meta.env.BASE_URL

const APPLE_PODCASTS =
  'https://podcasts.apple.com/jp/podcast/%E5%B8%B0%E3%82%8A%E9%81%93%E3%81%AEtech-talk-%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB%E3%82%A6%E3%82%A7%E3%83%AB%E3%83%93%E3%83%BC%E3%82%A4%E3%83%B3%E3%82%B0%E5%AD%A6%E7%94%9F%E3%83%A1%E3%83%87%E3%82%A3%E3%82%A2lfda/id1874514411'
const SPOTIFY = 'https://open.spotify.com/show/3hRAPg1USA102GEQKlYGLj'

function EpisodeCard({ reel, index }) {
  const cardClass = reel.featured ? styles.cardFeatured : styles.card
  return (
    <a
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClass}
      aria-label={reel.caption}
    >
      <div className={styles.thumbWrap}>
        {reel.thumbnail ? (
          <img
            src={`${BASE}reels/${reel.thumbnail}`}
            alt=""
            className={styles.thumb}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
      <div className={styles.info}>
        {reel.featured && (
          <span className={styles.featuredBadge}>理念・ビジョン</span>
        )}
        <span className={styles.num}>{String(index + 1).padStart(2, '0')}</span>
        <p className={styles.caption}>{reel.caption}</p>
        <span className={styles.peek}>Instagram で覗く →</span>
      </div>
    </a>
  )
}

export default function Reels() {
  return (
    <div className={styles.reels}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Podcast</p>
        <h3 className={styles.heading}>
          帰り道の <em>Tech Talk</em>
        </h3>
        <p className={styles.sub}>話しているところだけ、ちょっと覗いてみる。</p>
      </header>

      <div className={styles.list}>
        {reels.map((r, i) => (
          <EpisodeCard key={r.id} reel={r} index={i} />
        ))}
      </div>

      <div className={styles.footer}>
        <p className={styles.footerLabel}>全エピソードを聴く</p>
        <div className={styles.footerLinks}>
          <a
            href={APPLE_PODCASTS}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerBtn}
          >
            Apple Podcasts →
          </a>
          <a
            href={SPOTIFY}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerBtn}
          >
            Spotify →
          </a>
        </div>
      </div>
    </div>
  )
}
