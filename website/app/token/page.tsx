'use client'

import { motion } from 'framer-motion'
import { FaRocket, FaChartLine, FaCoins, FaUsers, FaFire, FaShieldAlt } from 'react-icons/fa'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function TokenPage() {
  const tokenomics = [
    { label: 'Liquidity Pool (Locked 1 Year)', percent: 55, color: '#FFD700', locked: true },
    { label: 'Marketing Budget', percent: 20, color: '#FFF4CC', locked: false },
    { label: 'Community Airdrops & Rewards', percent: 12, color: '#4A90E2', locked: false },
    { label: 'Platform Development', percent: 8, color: '#B8860B', locked: false },
    { label: 'Initial Burn', percent: 5, color: '#FF6B6B', locked: true },
  ]

  const roadmap = [
    {
      phase: 'Phase 1: Launch',
      quarter: 'Q1 2025',
      items: [
        '✅ Token Creation Platform Launch',
        '✅ KITS Token Launch on Solana',
        '🔄 Liquidity Pool on Raydium',
        '🔄 CoinGecko & CoinMarketCap Listing',
        '📅 1000+ Holders Target',
      ],
    },
    {
      phase: 'Phase 2: Growth',
      quarter: 'Q2 2025',
      items: [
        '📅 DEX Aggregator Integration (Jupiter)',
        '📅 NFT Collection Launch',
        '📅 Staking Platform',
        '📅 10,000+ Holders',
        '📅 Major CEX Listing',
      ],
    },
    {
      phase: 'Phase 3: Expansion',
      quarter: 'Q3 2025',
      items: [
        '📅 Cross-chain Bridge',
        '📅 Mobile App',
        '📅 DAO Governance',
        '📅 50,000+ Holders',
        '📅 Strategic Partnerships',
      ],
    },
    {
      phase: 'Phase 4: Ecosystem',
      quarter: 'Q4 2025',
      items: [
        '📅 Kitsu Swap DEX',
        '📅 Launchpad for New Projects',
        '📅 100,000+ Holders',
        '📅 Major Exchange Listings',
        '📅 Metaverse Integration',
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-dark-bg text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#FFD700]/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-[#4A90E2]/8 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <img 
              src="/logo.png" 
              alt="Kitsu Inu"
              className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-[#FFD700] shadow-lg shadow-[#FFD700]/50"
            />
            <h1 className="text-6xl md:text-8xl font-black mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              KITSU INU
            </h1>
            <p className="text-3xl font-bold text-[#FFD700] mb-6">$KITS</p>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              The first community-driven token creation platform on Solana. 
              Create, launch, and grow your memecoin in minutes. No coding required.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <a 
              href="#buy"
              className="btn-primary text-lg px-10 py-4"
            >
              💰 Buy $KITS
            </a>
            <a 
              href="#tokenomics"
              className="btn-secondary text-lg px-10 py-4"
            >
              📊 Tokenomics
            </a>
            <a 
              href="#roadmap"
              className="btn-secondary text-lg px-10 py-4"
            >
              🗺️ Roadmap
            </a>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <FaCoins />, value: '1T', label: 'Total Supply' },
              { icon: <FaFire />, value: '5%', label: 'Burned' },
              { icon: <FaShieldAlt />, value: '55%', label: 'Liquidity Locked' },
              { icon: <FaUsers />, value: '0%', label: 'Tax' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="cyber-border rounded-2xl p-6"
              >
                <div className="text-4xl text-[#FFD700] mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics */}
      <section id="tokenomics" className="py-20 px-4 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <span className="text-[#FFD700]">TOKENOMICS</span>
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              55% Liquidity Locked. Community first. Maximum transparency.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/30">
              <FaShieldAlt className="text-green-400" />
              <span className="text-green-400 font-bold">Unruggable Design</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Pie Chart Visual */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto relative">
                {/* Simplified pie chart representation */}
                <div className="absolute inset-0 rounded-full border-8 border-[#FFD700] shadow-lg shadow-[#FFD700]/30"></div>
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-[#4A90E2]/10 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-black text-[#FFD700]">1T</div>
                    <div className="text-2xl font-bold">Total Supply</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Distribution */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {tokenomics.map((item, i) => (
                <div key={i} className="card">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{item.label}</span>
                      {item.locked && (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                          🔒 LOCKED
                        </span>
                      )}
                    </div>
                    <span className="text-2xl font-black" style={{ color: item.color }}>
                      {item.percent}%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${item.percent}%`,
                        backgroundColor: item.color 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
              
              {/* Key Features */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20">
                <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                  <FaShieldAlt /> Security Features
                </h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>✅ 55% Liquidity Locked for 1 Year (Streamflow)</li>
                  <li>✅ 5% Supply Permanently Burned</li>
                  <li>✅ 0% Buy/Sell Tax - Fair for Everyone</li>
                  <li>✅ No Team Allocation - Community First</li>
                  <li>✅ Renounced Mint Authority - Fixed Supply</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <span className="text-[#FFD700]">ROADMAP</span>
            </h2>
            <p className="text-xl text-gray-300">
              Our journey to the moon 🚀
            </p>
          </motion.div>

          <div className="space-y-8">
            {roadmap.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFF4CC] flex items-center justify-center text-2xl font-black text-black">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{phase.phase}</h3>
                    <p className="text-[#FFD700] font-bold mb-4">{phase.quarter}</p>
                    <ul className="space-y-2">
                      {phase.items.map((item, j) => (
                        <li key={j} className="text-gray-300">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Buy */}
      <section id="buy" className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              HOW TO <span className="text-[#FFD700]">BUY</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { step: '1', title: 'Get Phantom Wallet', desc: 'Download from phantom.app' },
              { step: '2', title: 'Buy SOL', desc: 'Purchase SOL on any exchange' },
              { step: '3', title: 'Swap for $KITS', desc: 'Use Raydium or Jupiter' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card text-center"
              >
                <div className="text-5xl font-black text-[#FFD700] mb-4">{step.step}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://raydium.io"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-10 py-4"
            >
              Buy on Raydium
            </a>
            <a 
              href="https://jup.ag"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-10 py-4"
            >
              Buy on Jupiter
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="cyber-border rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/5 via-white/3 to-[#4A90E2]/5"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-4">JOIN THE REVOLUTION</h2>
              <p className="text-xl text-gray-300 mb-8">
                Be part of the future of token creation on Solana
              </p>
              <a href="/" className="btn-primary text-lg px-10 py-4">
                Create Your Token Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

