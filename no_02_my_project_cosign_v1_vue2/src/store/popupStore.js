
const popupStore = {
    namespaced: true,
    state: {
        isShowLoginAlert: false,
        alarmActive: false,
    },
    getters: {
        isShowLoginAlert(state) {
            return state.isShowLoginAlert;
        },
        alarmActive(state) {
            return state.alarmActive;
        }
    },
    mutations: {
        showLoginAlert(state) {
            state.isShowLoginAlert = true;
        },
        hideLoginAlert(state) {
            state.isShowLoginAlert = false;
        },
        showAlarm(state) {
            state.alarmActive = true;
        },
        hideAlarm(state) {
            state.alarmActive = false;
        }
    },
    actions: {

    }
}

export default popupStore;