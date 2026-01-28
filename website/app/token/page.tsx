'use client'

import { motion } from 'framer-motion'
import { FaRocket, FaChartLine, FaCoins, FaUsers, FaFire, FaShieldAlt } from 'react-icons/fa'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function TokenPage() {
  return (
    <main className="min-h-screen bg-dark-bg text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20 px-4">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg to-gray-900/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FFD700]/5 blur-3xl animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#4A90E2]/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#FFD700]/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Logo with glow effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative inline-block mb-8"
          >
            <div className="absolute inset-0 rounded-full bg-[#FFD700]/30 blur-3xl animate-pulse scale-150" />
            <div className="relative w-40 h-40 md:w-56 md:h-56 mx-auto rounded-full border-4 border-[#FFD700] shadow-2xl shadow-[#FFD700]/50 hover:scale-105 transition-transform duration-500 overflow-hidden">
              <Image 
                src="/logo.png" 
                alt="Kitsu Inu"
                fill
                sizes="(max-width: 768px) 160px, 224px"
                className="object-cover"
                priority
                quality={95}
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            <span className="bg-gradient-to-r from-[#FFD700] via-[#FFF4CC] to-[#FFD700] bg-clip-text text-transparent">
              KITSU INU
            </span>
          </motion.h1>

          {/* Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 cyber-border rounded-full px-6 py-3 mb-6 hover:scale-105 transition-transform cursor-pointer"
          >
            <span className="text-gray-400 text-sm">CA:</span>
            <span className="text-[#FFD700] font-bold text-lg tracking-wide">$KITS</span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed"
          >
            The <span className="text-[#FFD700] font-bold">purrfect</span> meme coin launched on Pump.fun.
            <br className="hidden sm:block" />
            No promises — just <span className="text-[#4A90E2] font-semibold">vibes</span> and community power.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="https://pump.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 relative overflow-hidden group w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FaRocket className="group-hover:rotate-12 transition-transform" />
                Buy on Pump.fun
              </span>
            </a>
            <a 
              href="#buy"
              className="btn-secondary text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 w-full sm:w-auto hover:scale-105 transition-transform"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </section>

      {/* How to Buy */}
      <section id="buy" className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent" />
        
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-[#FFD700] font-bold uppercase tracking-widest text-sm mb-4 cyber-border px-4 py-2 rounded-full">
              Simple Steps
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              HOW TO <span className="bg-gradient-to-r from-[#FFD700] to-[#FFF4CC] bg-clip-text text-transparent">BUY</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Get your $KITS in 3 easy steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { step: '1', title: 'Get Phantom Wallet', desc: 'Download from phantom.app', icon: '👛' },
              { step: '2', title: 'Buy SOL', desc: 'Purchase SOL on any exchange', icon: '💰' },
              { step: '3', title: 'Swap for $KITS', desc: 'Use Pump.fun, Raydium or Jupiter', icon: '🔄' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative group"
              >
                <div className="cyber-border rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 h-full">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FFD700]/5 to-[#4A90E2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="text-6xl mb-4">{step.icon}</div>
                    <div className="text-4xl font-black text-[#FFD700] mb-4">{step.step}</div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a 
              href="https://pump.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 relative overflow-hidden group w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                🚀 Buy on Pump.fun
              </span>
            </a>
            <a 
              href="https://raydium.io"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 hover:scale-105 transition-transform w-full sm:w-auto"
            >
              Buy on Raydium
            </a>
            <a 
              href="https://jup.ag"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 hover:scale-105 transition-transform w-full sm:w-auto"
            >
              Buy on Jupiter
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFD700]/10 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="cyber-border rounded-3xl p-12 md:p-16 text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 via-transparent to-[#4A90E2]/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  JOIN THE <span className="bg-gradient-to-r from-[#FFD700] to-[#FFF4CC] bg-clip-text text-transparent">PACK</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                  Launched on <span className="text-[#FFD700] font-bold">Pump.fun</span> - The hottest memecoin on Solana!
                  <br className="hidden sm:block" />
                  No roadmap, no promises. Just pure <span className="text-[#4A90E2] font-semibold">community vibes</span>.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a 
                    href="https://pump.fun" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 relative overflow-hidden group/btn w-full sm:w-auto"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <FaRocket className="group-hover/btn:rotate-12 transition-transform" />
                      Trade Now
                    </span>
                  </a>
                  <a 
                    href="https://twitter.com/kitsu_inu_" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-secondary text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 hover:scale-105 transition-transform w-full sm:w-auto"
                  >
                    Follow on X
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

