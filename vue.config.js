const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass"),
      },
    },
  },
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        // target: "http://www.dyp02.vip:3001",
        // target: "http://localhost:3001",
        target: "https://www.dyp02.vip:8443",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
