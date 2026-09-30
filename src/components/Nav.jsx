import { useState, useEffect } from 'react'
import { useActiveSection } from '../hooks/useActiveSection'
import styles from './Nav.module.css'

// ヘッダーの4つの入口。sections のどれかを見ている間、その入口が選択状態になる
const NAV = [
  {
    label: 'About',
    ja: '私たちについて',
    href: '#about',
    sections: ['about', 'vision', 'values'],
    children: [
      { label: 'Vision・Mission', href: '#vision' },
      { label: 'Values', href: '#values' },
    ],
  },
  {
    label: 'Contents',
    ja: '発信',
    href: '#series',
    sections: ['series', 'contents', 'platforms'],
    children: [
      { label: 'Series', href: '#series' },
      { label: 'note・Podcast・Instagram', href: '#contents' },
      { label: 'Platforms', href: '#platforms' },
    ],
  },
  {
    label: 'Team',
    ja: 'メンバーと活動',
    href: '#members',
    sections: ['members', 'activities'],
    children: [
      { label: 'Members', href: '#members' },
      { label: '内部での活動', href: '#activities' },
    ],
  },
  {
    label: 'Contact',
    ja: 'お問い合わせ',
    href: '#contact',
    sections: ['contact'],
  },
]

const SECTION_IDS = NAV.flatMap((g) => g.sections)

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
  const [atBottom, setAtBottom] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      // 64px = nav height: hero scrolls under nav only after y > 64
      setOverHero(y > 64 && y < window.innerHeight * 0.85)
      // 短いContactは判定位置まで上がってこないので、ページ末尾に着いたらContactを選択状態にする
      setAtBottom(window.innerHeight + y >= document.documentElement.scrollHeight - 4)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 全画面メニューを開いている間は背面をスクロールさせない（Esc・PC幅への切り替えで閉じる）
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    const wide = window.matchMedia('(min-width: 601px)')
    const onWide = (e) => { if (e.matches) setMenuOpen(false) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      wide.removeEventListener('change', onWide)
    }
  }, [menuOpen])

  const activeGroup = atBottom ? 'Contact' : NAV.find((g) => g.sections.includes(activeId))?.label
  const dark = overHero && !menuOpen
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`${styles.nav}${scrolled ? ` ${styles.scrolled}` : ''}${dark ? ` ${styles.dark}` : ''}`}>
      <a href="#about" className={styles.logo}>
        <img
          src={import.meta.env.BASE_URL + 'lfda_logo.png'}
          alt="LFDA"
          className={styles.logoImg}
        />
        <span className={styles.logoText}>
          <span className={styles.logoInitial}>L</span>iving{' '}
          <span className={styles.logoInitial}>F</span>ully in{' '}
          <span className={styles.logoInitial}>D</span>igital{' '}
          <span className={styles.logoInitial}>A</span>ge
        </span>
      </a>

      {/* デスクトップ用タブ */}
      <nav className={styles.tabs} aria-label="メインナビゲーション">
        {NAV.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className={`${styles.tab} ${activeGroup === label ? styles.active : ''}`}
            aria-current={activeGroup === label ? 'true' : undefined}
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
        aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
      >
        <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
        <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
        <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
      </button>

      {/* モバイル: 全画面メニュー */}
      {menuOpen && (
        <nav className={styles.mobileMenu} aria-label="モバイルナビゲーション">
          <ul className={styles.menuList}>
            {NAV.map((g) => (
              <li key={g.label}>
                <a
                  href={g.href}
                  className={styles.menuLabel}
                  onClick={closeMenu}
                  aria-current={activeGroup === g.label ? 'true' : undefined}
                >
                  {activeGroup === g.label && <span className={styles.menuDot} aria-hidden="true" />}
                  <span className={styles.menuEn}>{g.label}</span>
                  <span className={styles.menuJa}>{g.ja}</span>
                </a>
                {g.children && (
                  <ul className={styles.menuChildren}>
                    {g.children.map((c) => (
                      <li key={c.href}>
                        <a href={c.href} className={styles.menuChild} onClick={closeMenu}>
                          {c.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          {/* LFDAマーク — 右下 */}
          <img
            src={import.meta.env.BASE_URL + 'lfda_logo.png'}
            alt=""
            aria-hidden="true"
            className={styles.menuMark}
          />
        </nav>
      )}
    </header>
  )
}
