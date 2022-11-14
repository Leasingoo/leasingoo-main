/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  ...nextConfig,
  // env: {
  //   API_KEY: process.env.API_KEY,
  //   AUTH_DOMAIN: process.env.AUTH_DOMAIN,
  //   PROJECT_ID: process.env.PROJECT_ID,
  //   STORAGE_BUCKET: process.env.STORAGE_BUCKET,
  //   MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
  //   APP_ID: process.env.APP_ID,
  //   MEASUREMENT_ID: process.env.MEASUREMENT_ID,
  //   URL: process.env.URL,
  //   ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  //   ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  // },
};
