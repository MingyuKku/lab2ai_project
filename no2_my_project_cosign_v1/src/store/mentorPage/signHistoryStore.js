import axios from 'axios';
import {API_URL} from '@/core/apiUrl';

function mapSignHistory(sign) {
    return {
        ...sign,
        sign_state: {
            buy_success: ['sell_success', 'sell_fail', 'cut'].includes(sign.evaluateState),
            target_success: ['sell_success'].includes(sign.evaluateState),
            earning_success: sign.earningRate > 0
        }
    }
}

const signHistoryStore = {
    namespaced: true,
    state: {
        signHistories: [],
        isLastPage: false,
        selectedHistoryId: null,
    },
    getters: {
        selectedHistoryId: state => {
            return state.selectedHistoryId;
        },
        signHistories(state) {
            return state.signHistories;
        },
        isLastPage: state => {
            return state.isLastPage;
        }
    },
    mutations: {
        setHistories(state, value) {
            state.signHistories = value.signs.map(mapSignHistory);
            state.isLastPage = value.isLastPage;
        },
        addHistories(state, value) {
            state.signHistories = state.signHistories.concat(value.signs.map(mapSignHistory));
            state.isLastPage = value.isLastPage;
        },
        showHistoryPopup(state, value) {
            state.selectedHistoryId = value;
        },
    },
    actions: {        
        async loadHistories({state, commit}, value) {         
            if(state.signHistories.length === 0) {
                const res = await axios.get(`${API_URL}/api/sign/get/sign_history/page/${value.mentorId}`);
                
                commit('setHistories', {
                    ...res.data,
                    isLastPage: res.data.isLastPage,
                });
                return res;
            } else { 
                const lastSignId = state.signHistories[state.signHistories.length - 1].id;
                const res = await axios.get(`${API_URL}/api/sign/get/sign_history/page/${value.mentorId}/${lastSignId}`);
                
                commit('addHistories', {
                    ...res.data,
                    isLastPage: res.data.isLastPage,
                });
                return res;
            }
        },
        showHistoryPopup({commit}, value) {
            commit('showHistoryPopup', value);
        },
    }
};

export default signHistoryStore;