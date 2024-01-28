/** @type {import('tailwindcss').Config}*/

const skeleton = require("@skeletonlabs/tw-plugin");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  plugins: [skeleton],
};

module.exports = config;
