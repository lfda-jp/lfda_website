import { useState, useEffect } from 'react'

/**
 * 指定セクションIDのいずれかが viewport に入ったとき activeId を更新する
 * @param {string[]} sectionIds  例: ['about', 'contents', 'members']
 * @returns {string} activeId
 */
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
