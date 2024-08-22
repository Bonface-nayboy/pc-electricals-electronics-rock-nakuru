/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'www.bing.com',
              pathname: '/**',
          },
          {
              protocol: 'https',
              hostname: 'th.bing.com',
              pathname: '/**',
          },
      ],
  },
};

export default nextConfig;
