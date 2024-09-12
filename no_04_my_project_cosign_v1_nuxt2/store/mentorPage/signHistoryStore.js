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
    state() {
        return {
            signHistories: [],
            isLastPage: false,
            selectedHistoryId: null,
        }
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
        showHistoryPopup({commit}, value) {
            commit('showHistoryPopup', value);
        },
    }
};

export default signHistoryStore;