const popupStore = {
    namespaced: true,
    state() {
        return {    
            isHideHeader: false,
            subscribePopup: false,
            unsubscribePopup: false,
            loginPopup: false,
            pageNo: 0,
            profileContents: {
                profileImg: `https://kr.object.ncloudstorage.com/cosign/mentor-image/default.png`,
                title: '',
                description: '',
                type: '',
                rank: 0,
                earningRate: 0,
                subscribeCount: 0,
                earningRateSum: 0,
                maxEarningRate: 0,
                successRate: 0,
                products: []
            },
            chartData: {
                isChart: false,
                mentorCurrentEarning: null,
                earningColor: null,
                currentMentorEarning: [],
                averageMentorEarning: [],
            },
    
            //스마트폰 반응형 탭메뉴(싸인히스토리, 채팅톡, 추천멘토) 컨트롤
            mobileActiveTabIdx: 0,
            pageId: null,
            isNewHistoriesLoading: false,
            mentorPageId: [
                'dtw','rabbit','sns','news','rocket','updown','bottom','global','volume','hoonbot','hoonbotlight'
            ],
            isDescModal: false,
        }
    },
    getters: {
        subscribePopup: state => state.subscribePopup,
        unsubscribePopup: state => state.unsubscribePopup,
        loginPopup: state => state.loginPopup,
        // isModalShow(state) {
        //     return state.subscribePopup || state.loginPopup || state.unsubscribePopup;
        // },
        profileContents: state => {
            return state.profileContents;
        },
        pageId(state) {
            return state.pageId;
        },
        isHideHeader(state) {
            return state.isHideHeader;
        },
        mobileActiveTabIdx(state) {
            return state.mobileActiveTabIdx;
        },
        pageNo(state) {
            return state.pageNo;
        },
        isNewHistoriesLoading(state) {
            return state.isNewHistoriesLoading;
        },
        mentorCurrentEarning(state) {
            return state.chartData.mentorCurrentEarning;
        },
        earningColor(state) {
            return state.chartData.earningColor;
        },
        mentorPageId(state) {
            return state.mentorPageId;
        },
        isDescModal(state) {
            return state.isDescModal;
        }
    },
    mutations: {
        hideHeader(state, value) {
            state.isHideHeader = value;
        },
        showSubscribePopup(state, value) {
            state.subscribePopup = value;
        },
        showUnSubscribePopup(state, value) {
            state.unsubscribePopup = value;
        },
        showLoginPopup(state, value) {
            state.loginPopup = value;
        },
        subscribe(state, value) {
            state.isSubscribe = value;
        },
        //스마트폰 반응형 탭메뉴(싸인히스토리, 채팅톡, 추천멘토) 컨트롤
        setMobileActiveTabIdx(state, value) {
            state.mobileActiveTabIdx = value;
        },
        setPageId(state, value) {
            state.pageId = value;
        },
        setIsNewHistoriesLoading(state, value) {
            state.isNewHistoriesLoading = value;
        },
        setNewsLinks(state, value) {
            state.signHistories = state.signHistories.map((sign, idx) => {
                if(value.idx === idx) {
                    return {
                        ...sign,
                        newsLinks: value.links
                    }
                } else {
                    return sign;
                }
            });
        },
        setPageNo(state, value) {
            state.pageNo = value;
        },
        toggleDescModal(state, value) {
            state.isDescModal = value;
            value ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible';
        }
    },
    actions: {
        hideHeader({commit}, value) {
            commit('hideHeader', value);
        },
        showSubscribePopup({commit}, value) {
            commit('showSubscribePopup', value);
        },
        showUnSubscribePopup({commit}, value) {
            commit('showUnSubscribePopup', value);
        },
        showLoginPopup({commit}, value) {
            commit('showLoginPopup', value);
        },
        //스마트폰 반응형 탭메뉴(싸인히스토리, 채팅톡, 추천멘토) 컨트롤
        setMobileActiveTabIdx({commit}, value) {
            commit('setMobileActiveTabIdx', value);
        },
        setPageId({commit}, value) {
            if(value !== undefined) {
                commit('setPageId', value);
            } else {
                commit('setPageId', 'bb3977d2-92d7-4423-a833-7e13aabcad98');
            }
        },
        setPageNo({commit}, value) {
            commit('setPageNo', value);
        },
        toggleDescModal({commit}, value) {
            commit('toggleDescModal', value)
        }
    }
}

export default popupStore;