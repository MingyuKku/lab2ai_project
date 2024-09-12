
const popupStore = {
    namespaced: true,
    state() {
        return {
            isShowLoginAlert: false,
            alarmActive: false,
            alarm: {
                show: false,
                titles: null,
                contents: null,
                okButtonText: null,
                cancelButtonText: null,
                onOkClick: null
            },
            isShowLoginPopup: false
        }
    },
    getters: {
        isShowLoginAlert(state) {
            return state.isShowLoginAlert;
        },
        alarmActive(state) {
            return state.alarmActive;
        },
        alarm(state) {
            return state.alarm;
        },
        isShowLoginPopup(state) {
            return state.isShowLoginPopup;
        }
    },
    mutations: {
        showAlarm(state) {
            state.alarmActive = true;
        },
        hideAlarm(state) {
            state.alarmActive = false;
        },
        show(state, {titles, contents, okButtonText, cancelButtonText, onOkClick}) {
            state.alarm.show = true;
            state.alarm.titles = titles;
            state.alarm.contents = contents;
            state.alarm.okButtonText = okButtonText;
            state.alarm.cancelButtonText = cancelButtonText;
            state.alarm.onOkClick = onOkClick;
        },
        close(state) {
            state.alarm.show = false;
            state.alarm.titles = [];
            state.alarm.contents = [];
            state.alarm.okButtonText = null;
            state.alarm.cancelButtonText = null;
            state.alarm.onOkClick = null;
        },
        showLoginPopup(state) {
            state.isShowLoginPopup = true;
        },
        hideLoginPopup(state) {
            state.isShowLoginPopup = false;
        },
    },
    actions: {
        showCertAlert({commit}) {
            commit('show', {
                titles: [
                    '멘토 구독은 본인인증을 받은',
                    '만 19세 이상 회원만 이용하실 수 있습니다.'
                ],
                contents: ['지금 본인인증을 하시겠습니까?'],
                okButtonText: '확인',
                cancelButtonText: '취소',
                onOkClick: function() {
                    window.open(`${window.location.origin}/cert/request`, "auth_popup", "width=430,height=640,scrollbar=yes");

                    commit('close');
                }
            })
        },
        showLoginAlert({commit}) {
            commit('show', {
                titles: ['로그인 하셔야 이용하실 수 있습니다.'],
                contents: ['로그인하시겠습니까?'],
                okButtonText: '로그인하기',
                cancelButtonText: '취소',
                onOkClick: function() {
                    commit('showLoginPopup');

                    commit('close');
                }
            })
        },
        showSubscribePopup({commit, dispatch}, {mentorId}) {
            commit('show', {
                titles: ['구독을 하시면 선택하신 멘토의 최신 등록 예측', 'SIGN 알림을 받으실 수 있습니다.'],
                contents: ['이 멘토를 구독하시겠습니까?'],
                okButtonText: '구독하기',
                cancelButtonText: '취소',
                onOkClick: function() {
                    dispatch('loginStore/subscribe', {mentorId}, {root:true});
                    commit('close');
                }
            })
        },
        showUnsubscribePopup({commit, dispatch}, {mentorId}) {
            commit('show', {
                titles: ['구독 취소를 하시면 선택하신 멘토의 최신 등록', 'SIGN 알림을 받으실 수 없습니다.'],
                contents: ['이 멘토를 구독 취소하시겠습니까?'],
                okButtonText: '구독취소',
                cancelButtonText: '취소',
                onOkClick: function() {
                    dispatch('loginStore/unsubscribe', {mentorId}, {root:true});
                    commit('close');
                }
            })
        },
        showNotAdultPopup({commit}) {
            commit('show', {
                titles: [],
                contents: ['COSIGN의 멘토 콘텐츠는 만 19세 이상만 이용하실 수 있습니다.'],
                okButtonText: '확인',
                cancelButtonText: null,
                onOkClick: function() {
                    commit('close');
                }
            })
        },
        showAlreadyCertPopup({commit}) {
            commit('show', {
                titles: [],
                contents: ['이미 다른 계정에서 휴대폰 인증을 받으셨습니다.', '기존 인증받으셨던 계정을 이용해 주세요.'],
                okButtonText: '확인',
                cancelButtonText: null,
                onOkClick: function() {
                    commit('close');
                }
            })
        },
        showNeedDepositPopup({commit}, {productPrice}) {
            commit('show', {
                titles: [`아래 계좌로 구독료 입금을 해주시면`, `입금 확인 후 이용이 가능합니다.`],
                contents: [`케이뱅크 100140002562 (예금주: 김형도)`, `구독료: ${productPrice.toLocaleString()}원`],
                okButtonText: '확인',
                cancelButtonText: null,
                onOkClick: function() {
                    commit('close');
                }
            })
        },
        showDepositAlreadyRequestedPopup({commit}, {productPrice}) {
            commit('show', {
                titles: [`이미 구독 신청을 하셨지만, 입금 확인이 되지 않아`, `아직 예측 SIGN 이용을 하실 수 없습니다.`,
                `아래 계좌로 구독료 입금을 해주시면`, `입금 확인 후 이용이 가능합니다.`],
                contents: [`케이뱅크 100140002562 (예금주: 김형도)`, `구독료: ${productPrice.toLocaleString()}원`],
                okButtonText: '확인',
                cancelButtonText: null,
                onOkClick: function() {
                    commit('close');
                }
            })
        },
        showPayMentorUnsubscribePopup({commit}, {subscribeExpireTime}) {
            commit('show', {
                titles: [],
                contents: [
                    `회원님의 구독 기간은 ${Date.parseUtcText(subscribeExpireTime).format('yyyy년 MM월 dd일')}에 종료됩니다.`, 
                    '구독 기간이 종료되면 예측 SIGN을 이용하실 수 없으니,', '종료 후에는 다시 구독 신청을 해주세요.'],
                okButtonText: '확인',
                cancelButtonText: null,
                onOkClick: function() {
                    commit('close');
                }
            })
        },
        showNeedSubscribePopup({commit, dispatch, rootGetters}) {            
            const product = rootGetters['signStore/profileContents'].products[0];
            const productId = product.id;
            const productPrice = product.price;

            commit('show', {
                titles: ['[임시] 구독을 하시면 해당 컨텐츠를 즐기실 수 있습니다.'],
                contents: [
                    `구독하시겠습니까?`],
                okButtonText: '구독',
                cancelButtonText: '취소',
                onOkClick: function() {
                    dispatch('loginStore/subscribe', {productId, productPrice}, {root:true});
                    commit('close');
                }
            })
        },
        // showSecessionPopup({commit, dispatch}) {
        //     commit('show', {
        //         titles: ['회원탈퇴를 하시면 회원님의 모든 데이터가 삭제됩니다.'],
        //         contents: ['그래도 회원을 탈퇴하시겠습니까?'],
        //         okButtonText: '예',
        //         cancelButtonText: '아니요',
        //         onOkClick: function() {
        //             dispatch('loginStore/subscribe', {productId, productPrice}, {root:true});
        //             commit('close');
        //         }
        //     })
        // }
    }
}

export default popupStore;