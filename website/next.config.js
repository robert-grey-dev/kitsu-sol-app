/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // Игнорируем optional зависимости
    config.externals.push('pino-pretty', 'encoding');
    
    return config;
  },
}

module.exports = nextConfig

