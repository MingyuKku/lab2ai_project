
const actions = {
    async nuxtServerInit({dispatch}) {
        // await dispatch("loginStore/refreshToken");
        await dispatch("loginStore/checkIsLogin");
    }
}

export {actions};