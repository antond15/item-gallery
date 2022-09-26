/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['raw.githubusercontent.com', 'i.imgur.com'],
  },
  eslint: {
    dirs: ['components', 'interfaces', 'pages', 'theme', 'utils'],
  }
}
