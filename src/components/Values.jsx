import { values } from '../data/values'
import styles from './Values.module.css'

export default function Values() {
  return (
    <section className={styles.values}>
      <header className={styles.header}>
        <h2 className={styles.heading}>Values</h2>
      </header>
      <div className={styles.grid}>
        {values.map((v) => (
          <article
            key={v.id}
            className={`${styles.card} ${v.id === 5 ? styles.full : ''}`}
          >
            <p className={styles.no}>{v.no}</p>
            <h3 className={styles.title}>{v.title}</h3>
            <p className={styles.body}>{v.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
