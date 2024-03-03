/** @type {import('tailwindcss').Config}*/

const skeleton = require("@skeletonlabs/tw-plugin");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    skeleton.skeleton({
      themes: { preset: ["skeleton", "modern", "vintage"] },
    }),
  ],
};

module.exports = config;
