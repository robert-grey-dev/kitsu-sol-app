'use client'

import { FaTwitter, FaTelegram, FaDiscord, FaGithub } from 'react-icons/fa'
import Image from 'next/image'

export const Footer = () => {
  return (
    <footer className="border-t border-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/15 bg-white/5">
                <Image
                  src="/logo.png"
                  alt="Kitsu Inu"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold gradient-text">Kitsu Inu</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Create tokens on Solana in minutes. Simple, secure and professional tool.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Examples
                </a>
              </li>
              <li>
                <a href="https://docs.solana.com" target="_blank" className="text-gray-400 hover:text-white transition">
                  Solana Docs
                </a>
              </li>
              <li>
                <a href="https://raydium.io" target="_blank" className="text-gray-400 hover:text-white transition">
                  Raydium
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Socials</h4>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com/kitsu_inu_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-solana-purple transition"
              >
                <FaTwitter />
              </a>
              <a 
                href="https://github.com/robert-grey-dev/kitsu-sol-app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-solana-purple transition"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Kitsu Inu. All rights reserved.</p>
          <p className="mt-2">
            Made with ❤️ for Solana community
          </p>
        </div>
      </div>
    </footer>
  )
}


