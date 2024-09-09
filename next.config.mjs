/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
                pathname: '/**',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'drive.google.com',
                pathname: '/**',
                port: ''
            },
            {
                protocol: 'https',
                hostname: "lucide.dev",
                pathname: '/**',
                port: ''
            },
        ]
    }
};

export default nextConfig;
