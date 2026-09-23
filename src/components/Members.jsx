import { useState } from 'react'
import { members } from '../data/members'
import styles from './Members.module.css'

function FlipCard({ member }) {
  const [flipped, setFlipped] = useState(false)
  const initial = member.name.charAt(0)

  return (
    <article
      className={`${styles.card} ${flipped ? styles.flipped : ''}`}
      onClick={() => setFlipped(f => !f)}
      aria-label={`${member.name} — クリックで詳細を表示`}
    >
      <div className={styles.inner}>
        {/* 表面 */}
        <div className={styles.front}>
          <div className={styles.frontTop}>
            {member.photo ? (
              <img
                src={`${import.meta.env.BASE_URL}members/${member.photo}`}
                alt={member.name}
                className={styles.photo}
                loading="lazy"
              />
            ) : (
              <div className={styles.avatar}>{initial}</div>
            )}
          </div>
          <div className={styles.frontBottom}>
            <p className={styles.role}>{member.role}</p>
            <h3 className={styles.name}>{member.name}</h3>
            {member.nameEn && <p className={styles.nameEn}>{member.nameEn}</p>}
            <p className={styles.flipHint}>タップで詳細 →</p>
          </div>
        </div>

        {/* 裏面 */}
        <div className={styles.back}>
          <div>
            <p className={styles.backRole}>{member.role}</p>
            <h3 className={styles.backName}>{member.name}</h3>
            {member.university && (
              <p className={styles.backUniv}>{member.university}</p>
            )}
          </div>
          <p className={styles.backBio}>{member.bio}</p>
          <p className={styles.backHint}>← 戻す</p>
        </div>
      </div>
    </article>
  )
}

export default function Members() {
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
          <FlipCard key={m.id} member={m} />
        ))}
      </div>
    </section>
  )
}
