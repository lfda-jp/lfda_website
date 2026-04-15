import { vmv } from '../data/vmv'
import styles from './VMV.module.css'

export default function VMV() {
  return (
    <section className={styles.vmv}>
      <div className={styles.left}>
        <h2 className={styles.heading}>
          Vision,<br />
          <em>Mission</em>
        </h2>
      </div>
      <div className={styles.right}>
        <div className={styles.item}>
          <p className={styles.label}>Vision</p>
          <p className={styles.text}>{vmv.vision}</p>
        </div>
        <div className={styles.divider} />
        <div className={styles.item}>
          <p className={styles.label}>Mission</p>
          <p className={styles.text}>{vmv.mission}</p>
        </div>
      </div>
    </section>
  )
}
