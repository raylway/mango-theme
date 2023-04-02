/** @type { import("prettier").Config } */
const config = {
  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
    require.resolve("@shopify/prettier-plugin-liquid"),
  ],
  tailwindConfig: "./tailwind.config.ts",
};

module.exports = config;
