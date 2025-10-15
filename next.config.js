/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/my-blog',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
