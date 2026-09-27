import styles from './Hero.module.css'
import BlobCanvas from './BlobCanvas'

export default function Hero() {
  return (
    <section id="about" className={styles.hero}>
      {/* 左カラム */}
      <div className={styles.text}>
        <p className={styles.eyebrow}>Digital Wellbeing Media — Est. 2025</p>
        <h1 className={styles.heading}>
          Living Fully in{' '}
          <em className={styles.italic}>Digital Age</em>
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

      {/* 背景ブロブ */}
      <BlobCanvas className={styles.blobCanvas} />
    </section>
  )
}
