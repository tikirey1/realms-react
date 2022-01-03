/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")([
  "@babylonjs/core",
  "@babylonjs/gui",
  "@babylonjs/loaders",
  "@babylonjs/procedural-textures",
  "react-babylonjs",
]);

module.exports = withTM();
