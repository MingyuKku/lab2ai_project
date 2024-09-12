export default function( {app},inject ) {
  inject('isOpenSign', (pay) => {
    const isLogin = app.$cookies.get('acc') !== undefined;

    if(isLogin) {
      return true;

    } else {
      
      if(pay) {
        return false;
      } else return true;
    }
  })
}