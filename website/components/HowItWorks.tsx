'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '1',
    title: 'Connect Wallet',
    description: 'Click "Connect Wallet" and choose Phantom or Solflare',
    icon: '👛',
  },
  {
    number: '2',
    title: 'Fill Parameters',
    description: 'Enter name, symbol, decimals and supply of your token',
    icon: '📝',
  },
  {
    number: '3',
    title: 'Upload Image',
    description: 'Choose your token logo (automatically uploads to IPFS)',
    icon: '🖼️',
  },
  {
    number: '4',
    title: 'Add Metadata',
    description: 'Description, socials, website - everything for token promotion',
    icon: '🔗',
  },
  {
    number: '5',
    title: 'Check Data',
    description: 'Make sure everything is correct. Cannot change after creation',
    icon: '✅',
  },
  {
    number: '6',
    title: 'Create Token',
    description: 'Click button and sign transaction in your wallet',
    icon: '🚀',
  },
  {
    number: '7',
    title: 'Done!',
    description: 'Token created! Now add liquidity on Raydium/Orca',
    icon: '🎉',
  },
]

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-gradient-to-b from-transparent to-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-6xl mb-6">🎯🚀💎</div>
          <h2 className="text-5xl md:text-6xl font-black mb-4 neon-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            HOW IT <span className="gradient-text">WORKS</span>?
          </h2>
          <p className="text-2xl font-bold max-w-3xl mx-auto text-white">
            7 steps and you own your token ⭐
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FFD700] via-[#FFF4CC] to-[#B8860B] transform -translate-x-1/2 opacity-30"></div>

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="card inline-block">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>

                {/* Number */}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFF4CC] flex items-center justify-center text-2xl font-bold shadow-lg shadow-[#FFD700]/30 text-black">
                    {step.number}
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">💡 Pro Tip</h3>
            <p className="text-gray-300">
              After creating token don't forget to:
            </p>
            <ul className="text-left mt-4 space-y-2 text-gray-400">
              <li>✅ Create liquidity pool on Raydium or Orca</li>
              <li>✅ Lock LP tokens (burn/lock)</li>
              <li>✅ Apply for CoinGecko and CoinMarketCap</li>
              <li>✅ Start marketing on Twitter and Telegram</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


