import { useRef } from 'react'
import { podcasts } from '../../data/podcasts'
import styles from './PodcastLinks.module.css'

export default function PodcastLinks() {
  const trackRef = useRef(null)

  const scroll = (dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('[class]')
    const cardW = card ? card.offsetWidth + 12 : 280
    track.scrollBy({ left: dir * cardW, behavior: 'smooth' })
  }

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>帰り道の</p>
          <h3 className={styles.heading}><em>Tech Talk</em></h3>
        </div>
        <div className={styles.arrows}>
          <button className={styles.arrow} onClick={() => scroll(-1)} aria-label="前へ">←</button>
          <button className={styles.arrow} onClick={() => scroll(1)} aria-label="次へ">→</button>
        </div>
      </div>

      <div className={styles.track} ref={trackRef}>
        {podcasts.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            style={{ '--brand': p.color }}
          >
            <span className={styles.platform}>{p.name}</span>
            <span className={styles.desc}>{p.description}</span>
            <span className={styles.arrow2}>→</span>
          </a>
        ))}
      </div>
    </div>
  )
}
