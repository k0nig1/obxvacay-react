import { defineConfig } from "cypress";

module.exports.defineConfig({
  e2e: {
    baseUrl: "http://localhost:8100",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
