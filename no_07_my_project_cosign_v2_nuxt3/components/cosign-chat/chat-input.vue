<template>
    <div
        ref="chatInputRef"
        class="chat-input bg-white fixed z-[1] bottom-0 w-full py-3 px-primary"
        :class="isMobile ? 'left-0' : 'max-w-desktop'"
    >
        <CommonToast :is-insert="true" />
        <div
            @click="isUserSignedIn ? undefined : openSigninAlert(`로그인 하신 후 이용하실 수 있습니다.`)"
            class="flex items-end"
        >
            <label
                for="message"
                class="text-wrap relative flex items-center w-full min-h-12 py-1 border rounded-lg overflow-hidden"
                :class="focusFlag ? 'bg-white border-border-dark-03' : 'bg-bg-gray-04 border-border-gray-02'"
            >
                <textarea
                    ref="textareaRef"
                    type="text"
                    id="message"
                    name="message"
                    :placeholder="isUserSignedIn? '메세지를 입력해 주세요.' : '로그인해주세요.'"
                    :disabled="!isUserSignedIn"
                    :value="inputText"
                    rows="1"
                    @input="onInput"
                    @focus="onfocus"
                    @blur="onBlur"
                    @keypress.enter="handleEnter"
                    class="relative z-[1] w-full px-3 custom-scroll-bar-basic resize-none text-body-3 none-st focus:bg-white placeholder:text-font-dark-02"
                    :style="{
                        'line-height': `${LINE_HEIGHT}px`
                    }"
                    :class="{
                        'pointer-events-none select-none': !isUserSignedIn
                    }"
                ></textarea>
                <textarea
                    ref="fakeTextareaRef"
                    type="text"
                    name="fake-textarea"
                    class="fake-textarea absolute w-full opacity-0 top-14 left-0"
                    value="메세지를 입력해 주세요."
                ></textarea>
                <!-- <input
                    type="text"
                    hidden
                    class="fake-input absolute top-0 left-0 w-full h-full px-3 none-st"
                    value="메세지를 입력해 주세요."
                    @focus="onFocusInput"
                /> -->
            </label>
            <button
                type="button"
                class="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl ml-3 whitespace-nowrap"
                :class="inputText !== '' ? 'bg-cosign-gra' : 'bg-bg-gray-01'"
                @click="onClickSubmit"
            ><IconObjectSendMessage /></button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useFormEvents } from '~/composables/cosign-chat/business/useFormEvents';
import { useChatInputResizeObserver } from '~/composables/cosign-chat/business/useChatInputResizeObserver';
import { piniaAuthInfoValues } from '~/pinia/user/piniaAuthInfoValues';
import { useChatAlert } from '~/composables/cosign-chat/business/useChatAlert';

const { updateInputAreaHeight } = defineProps<{
    updateInputAreaHeight: (value: number) => void;
}>();

const { isMobile } = useDevice();
const { isUserSignedIn } = piniaAuthInfoValues();
const { openSigninAlert } = useChatAlert();

const {
    textareaRef, fakeTextareaRef, inputText,
    onInput, focusFlag, onfocus, onBlur,
    onClickSubmit, handleEnter, LINE_HEIGHT, MAX_TEXT_LENGTH,
} = useFormEvents();

const { chatInputRef } = useChatInputResizeObserver(updateInputAreaHeight);


const onFocusInput = () => {
    console.log('인풋 포커스')
}
</script>