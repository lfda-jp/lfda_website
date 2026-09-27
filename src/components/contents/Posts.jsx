import { useRef } from 'react'
import { posts } from '../../data/posts'
import styles from './Posts.module.css'

const BASE = import.meta.env.BASE_URL

function PostCard({ post }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      aria-label={post.caption}
    >
      {post.thumbnail ? (
        <img
          src={`${BASE}posts/${post.thumbnail}`}
          alt={post.caption}
          className={styles.thumb}
          loading="lazy"
        />
      ) : (
        <div className={styles.placeholder} />
      )}
      <div className={styles.overlay}>
        <p className={styles.sub}>{post.sub}</p>
        <p className={styles.caption}>{post.caption}</p>
      </div>
    </a>
  )
}

export default function Posts() {
  const trackRef = useRef(null)

  const scroll = (dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('[class]')
    const cardW = card ? card.offsetWidth + 12 : 300
    track.scrollBy({ left: dir * cardW, behavior: 'smooth' })
  }

  return (
    <div className={styles.posts}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Instagram</p>
          <h3 className={styles.heading}>Posts</h3>
        </div>
        <div className={styles.arrows}>
          <button
            className={styles.arrow}
            onClick={() => scroll(-1)}
            aria-label="前へ"
          >
            ←
          </button>
          <button
            className={styles.arrow}
            onClick={() => scroll(1)}
            aria-label="次へ"
          >
            →
          </button>
        </div>
      </div>

      <div className={styles.track} ref={trackRef}>
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  )
}
