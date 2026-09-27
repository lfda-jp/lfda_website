import { useState, useEffect } from 'react'
import { useActiveSection } from '../hooks/useActiveSection'
import styles from './Nav.module.css'

const SECTION_IDS = ['about', 'contents']

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#E1306C"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="#E1306C" stroke="none" />
  </svg>
)

export default function Nav() {
  const activeId = useActiveSection(SECTION_IDS)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [overHero, setOverHero] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      // 64px = nav height: hero scrolls under nav only after y > 64
      setOverHero(y > 64 && y < window.innerHeight * 0.85)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const tabs = [
    { label: 'About',    href: '#about' },
    { label: 'Contents', href: '#contents' },
    { label: 'Contact',  href: '#contact' },
  ]

  const sectionMap = { About: 'about', Contents: 'contents' }

  return (
    <header className={`${styles.nav}${scrolled ? ` ${styles.scrolled}` : ''}${overHero ? ` ${styles.dark}` : ''}`}>
      <a href="#about" className={styles.logo}>
        <img
          src={import.meta.env.BASE_URL + 'lfda_logo.png'}
          alt="LFDA"
          className={styles.logoImg}
        />
        <span className={styles.logoText}>Living Fully in Digital Age</span>
      </a>

      {/* デスクトップ用タブ */}
      <nav className={styles.tabs} aria-label="メインナビゲーション">
        {tabs.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className={`${styles.tab} ${activeId === sectionMap[label] ? styles.active : ''}`}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Instagramアイコン（常時表示） */}
      <a
        href="https://www.instagram.com/fillingyourdigitalwellbeing/"
        className={styles.igLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <InstagramIcon />
      </a>

      {/* ハンバーガーボタン（モバイル） */}
      <button
        className={styles.burger}
        onClick={() => setMenuOpen((v) => !v)}
        aria-expanded={menuOpen}
        aria-label="メニューを開く"
      >
        <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
        <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
        <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
      </button>

      {/* モバイルメニュー */}
      {menuOpen && (
        <nav className={styles.mobileMenu} aria-label="モバイルナビゲーション">
          {tabs.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={styles.mobileTab}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
