import { useState } from 'react'
import styles from './Contact.module.css'

const EMAIL = 'lfda.digitalwellbeing@gmail.com'

// mailto: はメールアプリが設定されていない環境（ブラウザ版Gmail・Instagramのアプリ内ブラウザなど）
// では開かないため、アドレスをコピーできるようにしておく
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Clipboard API が使えない環境向けのフォールバック
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  }
}

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!(await copyText(EMAIL))) return
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.inner}>
        <p className={styles.label}>Contact</p>
        <h2 className={styles.heading}>お問い合わせ</h2>
        <p className={styles.desc}>
          取材・コラボレーション・その他のお問い合わせはメールにてご連絡ください。
        </p>
        <div className={styles.emailRow}>
          <a href={`mailto:${EMAIL}`} className={styles.email}>
            {EMAIL}
          </a>
          <button type="button" className={styles.copyButton} onClick={handleCopy} aria-live="polite">
            {copied ? 'コピーしました' : 'アドレスをコピー'}
          </button>
        </div>
      </div>
    </section>
  )
}
