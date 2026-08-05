import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/all"],
    languageOptions: { globals: globals.browser },
    rules: {
      "no-alert": "off",
      "no-console": "warn",
      "sort-keys": "off",
      "sort-imports": "off",
      "one-var": "off",
      "no-ternary": "off",
      "capitalized-comments": "off",
      "class-methods-use-this": "warn"
    },
   },
]);