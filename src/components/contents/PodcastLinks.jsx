import { podcasts } from '../../data/podcasts'
import styles from './PodcastLinks.module.css'

export default function PodcastLinks() {
  return (
    <div className={styles.section}>
      <h3 className={styles.heading}>
        帰り道の <em>Tech Talk</em>
      </h3>
      <div className={styles.cards}>
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
            <span className={styles.arrow}>→</span>
          </a>
        ))}
      </div>
    </div>
  )
}
