import axios from 'axios';
import {API_URL} from '@/core/apiUrl';

const {body} = document;
const popupStore = {
    namespaced: true,
    state: {    
        isHideHeader: false,
        subscribePopup: false,
        unsubscribePopup: false,
        loginPopup: false,
        pageNo: 0,
        profileContents: {
            profileImg: `https://kr.object.ncloudstorage.com/cosign/mentor-image/default.png`,
            title: null,
            description: '',
            type: '',
            rank: 0,
            earningRate: 0,
            subscribeCount: 0,
            earningRateSum: 0,
            maxEarningRate: 0,
            successRate: 0
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
            'dtw','rabbit','sns','news','rocket','updown','bottom','global','homerun','hoonbot','hoonbotlight'
        ],
        isDescModal: false,
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
        LoadProfile(state, value) {
            state.profileContents.title = value.title;
            state.profileContents.description = value.description;
            state.profileContents.type = value.type;
            state.profileContents.rank = value.earningRank;
            state.profileContents.profileImg = value.profileImage;

            if(value.earningRate !== null) {
                state.profileContents.earningRate = parseFloat(value.earningRate.toFixed(1)) || 0;
                state.profileContents.earningRateSum = parseFloat(value.earningRateSum.toFixed(1)) || 0;
                state.profileContents.maxEarningRate = parseFloat(value.maxEarningRate.toFixed(1)) || 0;
                state.profileContents.successRate = parseFloat(value.successRate.toFixed(1)) || 0;
            }
            
            if(value.subscribeCount !== null) {
                state.profileContents.subscribeCount = value.subscribeCount;
            }
        },
        LoadChart(state, value) {

            function earningColor() {
                if(state.chartData.mentorCurrentEarning < 0) return {color: '#2058EA'};
                else if(state.chartData.mentorCurrentEarning == 0) return {color: '#999'}
                else return {color: '#F53B57'}
            }

            if(value.earningRates.length > 0) {

                state.chartData.isChart = true;

                state.chartData.mentorCurrentEarning = (value.earningRates.reduce(function add(sum, currValue) {
                    return sum + currValue.earningRate;
                }, 0) / value.earningRates.length).toFixed(2);
    
                state.chartData.earningColor = earningColor();
    
                state.chartData.currentMentorEarning = value.earningRates.map(value => {
                    return {
                        time: value.earningDate,
                        value: Number(value.earningRate.toFixed(2))
                    };
                })
    
                state.chartData.averageMentorEarning = value.totalEarningRates.map(value => {
                    return {
                        time: value.earningDate,
                        value: Number(value.earningRate.toFixed(2))
                    };
                });
            } else {
                return state.chartData.isChart = false;
            }
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
            value ? body.style.overflow = 'hidden' : body.style.overflow = 'visible';
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
        async LoadProfile({commit}, value) {            
            const res = await axios.get(`${API_URL}/api/mentor_page/get/${value}`);
            commit('LoadProfile', res.data);
            commit('LoadChart', res.data);
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