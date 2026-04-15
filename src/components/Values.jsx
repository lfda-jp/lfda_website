import { values } from '../data/values'
import styles from './Values.module.css'

export default function Values() {
  const regular = values.slice(0, 4)
  const last = values[4]

  return (
    <section className={styles.values}>
      <header className={styles.header}>
        <h2 className={styles.heading}>Values</h2>
      </header>
      <div className={styles.grid}>
        {regular.map((v) => (
          <article key={v.id} className={styles.card}>
            <p className={styles.no}>{v.no}</p>
            <h3 className={styles.title}>{v.title}</h3>
            <p className={styles.body}>{v.body}</p>
          </article>
        ))}
      </div>
      {/* 5枚目：アクセントカラーで締める */}
      <article className={styles.lastCard}>
        <p className={styles.lastNo}>{last.no}</p>
        <div className={styles.lastContent}>
          <h3 className={styles.lastTitle}>{last.title}</h3>
          <p className={styles.lastBody}>{last.body}</p>
        </div>
      </article>
    </section>
  )
}
