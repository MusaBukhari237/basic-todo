import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Basic Todo App',
  description: 'Developed by Musa Bukhari',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}
