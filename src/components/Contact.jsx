import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.inner}>
        <p className={styles.label}>Contact</p>
        <h2 className={styles.heading}>お問い合わせ</h2>
        <p className={styles.desc}>
          取材・コラボレーション・その他のお問い合わせはメールにてご連絡ください。
        </p>
        <a
          href="mailto:lfda.digitalwellbeing@gmail.com"
          className={styles.email}
        >
          lfda.digitalwellbeing@gmail.com
        </a>
      </div>
    </section>
  )
}
