export default function(context) {
  const baseUrl = context.$axios.defaults.baseURL;

  if(context.$device.isMobile) {
    if(baseUrl.includes("//api")) {
      const url = "https://m.cosign.cc" + context.route.fullPath;
      console.log("redirect", url);

      return context.redirect(url);
    } else if(baseUrl.includes("//dev")) {
      const url = "https://dev-mobile.cosign.cc" + context.route.fullPath;
      console.log("redirect", url);

      return context.redirect(url);
    } else if(baseUrl.includes("//qa")) {
      const url = "https://qa-mobile.cosign.cc" + context.route.fullPath;
      console.log("redirect", url);

      return context.redirect(url);
    }
  }
}