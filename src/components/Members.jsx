import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { members } from '../data/members'
import styles from './Members.module.css'

const BASE = import.meta.env.BASE_URL

function MemberModal({ member, onClose }) {
  const initial = member.name.charAt(0)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <button className={styles.sheetClose} onClick={onClose} aria-label="閉じる">✕</button>

        <div className={styles.sheetHeader}>
          {member.photo ? (
            <img
              src={`${BASE}members/${member.photo}`}
              alt={member.name}
              className={styles.sheetPhoto}
            />
          ) : (
            <div className={styles.sheetAvatar}>{initial}</div>
          )}
          <div className={styles.sheetMeta}>
            <p className={styles.sheetRole}>{member.role}</p>
            <h3 className={styles.sheetName}>{member.name}</h3>
            {member.nameEn && <p className={styles.sheetNameEn}>{member.nameEn}</p>}
            {member.university && <p className={styles.sheetUni}>{member.university}</p>}
          </div>
        </div>

        {member.tagline && (
          <p className={styles.sheetTagline}>── {member.tagline}</p>
        )}

        <p className={styles.sheetBio}>{member.bio}</p>
      </div>
    </div>,
    document.body
  )
}

function MemberCard({ member, onSelect }) {
  const initial = member.name.charAt(0)

  return (
    <article
      className={styles.card}
      onClick={() => onSelect(member)}
      aria-label={`${member.name} — クリックで詳細を表示`}
    >
      <div className={styles.cardTop}>
        {member.photo ? (
          <img
            src={`${BASE}members/${member.photo}`}
            alt={member.name}
            className={styles.photo}
            loading="lazy"
          />
        ) : (
          <div className={styles.avatar}>{initial}</div>
        )}
      </div>
      <div className={styles.cardBottom}>
        <p className={styles.role}>{member.role}</p>
        <h3 className={styles.name}>{member.name}</h3>
        {member.nameEn && <p className={styles.nameEn}>{member.nameEn}</p>}
        <p className={styles.hint}>詳細を読む →</p>
      </div>
    </article>
  )
}

export default function Members() {
  const [selectedMember, setSelectedMember] = useState(null)

  return (
    <section id="members" className={styles.members}>
      <header className={styles.header}>
        <h2 className={styles.heading}>
          <em>Members</em>
        </h2>
        <div className={styles.headerRight}>
          <p className={styles.subtext}>LFDAをともに作るメンバー</p>
          <a
            href="https://www.instagram.com/fillingyourdigitalwellbeing/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.joinLink}
          >
            参加したい方はインスタDMまで →
          </a>
        </div>
      </header>

      <div className={styles.grid}>
        {members.map((m) => (
          <MemberCard key={m.id} member={m} onSelect={setSelectedMember} />
        ))}
      </div>

      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </section>
  )
}
