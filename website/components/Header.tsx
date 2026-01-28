'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaTwitter, FaBars, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((m) => m.WalletMultiButton),
  { ssr: false }
)

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-0 right-0 z-50 px-4"
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between bg-[#FFD700]/15 backdrop-blur-xl border border-[#FFD700]/20 rounded-xl sm:rounded-2xl px-3 sm:px-6 py-2 sm:py-3">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
          aria-label="Kitsu Inu - Go to homepage"
        >
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#FFD700]/30 group-hover:scale-110 transition-transform duration-300">
            <Image
              src="/logo.png"
              alt="Kitsu Inu"
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </div>
          <span className="text-lg sm:text-xl font-bold">
            <span className="bg-gradient-to-r from-[#FFD700] to-[#FFF4CC] bg-clip-text text-transparent">$KITS</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            href="/" 
            className="text-white/70 hover:text-[#FFD700] font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-2 rounded-lg px-2 py-1"
          >
            Home
          </Link>
          <a 
            href="#features" 
            className="text-white/70 hover:text-[#FFD700] font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-2 rounded-lg px-2 py-1"
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="text-white/70 hover:text-[#FFD700] font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-2 rounded-lg px-2 py-1"
          >
            How it works
          </a>
          <Link 
            href="/token" 
            className="text-white/70 hover:text-[#FFD700] font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-2 rounded-lg px-2 py-1"
          >
            $KITS Token
          </Link>
          <a 
            href="https://twitter.com/kitsu_inu_" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-xl hover:bg-[#FFD700]/10 text-white/70 hover:text-[#FFD700] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]"
            aria-label="Follow us on X (Twitter)"
          >
            <FaTwitter className="w-5 h-5" />
          </a>
          <a 
            href="https://github.com/robert-grey-dev/kitsu-sol-app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-xl hover:bg-[#FFD700]/10 text-white/70 hover:text-[#FFD700] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]"
            aria-label="View on GitHub"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <WalletMultiButton />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-[#FFD700]/10 text-white/70 hover:text-[#FFD700] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-2 bg-[#FFD700]/15 backdrop-blur-xl border border-[#FFD700]/20 rounded-xl p-4 max-w-7xl mx-auto"
          >
            <div className="flex flex-col gap-3">
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/70 hover:text-[#FFD700] font-medium transition-colors px-3 py-2 rounded-lg hover:bg-[#FFD700]/10"
              >
                Home
              </Link>
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/70 hover:text-[#FFD700] font-medium transition-colors px-3 py-2 rounded-lg hover:bg-[#FFD700]/10"
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/70 hover:text-[#FFD700] font-medium transition-colors px-3 py-2 rounded-lg hover:bg-[#FFD700]/10"
              >
                How it works
              </a>
              <Link 
                href="/token" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/70 hover:text-[#FFD700] font-medium transition-colors px-3 py-2 rounded-lg hover:bg-[#FFD700]/10"
              >
                $KITS Token
              </Link>
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <a 
                  href="https://twitter.com/kitsu_inu_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl hover:bg-[#FFD700]/10 text-white/70 hover:text-[#FFD700] transition-all"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/robert-grey-dev/kitsu-sol-app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl hover:bg-[#FFD700]/10 text-white/70 hover:text-[#FFD700] transition-all"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              </div>
              <div className="pt-2">
                <WalletMultiButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}


