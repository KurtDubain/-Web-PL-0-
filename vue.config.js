const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
      },
    },
  },
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://www.dyp02.vip:3001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
