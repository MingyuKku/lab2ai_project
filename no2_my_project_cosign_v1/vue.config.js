module.exports = {
  css: {
    loaderOptions : {
      sass : {
        additionalData: `
          @import "@/views/css/global.scss";
        `
      }
    },
    extract: {
      filename: require("./package.json").version + ".css"
    }
  },
  configureWebpack: {
    output: {
      filename: require("./package.json").version + '.min.js'
    },
    optimization: {
      splitChunks: false
    }
  }
}