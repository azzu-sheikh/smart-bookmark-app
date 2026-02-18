'use client'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import styles from './BookmarkList.module.css'

interface Bookmark {
  id: number
  title: string
  url: string
}

export default function BookmarkList({ initialBookmarks }: { initialBookmarks: Bookmark[] }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)
  
  // Now this uses the singleton client we fixed in Step 1
  const supabase = createClient()

  useEffect(() => {
    // Unique channel name helps avoid conflicts
    const channel = supabase
      .channel('realtime-bookmarks')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookmarks' },
        (payload) => {
          console.log('Change received!', payload)
          if (payload.eventType === 'INSERT') {
            setBookmarks((prev) => [...prev, payload.new as Bookmark])
          } else if (payload.eventType === 'DELETE') {
            setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id))
          }
        }
      )
      .subscribe((status) => {
        // This will log the connection status to your browser console
        console.log('Realtime Status:', status)
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const handleDelete = async (id: number) => {
    // Optimistic update
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
    const { error } = await supabase.from('bookmarks').delete().eq('id', id)
    if (error) {
        alert(error.message)
        window.location.reload()
    }
  }

  return (
    <div className={styles.grid}>
      {bookmarks.length === 0 && (
          <p style={{ color: '#888', gridColumn: '1/-1', textAlign: 'center' }}>
            No bookmarks yet. Add one above!
          </p>
      )}
      {bookmarks.map((bookmark) => (
        <div key={bookmark.id} className={styles.card}>
          <div className={styles.cardContent}>
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {bookmark.title}
            </a>
            <p className={styles.urlText}>{bookmark.url}</p>
          </div>
          <button onClick={() => handleDelete(bookmark.id)} className={styles.deleteBtn}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}