/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  i18n,
  
  reactStrictMode: true,
  env: {
    // API_URL: "https://multikart-graphql-reactpixelstrap.vercel.app/server.js",
    API_URL: "http://96.30.193.192/",
  },
  images: {
    formats: ['image/webp' , 'image/avif'],
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

    return config;
  },
}

module.exports = nextConfig
