import { useState, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import MiniBlob from './MiniBlob'
import { activities } from '../data/activities'
import styles from './Activities.module.css'

const BASE = import.meta.env.BASE_URL

// 「2026年8月〜」「2026年9月8日」などから並べ替え用の数値を取り出す（読めない表記は末尾へ）
function dateKey(text = '') {
  const [, y = 0, m = 0, d = 0] = text.match(/(\d{4})\D+(\d{1,2})(?:\D+(\d{1,2}))?/) ?? []
  return Number(y) * 10000 + Number(m) * 100 + Number(d)
}

// 本は時期の新しい順
const sortBooks = (books) => [...books].sort((a, b) => dateKey(b.period) - dateKey(a.period))

// 開催回は古い順に「第N回」を振ってから、新しい順に並べる
const sortEvents = (events) =>
  [...events]
    .sort((a, b) => dateKey(a.date) - dateKey(b.date))
    .map((ev, i) => ({ ...ev, number: i + 1 }))
    .reverse()

function Links({ links }) {
  return (
    <p className={styles.links}>
      {links.map((l) => (
        <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
          {l.label}<span aria-hidden="true">→</span>
        </a>
      ))}
    </p>
  )
}

function Book({ book }) {
  return (
    <li className={styles.book}>
      <p className={styles.meta}>{book.period}｜{book.members}</p>
      <h4 className={styles.bookTitle}>{book.title}</h4>
      {book.subtitle && <p className={styles.bookSubtitle}>{book.subtitle}</p>}
      <p className={styles.byline}>
        <span className={styles.author}>{book.author}</span>
        <span className={styles.publication}>{book.publication}</span>
      </p>
      {book.origin && <p className={styles.origin}>{book.origin}</p>}
      <p className={styles.para}>{book.summary}</p>
      {book.status && <p className={styles.tag}>{book.status}</p>}
      {book.links && <Links links={book.links} />}
    </li>
  )
}

function WorkList({ heading, items }) {
  return (
    <>
      <h4 className={styles.listHeading}>{heading}</h4>
      <ul className={styles.works}>
        {items.map((w) => (
          <li key={w.title} className={styles.work}>
            <span className={styles.workMember}>{w.member}</span>
            <span className={styles.workTitle}>
              {w.url
                ? <a href={w.url} target="_blank" rel="noopener noreferrer" className={styles.workLink}>{w.title}</a>
                : w.title}
              {w.note && <span className={styles.workNote}>{w.note}</span>}
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}

function HackathonEvent({ event }) {
  return (
    <section className={styles.block}>
      <p className={styles.meta}>第{event.number}回｜{event.date}</p>
      <h3 className={styles.blockHeading}>{event.name ?? 'ミニハッカソン'}</h3>
      {event.tools && (
        <p className={styles.tools}>
          使ったツール
          {event.tools.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
        </p>
      )}
      {event.works && <WorkList heading="つくったもの" items={event.works} />}
      {event.showcase && <WorkList heading="最近作ったものを紹介" items={event.showcase} />}
      {event.links && <Links links={event.links} />}
    </section>
  )
}

function ActivityModal({ activity, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const prevFocus = document.activeElement
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      prevFocus?.focus?.()
    }
  }, [onClose])

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="activity-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} className={styles.sheetClose} onClick={onClose} aria-label="閉じる">✕</button>

        <p className={styles.sheetEyebrow}>内部での活動</p>
        <h2 id="activity-title" className={styles.sheetTitle}>{activity.title}</h2>
        {activity.subtitle && <p className={styles.sheetSubtitle}>{activity.subtitle}</p>}

        <p className={styles.sheetLead}>{activity.lead}</p>
        {activity.body.map((p, i) => <p key={i} className={styles.para}>{p}</p>)}

        {activity.why && (
          <section className={styles.block}>
            <h3 className={styles.blockHeading}>{activity.why.heading}</h3>
            {activity.why.body.map((p, i) => <p key={i} className={styles.para}>{p}</p>)}
          </section>
        )}

        {activity.books && (
          <section className={styles.block}>
            <h3 className={styles.blockHeading}>これまでに読んだ本</h3>
            <ol className={styles.books}>
              {sortBooks(activity.books).map((b) => <Book key={b.title} book={b} />)}
            </ol>
          </section>
        )}

        {activity.events && sortEvents(activity.events).map((ev) => <HackathonEvent key={ev.number} event={ev} />)}

        {/* LFDAマーク — 右下 */}
        <img src={`${BASE}lfda_logo.png`} alt="" aria-hidden="true" className={styles.sheetMark} />
      </div>
    </div>,
    document.body
  )
}

function ActivityCard({ activity, dark, onSelect }) {
  return (
    <article className={`${styles.card}${dark ? ` ${styles.cardDark}` : ''}`}>
      <h3 className={styles.cardTitle}>{activity.title}</h3>
      {activity.subtitle && <p className={styles.cardSubtitle}>{activity.subtitle}</p>}
      <p className={styles.cardLead}>{activity.lead}</p>
      <button
        type="button"
        className={styles.cardButton}
        onClick={() => onSelect(activity)}
        aria-haspopup="dialog"
        aria-label={`${activity.title}の詳細を読む`}
      >
        詳細を読む<span className={styles.arrow} aria-hidden="true">→</span>
      </button>
    </article>
  )
}

export default function Activities() {
  const [selected, setSelected] = useState(null)
  const handleClose = useCallback(() => setSelected(null), [])

  return (
    <section id="activities" className={styles.activities}>
      {/* オブジェクト: サイト共通の3Dブロブ（背景透過） */}
      <div className={styles.object} aria-hidden="true">
        <MiniBlob />
      </div>

      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>内部での活動</p>
          <h2 className={styles.heading}>Activities</h2>
        </header>

        <div className={styles.grid}>
          {activities.map((a, i) => (
            <ActivityCard key={a.title} activity={a} dark={i % 2 === 1} onSelect={setSelected} />
          ))}
        </div>
      </div>

      {/* LFDAマーク — 右下 */}
      <img src={`${BASE}lfda_logo.png`} alt="" aria-hidden="true" className={styles.mark} />

      {selected && <ActivityModal activity={selected} onClose={handleClose} />}
    </section>
  )
}
