import { platforms } from '../data/platforms'
import styles from './Platforms.module.css'

const InstagramGradientIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-grad)" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" stroke="url(#ig-grad)" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="1" fill="url(#ig-grad)" />
  </svg>
)

export default function Platforms() {
  return (
    <section className={styles.platforms}>
      <header className={styles.header}>
        <h2 className={styles.heading}>Platforms</h2>
      </header>
      <div className={styles.grid}>
        {platforms.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.nameRow}>
              {p.hasIcon && <InstagramGradientIcon />}
              <span className={styles.name}>{p.name}</span>
            </div>
            <p className={styles.desc}>{p.description}</p>
            <span className={styles.arrow}>→</span>
          </a>
        ))}
      </div>
    </section>
  )
}
