'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaTwitter, FaTelegram } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((m) => m.WalletMultiButton),
  { ssr: false }
)

export const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/15 bg-white/5">
              <Image
                src="/logo.png"
                alt="Kitsu Inu"
                fill
                sizes="44px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <div className="text-base font-semibold leading-tight">Kitsu Inu</div>
              <div className="text-xs text-white/60 leading-tight">Token Creator</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white/70 hover:text-white transition text-sm font-medium">
              Home
            </Link>
            <a href="#features" className="text-white/70 hover:text-white transition text-sm font-medium">
              Features
            </a>
            <Link href="/gallery" className="text-white/70 hover:text-white transition text-sm font-medium">
              Gallery
            </Link>
            <a href="#how-it-works" className="text-white/70 hover:text-white transition text-sm font-medium">
              How it works
            </a>
          </nav>

          {/* Social Links & Wallet */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <a 
                href="https://twitter.com/kitsu_inu_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition"
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="https://t.me/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition"
              >
                <FaTelegram size={20} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition"
              >
                <FaGithub size={20} />
              </a>
            </div>
            
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </motion.header>
  )
}


