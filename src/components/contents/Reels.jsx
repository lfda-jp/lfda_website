import { useRef } from 'react'
import { reels } from '../../data/reels'
import styles from './Reels.module.css'

const BASE = import.meta.env.BASE_URL

function ReelCard({ reel }) {
  return (
    <a
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      aria-label={reel.caption}
    >
      {reel.thumbnail ? (
        <img
          src={`${BASE}reels/${reel.thumbnail}`}
          alt={reel.caption}
          className={styles.thumb}
          loading="lazy"
        />
      ) : (
        <div className={styles.placeholder} />
      )}
      <div className={styles.overlay}>
        <p className={styles.caption}>{reel.caption}</p>
        <span className={styles.play} aria-hidden="true">▶</span>
      </div>
    </a>
  )
}

export default function Reels() {
  const trackRef = useRef(null)

  const scroll = (dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('[class]')
    const cardW = card ? card.offsetWidth + 1 : 280
    track.scrollBy({ left: dir * cardW, behavior: 'smooth' })
  }

  return (
    <div className={styles.reels}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Instagram</p>
          <h3 className={styles.heading}>Reels</h3>
        </div>
        <div className={styles.arrows}>
          <button
            className={styles.arrow}
            onClick={() => scroll(-1)}
            aria-label="前へ"
          >
            ←
          </button>
          <button
            className={styles.arrow}
            onClick={() => scroll(1)}
            aria-label="次へ"
          >
            →
          </button>
        </div>
      </div>

      <div className={styles.track} ref={trackRef}>
        {reels.map((r) => (
          <ReelCard key={r.id} reel={r} />
        ))}
      </div>
    </div>
  )
}
