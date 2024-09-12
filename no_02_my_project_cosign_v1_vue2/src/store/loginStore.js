import axios from 'axios';
import {API_URL, CODE_SUCCESS, CODE_NO_LOGIN} from '@/core/apiUrl';
import router from '@/router/index'

function mapAlarmItems(item) {
    const is_end = new Date(item.end_time) < new Date();
    const earning_rate = (is_end && item.earning_rate !== null && item.earning_rate !== "NaN")? item.earning_rate.toFixed(2): ((item.target_price / item.start_price - 1) * 100).toFixed(2);

    function valueColor(minus,zero,plus) {
        if(earning_rate < 0) return minus;
        else if(earning_rate === 0) return zero;
        else return plus;
    }

    return {
        ...item,
        start_price: item.start_price >= 1000? item.start_price.toLocaleString(): item.start_price,
        earning_rate: earning_rate,
        remain_time: new Date(item.start_time).diffNow(),
        is_end: is_end,
        valueColor: valueColor('32,88,234','153,153,153','245,59,87')
    }
}

const loginStore = {
    namespaced: true,
    state: {
        login_info: null,
        isSubscribe: false,
        alarm: {
            totalCount: 0,
            subscirbedMentorCount: 0,
            mentors: [],
        },
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
        isSubscribe(state) {
            return state.isSubscribe;
        },
        totalAlarmCount(state) {
            return state.alarm.totalCount;
        },
        alarmSubscribedCount(state) {
            return state.alarm.subscirbedMentorCount;
        },
        alarmMentors(state) {
            return state.alarm.mentors;
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
            const isLogout = (state.login_info !== null && value === null); //현재 로그인상태인데 로그아웃하려는 경우
            state.login_info = value;

            if(value !== null) {
                state.alarm.totalCount = value.totalAlarmCount;
            } else {
                state.isSubscribe = false; // WARNING: 멘토별로 관리할 필요가 있음(router.push로 변경할 때)
                
                if(isLogout) location.reload();
            }
        },
        setLoginNull(state) {
            state.login_info = null;
        },
        subscribe(state, value) {
            state.isSubscribe = value;
        },
        setMentorAlarm(state, value) {
            state.alarm.subscirbedMentorCount = value.length;
            state.alarm.mentors = value.map((mentor, idx) => {
                let items = null;
        
                if(mentor.items !== null) {
                    items = mentor.items.map(mapAlarmItems);
                }

                if(idx === 0) {
                    state.alarm.totalCount -= mentor.alarmCount;
                }

                return {
                  ...mentor,
                  alarmCount: idx !== 0? mentor.alarmCount: 0,
                  profileImage: mentor.profileImage != ''? mentor.profileImage: `${process.env.VUE_APP_IMG_URL}index/main/profile_picture1_img.png`,
                  items: items,
                  size: mentor.items !== null? `${mentor.items.length * 48}px`: null,
                }
            });
        },
        setMentorAlarmSignItems(state, value) {
            if(value.length > 0) {
                const changedItems = value.map(mapAlarmItems);

                state.alarm.mentors = state.alarm.mentors.map(mentor => {
                    const items = (mentor.mentorPageId === changedItems[0].mentor_page_id)? changedItems : mentor.items;
                    const size = items !== null? `${items.length * 48}px`: null;

                    if(mentor.mentorPageId === changedItems[0].mentor_page_id) {          
                        state.alarm.totalCount -= mentor.alarmCount;
                    }

                    return {
                        ...mentor,
                        alarmCount: (mentor.mentorPageId === changedItems[0].mentor_page_id)? 0: mentor.alarmCount, // 이거 왜 0 됐냐.. ㄷㄷ
                        items,
                        size,                        
                    }
                })
            } 
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
            const res = await axios.post(`${API_URL}/api/login_info`, {}, {withCredentials: true});
            if(res.data !== '') {
                commit('login', res.data);
            } else {
                commit('login', null);
                if(router.history.pending?.path.includes('/my_page')) {
                    location.href = '/';
                }
            }
        },
        subscribe({commit}, pageId) {
            axios.post(`${API_URL}/api/subscribe/${pageId}`, {}, {withCredentials: true})
            .then(res => {
                if(res.data.code === CODE_SUCCESS) {
                    commit('subscribe', res.data.code === CODE_SUCCESS);
                } else if(res.data.code === CODE_NO_LOGIN) {
                    alert(res.data.message);
                }
            }).catch(err => {
                console.log(err);
            });
        },
        unsubscribe({commit}, pageId) {
            axios.post(`${API_URL}/api/unsubscribe/${pageId}`, {}, {withCredentials: true})
            .then(res => {
                if(res.data.code === CODE_SUCCESS) {
                    commit('subscribe', res.data.code !== CODE_SUCCESS);
                } else if(res.data.code === CODE_NO_LOGIN) {
                    alert(res.data.message);
                }
            }).catch(err => {
                console.log(err);
            });
        },
        checkSubscribe({commit}, pageId) {
            axios.post(`${API_URL}/api/is_subscribed/${pageId}`, {}, {withCredentials: true})
            .then(res => {
                commit('subscribe', res.data.code === CODE_SUCCESS);
            })
        },
        async logout({commit}) {
            const res = await axios.post(`${API_URL}/api/logout`, {}, {withCredentials: true});
            if(res.data.code === CODE_SUCCESS) {
                commit('login', null);
            } else if(res.data.code === CODE_NO_LOGIN) {
                alert(res.data.message);
            }
        },
        async loadMentorAlarm({commit}) {
            const res = await axios.post(`${API_URL}/api/alarm/get`, {}, {withCredentials: true});
            if(res.data.code === 1002) {
                commit("popupStore/hideAlarm", {}, {root: true});
                commit("popupStore/showLoginAlert", {}, {root: true});
                // 이미 로그아웃상태일 때 스토어값만 삭제하기 위해
                commit("setLoginNull");
            } else if(res.data.code === 1000) {
                commit('setMentorAlarm', res.data.data);
            }            
        },
        async loadMentorAlarmSignItems({commit}, {mentorPageId}) {
            const res = await axios.post(`${API_URL}/api/alarm/get/${mentorPageId}`, {}, {withCredentials: true});
            
            commit('setMentorAlarmSignItems', res.data);
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