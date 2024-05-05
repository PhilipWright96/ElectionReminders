import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  {
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    rules: {
      // Rule disabled because we have typescript which essentially does the same thing
      "react/prop-types": "off",
      // Rule disabled because the React variable must be in scope already - otherwise the app wouldn't start
      "react/react-in-jsx-scope": "off"
    }
  }
];