import { useRef, useCallback, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { pillars } from '../data/pillars'
import styles from './Pillars.module.css'

function PillarModal({ pillar, onClose }) {
  const isDark = pillar.id % 2 === 0

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <button className={styles.sheetClose} onClick={onClose} aria-label="閉じる">✕</button>

        <p className={styles.sheetSeries}>{pillar.series}</p>
        <h3 className={styles.sheetTitle}>
          {pillar.emoji && <span className={styles.sheetEmoji}>{pillar.emoji}</span>}
          {pillar.title}
        </h3>

        {pillar.tagline && (
          <p className={styles.sheetTagline}>── {pillar.tagline}</p>
        )}

        <p className={styles.sheetDesc}>{pillar.description}</p>
      </div>
    </div>,
    document.body
  )
}

function PillarCard({ pillar, index, onSelect }) {
  const cardRef = useRef(null)

  const onMouseMove = useCallback((e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${-y * 10}deg`)
    el.style.setProperty('--ry', `${x * 10}deg`)
  }, [])

  const onMouseLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }, [])

  return (
    <article
      ref={cardRef}
      className={`${styles.card} ${styles[`c${index + 1}`]}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => onSelect(pillar)}
    >
      {/* CSS 3D blob */}
      <div className={styles.blobWrap}>
        <div className={styles.blob} />
        <div className={styles.blobReflect} />
      </div>

      {/* コンテンツ */}
      <div className={styles.content}>
        <p className={styles.series}>{pillar.series}</p>
        <h3 className={styles.title}>{pillar.title}</h3>
        <p className={styles.body}>{pillar.body}</p>
        <p className={styles.hint}>詳細を読む →</p>
      </div>

      {/* 大きな装飾数字 */}
      <span className={styles.bigNo}>{String(index + 1).padStart(2, '0')}</span>
    </article>
  )
}

export default function Pillars() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const [selectedPillar, setSelectedPillar] = useState(null)

  const scrollTo = (i) => {
    const track = trackRef.current
    if (!track) return
    const cards = track.querySelectorAll('article')
    cards[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number(e.target.dataset.index)
            setActive(i)
          }
        })
      },
      { root: track, threshold: 0.5 }
    )
    const cards = track.querySelectorAll('article')
    cards.forEach((c, i) => {
      c.dataset.index = i
      observer.observe(c)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.pillars}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <p className={styles.eyebrow}>コンテンツシリーズ</p>
          <h2 className={styles.heading}>Series</h2>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.dots}>
            {pillars.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${active === i ? styles.dotActive : ''}`}
                onClick={() => scrollTo(i)}
                aria-label={`Series ${i + 1}`}
              />
            ))}
          </div>
          <div className={styles.arrows}>
            <button className={styles.arrow} onClick={() => scrollTo(Math.max(0, active - 1))} aria-label="前へ">←</button>
            <button className={styles.arrow} onClick={() => scrollTo(Math.min(pillars.length - 1, active + 1))} aria-label="次へ">→</button>
          </div>
        </div>
      </header>

      <div className={styles.track} ref={trackRef}>
        {pillars.map((p, i) => (
          <PillarCard key={p.id} pillar={p} index={i} onSelect={setSelectedPillar} />
        ))}
      </div>

      {selectedPillar && (
        <PillarModal
          pillar={selectedPillar}
          onClose={() => setSelectedPillar(null)}
        />
      )}
    </section>
  )
}
