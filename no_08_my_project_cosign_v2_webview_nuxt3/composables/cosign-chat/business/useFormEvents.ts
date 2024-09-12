import { useCommon } from "~/composables/_app/useCommon";
import { piniaStompSocket } from "~/pinia/cosign-chat/piniaStompSocket";
import { piniaToastMessage } from "~/pinia/toast/piniaToastMessage";
import { useStompSocket } from "./useStompSocket";
import { useValidate } from "./useValidate";

export const useFormEvents = () => {
    const { isIos } = useDevice();
    const { delay } = useCommon();
    const { stomp, socketRoom, socketUser } = piniaStompSocket();
    const { scrollToBottom } = useStompSocket();
    const { checkMaxTextLangth, checkNoneBlankText, checkSocketConnected, checkSubmitIntervalTime } = useValidate();
    

    const textareaRef = ref<HTMLTextAreaElement>();
    const fakeTextareaRef = ref<HTMLTextAreaElement>();
    const LINE_HEIGHT = 20;
    const PREVENT_TIME = 3000;
    const MAX_ROW = 3;
    const MAX_TEXT_LENGTH = 200;
    const scrollDelayTimer = ref<NodeJS.Timeout | null>(null);
    const preventTimer = ref<NodeJS.Timeout | null>(null);
    const preventFlag = ref(false);
    const inputText = ref('');
    const focusFlag = ref(false);


    const textUpdate = (text: string) => {
        inputText.value = text;
    }


    const autoResize = (init?: boolean) => {
        if (!textareaRef.value) return;

        textareaRef.value.style.height = 'auto';
        if (init) {
            textareaRef.value.style.height = LINE_HEIGHT + 'px';
            textareaRef.value.style.overflow = 'hidden';
        } else {
            textareaRef.value.style.height = Math.min(textareaRef.value.scrollHeight, LINE_HEIGHT * MAX_ROW) + 'px';
            textareaRef.value.style.removeProperty('overflow');
        }
    }

    

    const onInput = (e: Event) => {
        const target = e.target as HTMLTextAreaElement;
        inputText.value = target.value;
        checkMaxTextLangth(inputText.value, MAX_TEXT_LENGTH, textUpdate);
        autoResize();
    }

    /**
     * iOS 환경에서 textarea에 포커싱할 경우 키보드가 올라오면서 textarea를 가리는 현상이 간헐적으로 발생
     * 이 문제를 해결하기 위해 textarea에 빈 공백(스페이스 바)을 넣으면 해결됨
     * 포커스를 할 경우는 다시 빈 공백을 제거하고, 블러가 되면 빈 공백을 넣어줌
     */
    const checkFocusingTextBlank = (isFocus: boolean) => {
        if (isFocus) {
            if (inputText.value === ' ') inputText.value = '';
        } else {
            if (inputText.value === '') inputText.value = '';
        }

        // 707a8a 
    }

    const onfocus = async (e: Event) => {
        focusFlag.value = true;
        const target = e.target as HTMLTextAreaElement;
        // checkFocusingTextBlank(true);
        autoResize();
        await nextTick();
        await delay(scrollDelayTimer, 300);
        scrollToBottom('smooth');
    }

    const onBlur = (e: Event) => {
        const target = e.target as HTMLTextAreaElement;
        focusFlag.value = false;
        // const mobileScrollEl = piniaStompSocket().chatWrapRef;

        // if (mobileScrollEl && isIos) {
        //     // iOS 환경에서 키보드 올라올때 mobileScrollEl 요소의 height값을 조정했던 것을 원복하는 작업
        //     mobileScrollEl.style.removeProperty('height');
        // }

        autoResize();
        scrollToLastLine(target);
    }


    const scrollToLastLine = (textarea: HTMLTextAreaElement) => {
        // 텍스트 영역의 높이와 스크롤 높이 계산
        const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
        const totalHeight = textarea.scrollHeight;
        // const visibleHeight = textarea.clientHeight;
        
        // 총 줄 수 계산
        const totalLines = Math.floor(totalHeight / lineHeight);

        if (totalLines > 1) {
            // 마지막 줄로 스크롤
            autoResize(true);
            textarea.scrollTop = totalHeight;
        }
    }


    const checkTimer = async () => {
        await delay(preventTimer, PREVENT_TIME)
        preventFlag.value = false;
    }


    const forceInputFocus = () => {
        fakeTextareaRef.value?.focus({ preventScroll: true });
        textareaRef.value?.focus({ preventScroll: true });
    }


    const onClickSubmit = () => {
        // checkTimer();
    
        if (!checkSocketConnected()) return;
        if (!checkNoneBlankText(inputText.value)) return;
        if (!checkSubmitIntervalTime(preventFlag.value)) return forceInputFocus();
        
        stomp.client!.publish({
            destination: '/chat/message',
            body: JSON.stringify({
                message_type: 'TALK',
                room_uuid: socketRoom.room_uuid,
                user_uuid: socketUser.user_uuid,
                user_nickname: socketUser.user_nickname,
                permission: socketUser.permission,
                message: inputText.value,
            })
        })

        preventFlag.value = true;
        checkTimer();

        inputText.value = '';
        forceInputFocus();
        autoResize(true);
    }


    const handleEnter = (e: KeyboardEvent) => {
        e.preventDefault();
        
        onClickSubmit();
    }


    onMounted(() => {
    })

    onUnmounted(() => {
        if (preventTimer.value) {
            clearTimeout(preventTimer.value);
        }
        if (scrollDelayTimer.value) {
            clearTimeout(scrollDelayTimer.value);
        }
    })

    return {
        textareaRef,
        fakeTextareaRef,
        inputText,
        focusFlag,
        onInput,
        onfocus,
        onBlur,
        onClickSubmit,
        handleEnter,
        LINE_HEIGHT,
        MAX_TEXT_LENGTH,
    }
}