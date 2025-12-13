'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const images = [
  '/images/hero/Gemini_Generated_Image_6zk14v6zk14v6zk1.png',
  '/images/hero/Gemini_Generated_Image_embf56embf56embf.png',
  '/images/hero/Gemini_Generated_Image_9e9jl49e9jl49e9j.png',
  '/images/hero/Gemini_Generated_Image_g9j29pg9j29pg9j2.png',
  '/images/hero/Gemini_Generated_Image_mie2snmie2snmie2.png',
  '/images/hero/Gemini_Generated_Image_5ffvio5ffvio5ffv.png',
  '/images/hero/Gemini_Generated_Image_rbomsbrbomsbrbom.png',
  '/images/hero/Gemini_Generated_Image_wx5cz6wx5cz6wx5c.png',
  '/images/hero/Gemini_Generated_Image_y9h0wby9h0wby9h0.png',
  '/images/hero/Gemini_Generated_Image_fbg2r6fbg2r6fbg2.png',
  '/images/hero/Gemini_Generated_Image_tzlsnwtzlsnwtzls.png',
  '/images/hero/Gemini_Generated_Image_1oq8w41oq8w41oq8.png',
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
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-900">
                  <img 
                    src={image}
                    alt={`Kitsu Inu ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
            <img 
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto rounded-2xl"
            />
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </main>
  )
}


