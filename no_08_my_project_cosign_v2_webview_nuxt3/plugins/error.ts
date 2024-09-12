export default defineNuxtPlugin((nuxtApp) => {

    nuxtApp.hook("vue:error", (err, instance, info) => {
      console.log('뷰 에러', err, instance, info)
  
      // if (process.client) {
      //   alert(`뷰 에러 ${err}`);
      // }
  
      // showError(err as any)
    });
  
    nuxtApp.hook("app:error", (err) => {
      console.log('앱 에러', err)
      // if (process.client) {
      //   alert(`앱 에러 ${err}`);
      // }
    });
  
    nuxtApp.vueApp.config.errorHandler = (err) => {
      console.log('에러 핸들', err)
  
      // if (process.client) {
      //   alert(`에러 핸들 ${err}`);
      // }
  
      return showError(err as any);
    }
  })
  
  
  