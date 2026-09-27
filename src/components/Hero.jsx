import { useLayoutEffect, useRef } from 'react'
import styles from './Hero.module.css'
import BlobCanvas from './BlobCanvas'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#@%'
const rnd = () => CHARS[Math.floor(Math.random() * CHARS.length)]
const LINE1 = 'Living Fully in '
const LINE2 = 'Digital Age'

export default function Hero() {
  const h1Ref = useRef(null)

  useLayoutEffect(() => {
    const el = h1Ref.current
    if (!el) return
    const spans = el.querySelectorAll('span[data-final]')
    if (!spans.length) return

    spans.forEach(span => { span.textContent = rnd() })

    const cleanups = []
    spans.forEach((span) => {
      const final = span.dataset.final
      const delay = Number(span.dataset.delay)
      const t = setTimeout(() => {
        let step = 0
        const iv = setInterval(() => {
          span.textContent = ++step < 18 ? rnd() : final
          if (step >= 18) clearInterval(iv)
        }, 60)
        cleanups.push(() => clearInterval(iv))
      }, delay)
      cleanups.push(() => clearTimeout(t))
    })
    return () => cleanups.forEach(fn => fn())
  }, [])

  let ci = 0
  const ch = (c, i, pfx) => {
    if (c === ' ') return <span key={`${pfx}s${i}`}>{' '}</span>
    const delay = ci++ * 72
    return <span key={`${pfx}c${i}`} data-final={c} data-delay={delay}>{c}</span>
  }

  return (
    <section id="about" className={styles.hero}>
      <BlobCanvas className={styles.blobCanvas} />

      <div className={styles.text}>
        <p className={styles.eyebrow}>Digital Wellbeing Media — Est. 2025</p>
        <h1 className={styles.heading} ref={h1Ref}>
          {LINE1.split('').map((c, i) => ch(c, i, 'a'))}
          <em className={styles.italic}>
            {LINE2.split('').map((c, i) => ch(c, i, 'b'))}
          </em>
        </h1>
        <p className={styles.sub}>
          AI時代を生きる若者からのデジタルメディア。アルゴリズムに流されるのではなく、自分でデジタル空間を再デザインする。とめどなく進化するテクノロジーと、うまく生きていく方法を考え続ける。
        </p>
        <a
          href="https://www.instagram.com/fillingyourdigitalwellbeing/"
          className={styles.cta}
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow on Instagram
        </a>
      </div>

      <div className={styles.mark}>
        <img
          src={import.meta.env.BASE_URL + 'lfda_logo.png'}
          alt="LFDA"
          className={styles.markImg}
        />
      </div>
    </section>
  )
}
