'use client'

import { motion } from 'framer-motion'
import { 
  FaRocket, 
  FaShieldAlt, 
  FaClock, 
  FaCoins, 
  FaPalette, 
  FaCode,
  FaNetworkWired,
  FaChartLine 
} from 'react-icons/fa'

const features = [
  {
    icon: <FaRocket />,
    title: 'Fast Launch',
    description: 'Create token in 2 minutes. No complex settings or long waiting.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Secure',
    description: 'Your keys stay in your wallet. We never store private data.',
  },
  {
    icon: <FaClock />,
    title: 'Instant',
    description: 'Token created directly through your wallet. No delays.',
  },
  {
    icon: <FaCoins />,
    title: 'Affordable',
    description: 'Only ~0.1 SOL to create token. No hidden fees.',
  },
  {
    icon: <FaPalette />,
    title: 'Full Customization',
    description: 'Name, symbol, image, description, socials - everything customizable.',
  },
  {
    icon: <FaCode />,
    title: 'No Code',
    description: 'Simple interface. No programming experience or CLI needed.',
  },
  {
    icon: <FaNetworkWired />,
    title: 'Metaplex Standard',
    description: 'Compatible with all DEXs, wallets and aggregators.',
  },
  {
    icon: <FaChartLine />,
    title: 'Listing Ready',
    description: 'Automatically displayed on Solscan, Jupiter, Raydium.',
  },
]

export const Features = () => {
  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-6xl mb-6">⚡💪🔥</div>
          <h2 className="text-5xl md:text-6xl font-black mb-4 neon-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            WHY WE'RE <span className="gradient-text">THE BEST</span>?
          </h2>
          <p className="text-2xl font-bold max-w-3xl mx-auto text-white">
            Creating tokens like it's 2024, not the stone age 😎
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group"
            >
              <div className="text-4xl mb-4 text-[#FFD700] group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


