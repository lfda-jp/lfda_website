import styles from './InstagramBanner.module.css'

const IG_URL = 'https://www.instagram.com/fillingyourdigitalwellbeing/'

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#E1306C"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="#E1306C" stroke="none" />
  </svg>
)

export default function InstagramBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.inner}>
        <InstagramIcon />
        <div className={styles.text}>
          <p className={styles.handle}>@fillingyourdigitalwellbeing</p>
          <p className={styles.desc}>日常の発信はInstagramでチェックしてください</p>
        </div>
        <a
          href={IG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          Instagram をフォローする →
        </a>
      </div>
    </div>
  )
}
