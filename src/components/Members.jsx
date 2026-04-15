import { members } from '../data/members'
import styles from './Members.module.css'

function Avatar({ member }) {
  if (member.photo) {
    return (
      <img
        src={`${import.meta.env.BASE_URL}members/${member.photo}`}
        alt={member.name}
        className={styles.photo}
        loading="lazy"
      />
    )
  }
  const initial = member.name.charAt(0).toUpperCase()
  return (
    <div className={styles.avatar} aria-hidden="true">
      {initial}
    </div>
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
          <article key={m.id} className={styles.card}>
            <Avatar member={m} />
            <p className={styles.role}>{m.role}</p>
            <h3 className={styles.name}>{m.name}</h3>
            {m.nameEn && <p className={styles.nameEn}>{m.nameEn}</p>}
            <p className={styles.comment}>{m.comment}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
