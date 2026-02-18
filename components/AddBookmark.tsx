'use client'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import styles from './AddBookmark.module.css'

export default function AddBookmark() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !url) return

    setLoading(true)

    // 1. Get the current user ID
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert('Please log in to add bookmarks')
      setLoading(false)
      return
    }

    // 2. Insert with user_id
    const { error } = await supabase.from('bookmarks').insert([
      { 
        title, 
        url,
        user_id: user.id  // <--- THIS IS THE CRITICAL MISSING PIECE
      }
    ])
    
    setLoading(false)

    if (error) {
      console.error('Error adding bookmark:', error)
      alert(error.message)
    } else {
      setTitle('')
      setUrl('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Title</label>
        <input
          type="text"
          placeholder="e.g. Google"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>URL</label>
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}