import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AddBookmark from '@/components/AddBookmark'
import BookmarkList from '@/components/BookmarkList'
import SignOut from '@/components/SignOut'
import styles from './Dashboard.module.css'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('*')
    .order('created_at', { ascending: true })

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>My <span>Bookmarks</span></h1>
          <p className={styles.userTag}>User: {user.email}</p>
        </div>
        <SignOut />
      </header>
      
      <AddBookmark />
      <BookmarkList initialBookmarks={bookmarks || []} />
    </main>
  )
}