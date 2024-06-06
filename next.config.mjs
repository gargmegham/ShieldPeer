/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "community.cloudflare.steamstatic.com",
            },
        ],
    },
    reactStrictMode: false,
    swcMinify: true,
}

export default nextConfig
