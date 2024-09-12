import axios from 'axios';
import {API_URL} from '@/core/apiUrl';

const routeStore = {
    namespaced: true,
    state: {
        mentor_id: null,
        sign_seq_id: null,
        sign_now: {
            buttons: [],
            sign: {
                sequentialId: 0
            }, 
            images: [],
            newslinks: [],
            texts: [],
            activeSignSeqId: null
        }
    },
    getters: {
        mentorId: state => {
            return state.mentor_id;
        },
        signSeqId: state => {
            return state.sign_seq_id;
        },
        signNow: state => {
            return state.sign_now;
        },
        signNowActiveSignSeqId: state => {
            return state.sign_now.activeSignSeqId;
        }
    },
    mutations: {
        route(state, {mentor_id, sign_seq_id}) {
            state.mentor_id = mentor_id;
            state.sign_seq_id = parseInt(sign_seq_id);
        },
        setSignNow(state, {buttons, sign, activeSignSeqId}) {
            function getStateText(evaluateState, endDate) {
                switch(evaluateState) {
                  case 'cut':
                    return '실패';
                  case 'buy_fail':
                    return '진입 실패';
                  case 'sell_fail':
                  case 'sell_success':
                    return '종료';
                }
        
                if(['buy_wait', 'sell_wait'].includes(evaluateState)
                  && new Date() < endDate) 
                {
                  return '진행중';
                } else {
                  return '평가 대기'
                }
            }

            function getValidateMinText(validateMin) {
                if(validateMin / 60 < 1) {
                  return `${validateMin}분`;
                } else {
                  return `${validateMin / 60}시간`;
                }
            }

            function getLocaleString(value, default_value) {
                if(value >= 1) {
                    return value.toLocaleString();
                } else if(value === undefined && default_value !== undefined) {
                    return default_value;
                } else {
                    return value;
                }
            }

            if(buttons !== null) { // 싸인 버튼을 통해 이동시는 buttons가 null
                state.sign_now.buttons = buttons.map(button => {
                    return {
                      ...button,
                      'code': button['market'].substr(4)
                    }
                });
            }

            const targetEarningRate = (sign.targetPrice/sign.startPrice - 1) * 100;
            state.sign_now.sign = {
                ...sign,
                stateText: getStateText(sign.evaluateState),
                validateMinText: getValidateMinText(sign.validateMin),
                startTimeText: new Date(sign.startTime).format('yyyy-MM-dd HH:mm'),
                endTimeText: new Date(sign.endTime).addDate('minute', -1).format('yyyy-MM-dd HH:mm'),
                createdAtText: new Date(sign.createdAt).diffNow(),
                startPriceText: getLocaleString(sign.startPrice, '?????'),
                targetPriceText: getLocaleString(sign.targetPrice, '?????'),
                cutPriceText: getLocaleString(sign.cutPrice, '?????'),
                targetEarningRate: targetEarningRate,
                targetEarningRateText: (sign.startPrice !== undefined)? targetEarningRate.toFixed(2): '???'
            };

            if(sign.contentText !== undefined && sign.contentText !== null) {
                state.sign_now.texts = sign.contentText.split('\n');
            } else {
                state.sign_now.texts = [];
            }

            if(sign.images !== undefined) { // 블러처리
                state.sign_now.images = sign.images;
                state.sign_now.newslinks = sign.newsLinks;
            }

            state.sign_now.activeSignSeqId = activeSignSeqId;
            
            if(state.sign_now.buttons.find(button => button.subSeqId === activeSignSeqId) === undefined) {
                alert("존재하지 않는 SIGN입니다.")
                location.href = `/m/${state.mentor_id}/${buttons[0].subSeqId}`;
            } else if(activeSignSeqId !== undefined) {
                history.pushState(null, null, `/m/${state.mentor_id}/${activeSignSeqId}`);
            }
        }
    },
    actions: {
        async route({commit, dispatch}, {mentor_id, sign_seq_id}) {
            commit('route', {mentor_id, sign_seq_id})

            let is_sign_now_loaded = false;

            if(sign_seq_id !== undefined) {
                // 여기에서 API 호출해서 Sign Now인지, Sign History인지 맞춰야 할듯
                const res = await axios.post(`${API_URL}/api/sign/get/route/${mentor_id}/${sign_seq_id}`, {}, {withCredentials: true});
                if(res.data.signNowRes !== null) {
                    const signBlurDto = res.data.signNowRes.signBlurDto;
                    const signNowDto = res.data.signNowRes.signNowDto;
                    const sign = signBlurDto !== null? signBlurDto: signNowDto;
                    commit('setSignNow', {
                        buttons: res.data.signNowRes.signButtons, 
                        sign, 
                        activeSignSeqId: parseInt(sign_seq_id)
                    });
                    //activeSignId

                    is_sign_now_loaded = true;
                } else if(res.data.signHistoryRes !== null) {
                    dispatch('signHistoryPopupStore/setSwipeItems', res.data.signHistoryRes, {root: true});
                    dispatch('signHistoryPopupStore/showHistoryPopup', {subSeqId: sign_seq_id}, {root: true});
                }
                // signHistoryPopupStore에 slide 데이터가 있어야 할 것. 왜냐하면 여기서 signSlide가 자동으로 나와야 하기 때문!
            }

            if(mentor_id !== undefined && is_sign_now_loaded === false) {
                dispatch('loadSignNow', {mentor_id});
            }
        },
        async loadSignNow({commit}, {mentor_id}) {
            // 코인 이미지, 텍스트 가져와야 함
            const res = await axios.post(`${API_URL}/api/sign/get/sign_now/current/${mentor_id}`, {}, {withCredentials: true});
            
            if(res.data !== '') {
                const buttons = res.data.signButtons;
                const signBlurDto = res.data.signBlurDto;
                const signNowDto = res.data.signNowDto;
                const sign = signBlurDto !== null? signBlurDto: signNowDto;
                commit('setSignNow', {
                    buttons,
                    sign, 
                    activeSignSeqId: sign.subSeqId
                });
            }
        },
        // sign on 메뉴 클릭을 통해 이동한 케이스
        async loadAnotherSignNow({commit}, {sign_id}) {
            const res = await axios.post(`${API_URL}/api/sign/get/sign_now/selected/${sign_id}`, {}, {withCredentials: true});
            const signBlurDto = res.data.signBlurDto;
            const signNowDto = res.data.signNowDto;
            const sign = signBlurDto !== null? signBlurDto: signNowDto;

            if(sign.evaluateState === 'buy_wait' || sign.evaluateState === 'sell_wait') {
                commit('setSignNow', {
                    buttons: null, 
                    sign,
                    activeSignSeqId: sign.subSeqId
                });
            } else {
                alert("이 싸인은 종료된 싸인입니다.");
            }

            if(res.data.login === false) {
                commit('loginStore/setLoginNull', null, {root: true});
            }
        }
    }
}

export default routeStore;