// import VueJwtDecode from 'vue-jwt-decode'

const customAxios = ({$axios, app, env}, inject) => {
  // =====================================
  // user관련 API = localhost:21000 사용
  // =====================================
  const local21000Api = $axios.create();

  const baseUrl = env.AUTH_API_URL !== undefined? env.AUTH_API_URL: "http://localhost:21000";

  local21000Api.setBaseURL(baseUrl)

  inject('local21000Api', local21000Api)


  // =====================================
  // user관련 API = localhost:21000 사용 + 인터셉터 적용
  // =====================================
  const userIntApi = $axios.create();

  // userIntApi.interceptors.response.use(
  //   async (response) => {
  //       console.log('인터셉터응답', response.data)
  //       if(response.data.error && response.data.error.errorCode === '101') {
  //         const res = await local21000Api.post('/api/user/token/refresh', {}, {withCredentials: true})
  //         console.log('인터셉터 리프레시응답', res.data)

  //         if(!res.data.error) { //리프레시 응답이 정상일때(acc,rcc를 정상발급받았을때) -> api를 새로 호출
  //           return await intApi(response.config);
  //         } else return response;
          
  //       } else {
  //         return response;
  //       }

  //       // return response
  //   },
  //   (err) => {
  //     return Promise.reject(err);
  //   }
  // )

  userIntApi.setBaseURL(baseUrl)

  inject('userIntApi', userIntApi)


  // =========================================
  // acc를 해더로 보내는 API => 인터셉터가 필요
  // =========================================
  const intApi = $axios.create();

  // intApi.interceptors.response.use(
  //   async (response) => {
  //       console.log('인터셉터응답', response.data)
        
  //       if(response.data.error && response.data.error.errorCode === '101') {
  //         const res = await local21000Api.post('/api/user/token/refresh', {}, {withCredentials: true})
  //         console.log('인터셉터 리프레시응답', res.data)

  //         if(!res.data.error) { //리프레시 응답이 정상일때(acc,rcc를 정상발급받았을때) -> api를 새로 호출
  //           return await intApi(response.config);
  //         } else return response;
          
  //       } else {
  //         return response;
  //       }

  //       // return response
  //   },
  //   (err) => {
  //     return Promise.reject(err);
  //   }
  // )

  intApi.interceptors.request.use(
    async (config) => {

      let acc = app.$cookies.get('acc');
        
      // if(acc !== undefined) {
      //   const exp = VueJwtDecode.decode(acc).exp * 1000; // acc 쿠키 만료일
      //   const now = new Date().valueOf();
      //   let remainMinTime = (exp - now) / (1000 * 60); // acc 쿠키 만료일을 분으로 환산

      //   console.log('acc 남은시간', remainMinTime, process.server)
        
      //   try {

      //     if(remainMinTime <= 1439.8) {  // acc 토큰의 만료시간이 60분 이하일 때 리프레시 실행

      //       const res = await local21000Api.post('/api/user/token/refresh', {}, {withCredentials: true})
      //       console.log('리프레시 응답', res.data, res.headers['set-cookie'])

      //       if(app.$res_inspect(res, 'inspect')) {

      //         if(process.server) {
      //           console.log('서버단에서 쿠키셋팅재료',res.headers['set-cookie'])

      //           function extractCookie(idx) {
      //             const header = res.headers['set-cookie'][idx]
      //             const start = header.indexOf('=')
      //             const end = header.indexOf(';')
      //             const cookie = header.substring(start+1, end) 
      //             return cookie;
      //           }

      //           const set_rcc = extractCookie(0)
      //           const set_acc = extractCookie(1)

      //           app.$cookies.set('rcc', set_rcc, { // rcc 쿠키 셋
      //             path: '/',
      //             maxAge: 60 * 60 * 24 * 30,  // 만료일 30일
      //             domain: process.env.AUTH_API_URL !== undefined? 'cosign.cc':'localhost',
      //             httpOnly: true,
      //           });
      //           app.$cookies.set('acc', set_acc, { // acc 쿠키 셋
      //               path: '/',
      //               maxAge: 60 * 60 * 24,  // 만료일 24시간
      //               domain: process.env.AUTH_API_URL !== undefined? 'cosign.cc':'localhost',
      //           });

      //           // acc = app.$cookies.get('acc');
      //           console.log('쿠키셋팅 후 acc쿠키', app.$cookies.get('acc'))
      //         }
      //         console.log('쿠키셋팅끝')
                
                

                

      //       } else {
      //           console.log(app.$res_inspect(res, 'message'))
      //       }
            
      //     }

      //   } catch(err) {
      //     console.log(err)
      //   }
      // }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  )
  
  inject('intApi', intApi)


  // =====================================
  // api 응답 규격화
  // =====================================
  function res_inspect(res, type) {
    if(type === 'inspect') return res.data.status === 200 && !res.data.error;
    else if(type === 'message') return res.data.error.message;
  }

  inject('res_inspect', res_inspect)
}

export default customAxios;