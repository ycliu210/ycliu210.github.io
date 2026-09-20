/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export -> ./out, which the GitHub Actions workflow publishes to GitHub Pages.
  output: "export",
  // GitHub Pages serves folders, so /post/foo must become /post/foo/index.html.
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

module.exports = nextConfig;
