import VueJwtDecode from 'vue-jwt-decode'

function mapAlarmItems(item) {
    const is_end = !["sell_wait", "buy_wait"].includes(item.evaluate_state);
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
        remain_time: Date.parseUtcText(item.start_time).diffNow(),
        is_end: is_end,
        valueColor: valueColor('32,88,234','153,153,153','245,59,87')
    }
}

const loginStore = {
    namespaced: true,
    state() {
        return {
            login_info: null,
            isSubscribe: false,
            subscribeExpireTime: null,
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
        },
        subscribeExpireTime(state) {
            return state.subscribeExpireTime;
        },
        canBrowseSign() {
            return true;
            // if(state.isSubscribe) {
            //     return true;
            // } else if(state.login_info !== null && state.login_info.adminCk) {
            //     return true;
            // } else {
            //     return false;
            // }
        }
    },
    mutations: {
        login(state, value) {
            if(state.login_info !== null) {
                if(value === null) {
                    state.login_info = value;
                    location.reload(); return;
                }
            }

            if(value !== null) {
                // state.alarm.totalCount = value.totalAlarmCount;
            } else {
                state.isSubscribe = false; // WARNING: 멘토별로 관리할 필요가 있음(router.push로 변경할 때)
                
            }
            state.login_info = value;
        },
        commonData(state, value) {
            state.alarm.totalCount = value;
        },
        setLoginNull(state) {
            state.login_info = null;
        },
        subscribe(state, value) {
            state.isSubscribe = value;
        },
        setSubscribeExpireTime(state, value) {
            state.subscribeExpireTime = Date.parseUtcText(value).format('yyyy/MM/dd');
            console.log(state.subscribeExpireTime);
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
                  profileImage: mentor.profileImage != ''? mentor.profileImage: `${$static.imgUrl}index/main/profile_picture1_img.png`,
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
        // async refreshToken() {
        //     const acc = this.$cookies.get('acc');
        //     if(acc !== undefined) {

        //         const exp = VueJwtDecode.decode(acc).exp * 1000; // acc 쿠키 만료일
        //         const now = new Date().valueOf();
        //         let remainMinTime = (exp - now) / (1000 * 60); // acc 쿠키 만료일을 분으로 환산

        //         console.log('acc 남은시간', remainMinTime)

        //         try {
        //             if(remainMinTime <= 30) {  // acc 토큰의 만료시간이 60분 이하일 때 리프레시 실행

        //                 const res = await this.$userApi.post('/api/user/token/refresh', {}, {withCredentials: true})
        //                 console.log('리프레시 응답', res.data, res.headers['set-cookie'])
        //                 if(this.$res_inspect(res, 'inspect')) {

        //                     function extractCookie(idx) {
        //                         const header = res.headers['set-cookie'][idx]
        //                         const start = header.indexOf('=')
        //                         const end = header.indexOf(';')
        //                         const cookie = header.substring(start+1, end) 
        //                         return cookie;
        //                     }
            
        //                     const set_rcc = extractCookie(0)
        //                     const set_acc = extractCookie(1)
            
        //                     this.$cookies.set('rcc', set_rcc, { // rcc 쿠키 셋
        //                         path: '/',
        //                         maxAge: 60 * 60 * 24 * 30,  // 만료일 30일
        //                         domain: process.env.AUTH_API_URL !== undefined? 'cosign.cc':'localhost',
        //                         httpOnly: true,
        //                     });
        //                     this.$cookies.set('acc', set_acc, { // acc 쿠키 셋
        //                         path: '/',
        //                         maxAge: 60 * 60 * 24,  // 만료일 24시간
        //                         domain: process.env.AUTH_API_URL !== undefined? 'cosign.cc':'localhost',
        //                     });

        //                 } else {
        //                     console.log(this.$res_inspect(res, 'message'))
        //                 }
                        
        //             }

        //         } catch(err) {
        //             console.log('리프레시토큰 에러',err)
        //         }
        //     }
        // },
        async checkIsLogin({commit}) {
            try {
                // 쿠키기반 로그인상태 체크
                if(this.$cookies.get('acc') !== undefined) {
                    const accTokenDecode = VueJwtDecode.decode(this.$cookies.get('acc'))
                    commit('login', accTokenDecode.id);

                    try {
                        const res = await this.$intApi.post(`/api/common/data`, {}, {withCredentials: true})
                        if(this.$res_inspect(res, 'inspect')) {
                            commit("commonData", res.data.data.total);
                        }

                    } catch(err) {
                        console.log('common data',err)
                    }
                    
                } else {
                    commit('login', null);
                }

            } catch(err) {
                console.log(err);
                commit('login', null);
            }
        },
        subscribe({commit}, {mentorId}) {
            this.$intApi.post(`/api/subscribe/${mentorId}`, {}, {withCredentials: true})
            .then(res => {
                if(res.data.data.payResultType === "success") {
                    commit('subscribe', res.data.data.payResultType === "success");
                    location.reload();
                } else {
                    alert(this.$res_inspect(res, 'message'))
                }

                // if(res.data === 'success') {
                //     commit('subscribe', res.data.code === 1000);
                //     location.reload();
                // }
            }).catch(err => {
                console.log(err);
            });
        },
        unsubscribe({}, {mentorId}) {
            this.$intApi.post(`/api/unsubscribe/${mentorId}`, {}, {withCredentials: true})
            .then(res => {
                if(res.data.data.unsubscribe === 'success') {
                    location.reload();
                }
            }).catch(err => {
                console.log(err);
            });
        },
        // checkSubscribe({commit}, pageId) {
        //     this.$axios.post(`${API_URL}/api/is_subscribed/${pageId}`, {}, {withCredentials: true})
        //     .then(res => {
        //         commit('subscribe', res.data.code === 1000);
        //     })
        // },
        async logout({commit}) {
            const res = await this.$userIntApi.post(`/api/user/logout`, {}, {withCredentials: true});
            if(this.$res_inspect(res, 'inspect')) {
                commit('login', null);
            } else {
                alert(this.$res_inspect(res, 'message'));
            }
        },
        async loadMentorAlarm({commit}) {
            try {
                const res = await this.$intApi.post(`/api/alarm/get`, {}, {withCredentials: true});

                if(this.$res_inspect(res, 'inspect')) {
                    commit('setMentorAlarm', res.data.data.items);
                } else {
                    commit("popupStore/hideAlarm", {}, {root: true});
                    commit("popupStore/showLoginAlert", {}, {root: true});
                    // 이미 로그아웃상태일 때 스토어값만 삭제하기 위해
                    commit("setLoginNull");
                }

                // if(res.data.code === 1002) {
                //     commit("popupStore/hideAlarm", {}, {root: true});
                //     commit("popupStore/showLoginAlert", {}, {root: true});
                //     // 이미 로그아웃상태일 때 스토어값만 삭제하기 위해
                //     commit("setLoginNull");
                // } else if(res.data.code === 1000) {
                //     commit('setMentorAlarm', res.data.data);
                // } 

            } catch (err) {}
            // const res = await this.$axios.post(`/api/alarm/get`, {}, {withCredentials: true});
            // console.log('알람res', res.data)
            // if(res.data.code === 1002) {
            //     commit("popupStore/hideAlarm", {}, {root: true});
            //     commit("popupStore/showLoginAlert", {}, {root: true});
            //     // 이미 로그아웃상태일 때 스토어값만 삭제하기 위해
            //     commit("setLoginNull");
            // } else if(res.data.code === 1000) {
            //     commit('setMentorAlarm', res.data.data);
            // }            
        },
        async loadMentorAlarmSignItems({commit}, {mentorPageId}) {
            const res = await this.$intApi.post(`/api/alarm/get/${mentorPageId}`, {}, {withCredentials: true});
            commit('setMentorAlarmSignItems', res.data.data.alarmItems);
        },
        async loadUserInfo({commit}) {
            try {
                const res = await this.$intApi.post(`/api/user/modify/load`, {}, {withCredentials: true})
                if(this.$res_inspect(res, 'inspect')) {
                    commit('loadUserInfo', res.data.data)
                } else {
                    // alert(this.$res_inspect(res, 'message'))
                }

            } catch(err) {
                console.log(err)
            }
        }
    }
}

export default loginStore;