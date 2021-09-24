const isProd = process.env.NODE_ENV === "production";

module.exports = {
  reactStrictMode: true,
  distDir: isProd ? `build` : ".next",
};
