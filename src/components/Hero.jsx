import styles from './Hero.module.css'
import BlobCanvas from './BlobCanvas'
import { vmv } from '../data/vmv'

export default function Hero() {
  return (
    <section id="about" className={styles.hero}>
      {/* 背景ブロブ */}
      <BlobCanvas className={styles.blobCanvas} />

      {/* Vision / Mission — 右上 */}
      <div className={styles.vmv}>
        <div className={styles.vmvItem}>
          <p className={styles.vmvLabel}>Vision</p>
          <p className={styles.vmvText}>{vmv.vision}</p>
        </div>
        <div className={styles.vmvDivider} />
        <div className={styles.vmvItem}>
          <p className={styles.vmvLabel}>Mission</p>
          <p className={styles.vmvText}>{vmv.mission}</p>
        </div>
      </div>

      {/* メインテキスト — 左下 */}
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
    </section>
  )
}
