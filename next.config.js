/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  i18n,
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: ['localhost' , 'newsite.spirit.com.kw'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_API_URL
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
