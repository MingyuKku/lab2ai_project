module.exports = {
  css : {
    loaderOptions : {
      sass : {
        additionalData: `
          @import "@/views/css/global.scss";
        `
      }
    }
  },
  configureWebpack: config => {
    if(process.env.NODE_ENV !== 'local') {
      config.output.filename = 'js/[name].[contenthash:8].min.js'
      config.output.chunkFilename = 'js/[name].[contenthash:8].min.js'
    }
  }
}