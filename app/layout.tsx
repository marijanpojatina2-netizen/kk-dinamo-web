import React from 'react';
import type { Metadata } from 'next'
import { Inter, Antonio } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const antonio = Antonio({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-antonio',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KK Dinamo Zagreb',
  description: 'Službena web stranica košarkaškog kluba Dinamo Zagreb.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hr">
      <body className={`${inter.variable} ${antonio.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}