'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TokenCreator } from '@/components/TokenCreator'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Features } from '@/components/Features'
import { HowItWorks } from '@/components/HowItWorks'
import { ImageSlider } from '@/components/ImageSlider'

export default function Home() {
  const [showCreator, setShowCreator] = useState(false)

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#FFD700]/10 rounded-full blur-[120px] animate-float"></div>
          <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-[#4A90E2]/8 rounded-full blur-[120px] animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <span className="inline-block px-6 py-2 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full text-sm font-bold uppercase tracking-wider mb-4 text-[#FFD700]">
                  ⭐ PREMIUM TOKEN CREATOR ⭐
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 neon-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                LAUNCH YOUR{' '}
                <span className="gradient-text">MEMECOIN</span>
              </h1>
              <p className="text-xl md:text-2xl font-bold mb-4 text-white">
                NO CODE. NO SKILLS. JUST CLICK THE BUTTON 🚀
              </p>
              <p className="text-base md:text-lg text-gray-400 mb-8">
                Create tokens like top projects in 2 minutes | 
                Solana blockchain | Devnet + Mainnet | 
                100% secure 🔐
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowCreator(true)}
                  className="btn-primary text-lg px-10 py-4 font-black"
                >
                  🚀 LAUNCH TOKEN
                </button>
                <a 
                  href="#how-it-works"
                  className="btn-secondary text-lg px-10 py-4 font-bold"
                >
                  💡 HOW IT WORKS?
                </a>
              </div>
            </motion.div>

            {/* Right: Hero Image Slider */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <ImageSlider />
            </motion.div>
          </div>

          {/* Stats moved below */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { value: '10K+', label: 'TOKENS CREATED', emoji: '🚀' },
                { value: '2 MIN', label: 'CREATION TIME', emoji: '⚡' },
                { value: '0.1 SOL', label: 'COST', emoji: '💰' },
                { value: '100%', label: 'SECURE', emoji: '🔒' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="cyber-border rounded-2xl p-6 relative group"
                >
                  <div className="text-5xl mb-2">{stat.emoji}</div>
                  <div className="text-4xl font-black gradient-text mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">{stat.label}</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B026FF]/20 to-[#00F5FF]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Token Creator Section */}
      {showCreator && (
        <section className="py-20 px-4" id="creator">
          <div className="max-w-4xl mx-auto">
            <TokenCreator />
          </div>
        </section>
      )}

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="cyber-border rounded-3xl p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/5 via-white/3 to-[#4A90E2]/5 animate-pulse"></div>
            <div className="relative z-10">
              <div className="text-6xl mb-4">🚀💎⭐</div>
              <h2 className="text-5xl font-black mb-4 neon-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                WHAT YOU WAITING FOR?
              </h2>
              <p className="text-2xl font-bold mb-8 text-white">
                Launch your memecoin right now! 💪
              </p>
              <p className="text-gray-400 mb-8">
                Join thousands of creators on Solana | Be first | To the moon! 🌙
              </p>
              <button 
                onClick={() => {
                  setShowCreator(true)
                  document.getElementById('creator')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-primary text-xl px-14 py-5 font-black"
              >
                🔥 LET'S GO! 🔥
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


