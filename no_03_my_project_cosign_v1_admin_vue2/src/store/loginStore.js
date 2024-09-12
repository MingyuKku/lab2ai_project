import axios from 'axios';
import {API_URL, CODE_SUCCESS, CODE_NO_LOGIN} from '@/core/apiUrl';
import router from '@/router/index'


const loginStore = {
    namespaced: true,
    state: {
        login_info: null,
        userInfo: {
            nickname: '',
            email: '',
            eventCk: false
        }
    },
    getters: {
        loginInfo(state) {
            return state.login_info;
        },
        userInfo(state) {
            return state.userInfo;
        },
        isLogin(state) {
            return state.login_info !== null;
        }
    },
    mutations: {
        login(state, value) {
            const isLogout = (state.login_info !== null && value === null); 
            state.login_info = value;

            console.log('로그인스토어', value)
            if(value === null) {
                if(isLogout) {  //현재 로그인상태인데 로그아웃하려는 경우
                    router.go(0);
                }    
            }    
        },
        setLoginNull(state) {
            state.login_info = null;
        },
        loadUserInfo(state, value) {
            state.userInfo.nickname = value.nickName
            state.userInfo.email = value.username
            state.userInfo.eventCk = value.eventCk
        }
    },
    actions: {
        login({commit}, value) {
            commit('login', value);
        },
        async checkIsLogin({commit}) {
            await axios.post(`${API_URL}/api/login_info`, {}, {withCredentials: true})
            .then(res=> {
                // console.log('스토어checkIsLogin', res.data)
                if(res.data !== '') {
                    commit('login', res.data);
                } else {
                    commit('login', null);
                }
            })
            .catch(()=> {
            })
        }, 
        async logout({commit}) {
            const res = await axios.post(`${API_URL}/api/logout`, {}, {withCredentials: true});
            console.log('로그아웃', res)
            // const res = await axios.post(`https://manager.cosign.cc/api/logout`, {}, {withCredentials: true});
            if(res.data.code === CODE_SUCCESS) {
                commit('login', null);
            } else if(res.data.code === CODE_NO_LOGIN) {
                alert(res.data.message);
            }
        },
        async loadUserInfo({commit}) {
            await axios.post(`${API_URL}/api/user/modify/load`, {}, {withCredentials: true})
            .then(res=> {
                commit('loadUserInfo', res.data.userInfo)
            })
        }
    }
}

export default loginStore;