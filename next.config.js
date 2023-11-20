/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  i18n,
  reactStrictMode: true,
  images: {
    formats: ['image/webp' , 'image/avif'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '96.30.193.192',
      },
    ],
  },
  
  webpack(config, options) {
    
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
      
    });
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };
    config.resolve.fallback = { fs: false };
    config.infrastructureLogging = { debug: /PackFileCache/ }; 
    return config;
  },
}

module.exports = nextConfig
