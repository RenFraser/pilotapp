module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
  ignores: ["/.expo", "node_modules"],
};
