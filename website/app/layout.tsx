import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import { WalletProvider } from '@/components/WalletProvider'
import { Toaster } from 'react-hot-toast'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Kitsu Inu - Solana Token Creator',
  description: 'Создайте свой SPL токен на Solana за 7 простых шагов. Без кода, без опыта программирования.',
  keywords: 'Solana, Token Creator, SPL Token, Crypto, Meme Coin, Kitsu Inu',
  openGraph: {
    title: 'Kitsu Inu - Solana Token Creator',
    description: 'Создайте свой токен на Solana за минуты',
    url: 'https://kitsuinu.com',
    siteName: 'Kitsu Inu',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kitsu Inu - Solana Token Creator',
    description: 'Создайте свой токен на Solana за минуты',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={spaceGrotesk.className}>
        <WalletProvider>
          {children}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: '#1f2937',
                color: '#fff',
                borderRadius: '12px',
              },
              success: {
                iconTheme: {
                  primary: '#14F195',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#f43f5e',
                  secondary: '#fff',
                },
              },
            }}
          />
        </WalletProvider>
      </body>
    </html>
  )
}

