'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const images = [
  '/images/hero/hero-1.png',
  '/images/hero/hero-2.png',
  '/images/hero/hero-3.png',
  '/images/hero/hero-4.png',
  '/images/hero/hero-5.png',
  '/images/hero/hero-6.png',
  '/images/hero/hero-7.png',
  '/images/hero/hero-8.png',
  '/images/hero/hero-9.png',
  '/images/hero/hero-10.png',
  '/images/hero/hero-11.png',
  '/images/hero/hero-12.png',
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-black mb-4 neon-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              KITSU INU <span className="gradient-text">GALLERY</span>
            </h1>
            <p className="text-xl text-gray-400">
              Choose your favorite mascot for the token creator
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(image)}
                className="card cursor-pointer group"
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-900 relative">
                  <Image 
                    src={image}
                    alt={`Kitsu Inu ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    quality={85}
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm font-bold text-[#FFD700]">Option {index + 1}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl w-full"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-[#FFD700] transition"
            >
              ×
            </button>
            <div className="relative w-full aspect-square">
              <Image 
                src={selectedImage}
                alt="Selected"
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain rounded-2xl"
                quality={95}
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </main>
  )
}


