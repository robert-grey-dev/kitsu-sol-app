'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaInfoCircle } from 'react-icons/fa'

export const PhantomWarningBanner = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-20 left-0 right-0 z-40 px-4"
      >
        <div className="max-w-4xl mx-auto bg-[#FFD700]/20 backdrop-blur-xl border border-[#FFD700]/30 rounded-xl p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <FaInfoCircle className="text-[#FFD700] text-xl flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-white mb-1">Phantom Wallet Security Notice</h3>
              <p className="text-sm text-gray-300">
                If Phantom shows a security warning, click <strong>"Continue anyway"</strong> at the bottom. 
                Our dApp is safe and currently pending verification. This is a standard security measure for new domains.
              </p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/70 hover:text-white transition flex-shrink-0"
              aria-label="Close banner"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
