import { vmv } from '../data/vmv'
import MiniBlob from './MiniBlob'
import styles from './VMV.module.css'

export default function VMV() {
  return (
    <div className={styles.wrapper}>
      {/* Vision — クリーム背景、シルバーブロブ（右側） */}
      <section className={styles.vision}>
        <MiniBlob className={styles.blobVision} dark={false} />
        <span className={styles.label}>Vision</span>
        <p className={styles.statement}>{vmv.vision}</p>
      </section>

      {/* Mission — ダーク背景、ゴールドブロブ（左側） */}
      <section className={styles.mission}>
        <MiniBlob className={styles.blobMission} dark={true} />
        <span className={styles.labelDark}>Mission</span>
        <p className={styles.statementDark}>{vmv.mission}</p>
      </section>
    </div>
  )
}
