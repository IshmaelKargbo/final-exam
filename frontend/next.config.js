/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    backendUrl: process.env.BASE_URL,
  }
}

module.exports = nextConfig
