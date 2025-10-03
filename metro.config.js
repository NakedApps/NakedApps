const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Exclude electron-app directory from Metro bundler
config.resolver.blockList = [/electron-app\/.*/];

module.exports = config;