# Smart Bookmark App

A real-time bookmark manager built with Next.js 15 (App Router) and Supabase. Users can log in with Google, save private bookmarks, and see updates instantly across devices without refreshing the page.

## 🚀 Features
* **Google OAuth Authentication**: Secure passwordless login.
* **Row Level Security (RLS)**: Users can only view, edit, and delete their own bookmarks.
* **Real-time Synchronization**: Bookmarks added or deleted in one tab appear instantly in others using Supabase Realtime.
* **Futuristic UI**: Glassmorphism design with neon glows and animated backgrounds.
* **Singleton Client Pattern**: Optimized database connections for stability.

## 🛠️ Tech Stack
* **Framework**: Next.js 15 (App Router)
* **Database & Auth**: Supabase (PostgreSQL)
* **Styling**: Tailwind CSS (with CSS Modules for complex effects)
* **Deployment**: Vercel

## 🧩 Challenges & Solutions

During development, I encountered several technical challenges. Here is how I solved them:

### 1. Infinite Redirect Loop (Middleware)
* **Problem**: The application got stuck in an infinite loop (`ERR_TOO_MANY_REDIRECTS`) because the middleware kept redirecting unauthenticated users to `/login`, even when they were already *on* the login page.
* **Solution**: I updated `middleware.ts` to explicitly exclude public routes. I added a check: `if (!user && !isLoginPage && !isAuthPage)` to ensure redirects only happen when trying to access protected pages.

### 2. Real-time Connection Instability
* **Problem**: The Realtime feature was inconsistent. Opening multiple tabs caused connections to drop, or updates wouldn't show up.
* **Solution**: I discovered that `createClient()` was creating a new Supabase connection on every render. I implemented a **Singleton Pattern** in `utils/supabase/client.ts` to ensure the app shares a single connection instance across components. I also fixed the `useEffect` dependency array in `BookmarkList.tsx` to `[]` so it subscribes only once.

### 3. Hydration Mismatch Errors
* **Problem**: Browser extensions (like Grammarly) were injecting attributes into the HTML `<body>`, causing React to throw "Hydration failed" errors because the server-rendered HTML didn't match the browser's HTML.
* **Solution**: I added the `suppressHydrationWarning` prop to the `<html>` and `<body>` tags in `app/layout.tsx`, instructing React to ignore these external attributes.

### 4. Project Structure Conflicts
* **Problem**: I initially had duplicate `page.tsx` files and a nested `layout.tsx` inside the login route, which caused 404 errors and build failures.
* **Solution**: I cleaned up the file structure by removing the redundant `app/login/layout.tsx` and ensuring the root `middleware.ts` was correctly placed in the project root, not inside `utils`.

## 📦 Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone [your-github-repo-url]
    cd smart-bookmark-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run locally**:
    ```bash
    npm run dev
    ```

## 🚀 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  Add the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the Vercel Project Settings > Environment Variables.
4.  Deploy!

## 👨‍💻 About Me

I am **Abdul Azeem Sheikh**, an Information Science graduate skilled in Data Science, Machine Learning, and Full Stack Web Development. I am passionate about building efficient, real-time applications and solving complex technical challenges.

🌐 **Portfolio:** [https://azeemsheikh.vercel.app/]
📧 **Email:** [abdulazeemsheik4@gmail.com]