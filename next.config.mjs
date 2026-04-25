/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Frame sequences in /public are served as static assets.
  // We set a long browser cache so the user doesn't refetch them on revisit.
  async headers() {
    return [
      {
        source: "/assets/frames/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
