// vue.config.js
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const isLib = process.env.TYPE === 'lib';
module.exports = {
  chainWebpack(config) {
    if (!isLib) {
      config.plugin('monaco').use(new MonacoWebpackPlugin());
    }
  },
};
