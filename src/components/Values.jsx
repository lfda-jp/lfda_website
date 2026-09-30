import { values } from '../data/values'
import styles from './Values.module.css'

export default function Values() {
  return (
    <section id="values" className={styles.values}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>私たちの行動原則</p>
        <h2 className={styles.heading}>Values</h2>
      </header>

      <ol className={styles.list}>
        {values.map((v) => (
          <li key={v.id} className={styles.item}>
            <span className={styles.no}>{v.no}</span>
            <div className={styles.body}>
              <h3 className={styles.title}>{v.title}</h3>
              <p className={styles.desc}>{v.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
