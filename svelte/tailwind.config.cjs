/** @type {import('tailwindcss').Config}*/

const skeleton = require("@skeletonlabs/tw-plugin");
const forms = require("@tailwindcss/forms");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  plugins: [skeleton, forms],
};

module.exports = config;
