import { vmv } from '../data/vmv'
import styles from './VMV.module.css'

export default function VMV() {
  return (
    <div className={styles.wrapper}>
      {/* Vision — クリーム背景、大きな詩的テキスト */}
      <section className={styles.vision}>
        <span className={styles.label}>Vision</span>
        <p className={styles.statement}>{vmv.vision}</p>
      </section>

      {/* Mission — ダーク背景、コントラスト */}
      <section className={styles.mission}>
        <span className={styles.labelDark}>Mission</span>
        <p className={styles.statementDark}>{vmv.mission}</p>
      </section>
    </div>
  )
}
