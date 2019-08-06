module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "public/sw-10.js"
    }
  }
};
