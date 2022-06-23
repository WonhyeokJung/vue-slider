const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: process.env.VUE_APP_PORT || 8080
  },
  // publicPath: process.env.NODE_ENV === 'jamesbond' ? process.env.BASE_URL : '/'
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Vue Slider'
    }
  }
})
