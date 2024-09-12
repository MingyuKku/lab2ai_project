module.exports = {
  css : {
    loaderOptions : {
      sass : {
        additionalData: `
          @import "@/views/css/global.scss";
        `
      }
    }
  }
}