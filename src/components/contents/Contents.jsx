import NoteArticles from './NoteArticles'
import PodcastLinks from './PodcastLinks'
import Reels from './Reels'
import Posts from './Posts'
import styles from './Contents.module.css'

export default function Contents() {
  return (
    <section id="contents" className={styles.contents}>
      <header className={styles.header}>
        <h2 className={styles.heading}>Contents</h2>
        <p className={styles.sub}>LFDAが発信する3つのメディア</p>
      </header>
      <NoteArticles />
      <PodcastLinks />
      <Reels />
      <Posts />
    </section>
  )
}
