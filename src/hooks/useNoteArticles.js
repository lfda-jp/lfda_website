import { useState, useEffect } from 'react'
import { fetchNoteArticles } from '../services/noteRss'

export function useNoteArticles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchNoteArticles()
      .then(setArticles)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { articles, loading, error }
}
