import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import { WalletProvider } from '@/components/WalletProvider'
import { Toaster } from 'react-hot-toast'
import { StructuredData } from './structured-data'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kitsuinu.com'),
  title: {
    default: 'Kitsu Inu | Create Solana Tokens in 60 Seconds - No Code Required',
    template: '%s | Kitsu Inu Token Creator',
  },
  description: 'Launch your own Solana SPL token in minutes. Professional token creation platform with automatic metadata, IPFS integration, and instant deployment. Create memecoins, utility tokens, or NFT projects on Solana blockchain.',
  keywords: [
    'Solana token creator',
    'create SPL token',
    'Solana memecoin',
    'no code token',
    'SPL token generator',
    'Solana blockchain',
    'crypto token maker',
    'DeFi tools',
    'web3 token creator',
    'Kitsu Inu',
    'KITS token',
    'Raydium',
    'Jupiter',
    'token launch platform',
  ],
  authors: [{ name: 'Kitsu Inu Team' }],
  creator: 'Kitsu Inu',
  publisher: 'Kitsu Inu',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kitsuinu.com',
    siteName: 'Kitsu Inu Token Creator',
    title: 'Create Solana Tokens in 60 Seconds - Kitsu Inu',
    description: 'Professional Solana token creation platform. Launch SPL tokens with metadata, IPFS, and instant deployment. No coding required.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kitsu Inu - Solana Token Creator Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@kitsu_inu_',
    creator: '@kitsu_inu_',
    title: 'Create Solana Tokens in 60 Seconds | Kitsu Inu',
    description: 'Launch your own Solana SPL token with metadata and IPFS. No code required. Professional platform for memecoin creators.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes later:
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
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

