import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.brand}>LFDA — Living Fully in Digital Age</p>
      <div className={styles.center}>
        <a href="mailto:lfda.digitalwellbeing@gmail.com" className={styles.email}>
          lfda.digitalwellbeing@gmail.com
        </a>
        <a
          href="https://www.instagram.com/fillingyourdigitalwellbeing/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.igText}
        >
          日常の発信はInstagramで →
        </a>
      </div>
      <p className={styles.copy}>© LFDA 2024</p>
    </footer>
  )
}
