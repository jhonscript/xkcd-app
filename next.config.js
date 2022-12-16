/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["imgs.xkcd.com"],
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "es",
  },
};

module.exports = nextConfig;
