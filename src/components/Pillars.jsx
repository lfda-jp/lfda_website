import { pillars } from '../data/pillars'
import styles from './Pillars.module.css'

export default function Pillars() {
  return (
    <section className={styles.pillars}>
      <div className={styles.grid}>
        {pillars.map((p) => (
          <article key={p.id} className={styles.card}>
            <p className={styles.series}>{p.series}</p>
            <h3 className={styles.title}>{p.title}</h3>
            <p className={styles.body}>{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
