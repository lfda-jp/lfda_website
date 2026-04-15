import styles from './Pullquote.module.css'

export default function Pullquote() {
  return (
    <section className={styles.pullquote}>
      <span className={styles.mark} aria-hidden="true">"</span>
      <blockquote>
        <p className={styles.quote}>
          アルゴリズムに流されるのではなく、自分でデジタル空間を再デザインする。
        </p>
      </blockquote>
    </section>
  )
}
