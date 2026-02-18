'use client'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import styles from './SignOut.module.css'

export default function SignOut() {
    const supabase = createClient()
    const router = useRouter()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <button onClick={handleLogout} className={styles.button}>
            Sign Out
        </button>
    )
}