import { useRef, useState, useEffect } from 'react'
import { platforms } from '../data/platforms'
import styles from './Platforms.module.css'

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="ig-grad-p" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-grad-p)" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" stroke="url(#ig-grad-p)" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="1" fill="url(#ig-grad-p)" />
  </svg>
)

const SpotifyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" fill="#1DB954">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
)

const ApplePodcastsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" fill="#832BC1">
    <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.272 1.912 2.619 2.264 4.392.12.59.12 2.2.007 2.864a8.506 8.506 0 01-3.24 5.296c-.608.46-2.096 1.261-2.336 1.261-.088 0-.096-.091-.056-.46.072-.592.144-.715.48-.856.536-.224 1.448-.874 2.008-1.435a7.644 7.644 0 002.008-3.536c.208-.824.184-2.656-.048-3.504-.728-2.696-2.928-4.792-5.624-5.352-.784-.16-2.208-.16-3 0-2.728.56-4.984 2.76-5.672 5.528-.184.752-.184 2.584 0 3.336.456 1.832 1.64 3.512 3.192 4.512.304.2.672.408.824.472.336.144.408.264.472.856.04.36.03.464-.056.464-.056 0-.464-.176-.896-.384l-.04-.03c-2.472-1.216-4.056-3.274-4.632-6.012-.144-.706-.168-2.392-.03-3.04.36-1.74 1.048-3.1 2.192-4.304 1.648-1.737 3.768-2.656 6.128-2.656zm.134 2.81c.409.004.803.04 1.106.106 2.784.62 4.76 3.408 4.376 6.174-.152 1.114-.536 2.03-1.216 2.88-.336.43-1.152 1.15-1.296 1.15-.023 0-.048-.272-.048-.603v-.605l.416-.496c1.568-1.878 1.456-4.502-.256-6.224-.664-.67-1.432-1.064-2.424-1.246-.64-.118-.776-.118-1.448-.008-1.02.167-1.81.562-2.512 1.256-1.72 1.704-1.832 4.342-.264 6.222l.413.496v.608c0 .336-.027.608-.06.608-.03 0-.264-.16-.512-.36l-.034-.011c-.832-.664-1.568-1.842-1.872-2.997-.184-.698-.184-2.024.008-2.72.504-1.878 1.888-3.335 3.808-4.019.41-.145 1.133-.22 1.814-.211zm-.13 2.99c.31 0 .62.06.844.178.488.253.888.745 1.04 1.259.464 1.578-1.208 2.96-2.72 2.254h-.015c-.712-.331-1.096-.956-1.104-1.77 0-.733.408-1.371 1.112-1.745.224-.117.534-.176.844-.176zm-.011 4.728c.988-.004 1.706.349 1.97.97.198.464.124 1.932-.218 4.302-.232 1.656-.36 2.074-.68 2.356-.44.39-1.064.498-1.656.288h-.003c-.716-.257-.87-.605-1.164-2.644-.341-2.37-.416-3.838-.218-4.302.262-.616.974-.966 1.97-.97z"/>
  </svg>
)

const NoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" fill="var(--ink)">
    <path d="M0 .279c4.623 0 10.953-.235 15.498-.117 6.099.156 8.39 2.813 8.468 9.374.077 3.71 0 14.335 0 14.335h-6.598c0-9.296.04-10.83 0-13.759-.078-2.578-.814-3.807-2.795-4.041-2.097-.235-7.975-.04-7.975-.04v17.84H0Z"/>
  </svg>
)

const ThreadsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 192 192" aria-hidden="true" fill="var(--ink)">
    <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.894 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.741C36.239 139.966 31 121.563 30.978 96c.022-25.563 5.261-43.966 15.607-54.707 11.215-14.256 28.466-21.57 51.275-21.742 22.974.173 40.526 7.521 52.171 21.842 5.71 7.025 9.979 15.81 12.781 26.052l16.262-4.347c-3.45-12.725-8.977-23.532-16.585-32.322C147.415 14.535 125.385 5.2 96.03 5L96 5c-29.291.204-51.035 9.571-64.456 25.835C21.138 42.97 15.336 60.5 15.098 82.808L15 96l.098 13.192c.238 22.308 6.04 39.839 16.444 52.158C44.965 177.629 66.71 186.995 96 187.2l.03-.002c26.317-.186 44.806-7.054 59.757-21.993 19.74-19.728 19.195-43.37 12.665-58.183-4.906-11.42-14.232-20.84-26.915-26.034Z"/>
    <path d="M106.688 123.32c-9.208.504-18.363-3.065-18.89-13.073-.36-6.76 4.506-13.567 20.12-14.461 2.467-.141 4.896-.21 7.268-.21 5.36 0 10.405.46 15.024 1.339-.516 17.256-9.957 25.654-23.522 26.405Z"/>
  </svg>
)

const ICONS = {
  instagram: <InstagramIcon />,
  threads: <ThreadsIcon />,
  spotify: <SpotifyIcon />,
  'apple-podcasts': <ApplePodcastsIcon />,
  note: <NoteIcon />,
}

export default function Platforms() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  const scrollTo = (i) => {
    const track = trackRef.current
    if (!track) return
    const cards = track.querySelectorAll('a')
    cards[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index))
        })
      },
      { root: track, threshold: 0.5 }
    )
    const cards = track.querySelectorAll('a')
    cards.forEach((c, i) => { c.dataset.index = i; observer.observe(c) })
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.platforms}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <p className={styles.label}>発信先</p>
          <h2 className={styles.heading}>Platforms</h2>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.dots}>
            {platforms.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${active === i ? styles.dotActive : ''}`}
                onClick={() => scrollTo(i)}
                aria-label={`Platform ${i + 1}`}
              />
            ))}
          </div>
          <div className={styles.arrows}>
            <button className={styles.arrowBtn} onClick={() => scrollTo(Math.max(0, active - 1))} aria-label="前へ">←</button>
            <button className={styles.arrowBtn} onClick={() => scrollTo(Math.min(platforms.length - 1, active + 1))} aria-label="次へ">→</button>
          </div>
        </div>
      </header>

      <div className={styles.track} ref={trackRef}>
        {platforms.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.iconWrap}>
              {ICONS[p.id] ?? null}
            </div>
            <span className={styles.name}>{p.name}</span>
            <p className={styles.desc}>{p.description}</p>
            <span className={styles.arrow}>→</span>
          </a>
        ))}
      </div>
    </section>
  )
}
