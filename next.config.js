/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'ar-KW', 'tr-TR'],
    defaultLocale: 'en-US',
  },

  env: {
    API_URL: "https://multikart-graphql-reactpixelstrap.vercel.app/server.js",
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
