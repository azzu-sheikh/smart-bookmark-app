'use client'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import styles from './Login.module.css'

export default function LoginPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.glassPanel}>
        {/* Updated Title */}
        <h1 className={styles.title}>Smart Bookmark App</h1>
        
        {/* Updated Subtitle */}
        <p className={styles.subtitle}>Manage your bookmarks efficiently</p>
        
        {/* Updated Button Text */}
        <button onClick={handleLogin} className={styles.loginBtn} disabled={loading}>
            {loading ? 'Connecting...' : 'Sign in with Google'}
        </button>
      </div>
    </div>
  )
}