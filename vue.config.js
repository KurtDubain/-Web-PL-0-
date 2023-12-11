const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
      },
    },
  },
  transpileDependencies: true
})
