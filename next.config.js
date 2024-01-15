const isProd = process.env.NODE_ENV === "production";

module.exports = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
};
