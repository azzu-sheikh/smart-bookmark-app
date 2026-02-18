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

    // 1. Get the current user first
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert('You must be logged in to add a bookmark')
      setLoading(false)
      return
    }

    // 2. Insert the bookmark WITH the user_id
    const { error } = await supabase.from('bookmarks').insert([
      { 
        title, 
        url, 
        user_id: user.id // <--- CRITICAL FIX: Explicitly assigning ownership
      }
    ])
    
    setLoading(false)

    if (error) {
      console.error('Insert Error:', error)
      alert(error.message) // This should stop saying "violates RLS policy" now
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