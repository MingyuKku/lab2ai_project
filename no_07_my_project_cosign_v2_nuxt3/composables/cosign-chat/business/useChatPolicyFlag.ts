export const useChatPolicyFlag = () => {
    const chatPolicyFlag = ref(false);

    const updateChatPolicyFlag = (value: boolean) => {
        chatPolicyFlag.value = value;
    }


    return {
        chatPolicyFlag,
        updateChatPolicyFlag,
    }
}