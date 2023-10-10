"use client"
import Navbar from '../components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Suspense } from 'react'

import { auth } from './firebase'
import Loading from './loading'
import { useAuthState } from "react-firebase-hooks/auth";
import LoginPage from './login/page'
const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  const [user] = useAuthState(auth)
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        {!user ? <LoginPage />
          :
          <Providers>
            <Navbar />
            <Suspense
              fallback={<Loading />}>
              {children}
            </Suspense>
          </Providers>
        }
      </body>
    </html>
  )
}
