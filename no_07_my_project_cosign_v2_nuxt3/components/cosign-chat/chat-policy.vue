<template>
    <div
        v-if="flag"
        class="cosign-chat-policy fixed w-full max-w-desktop z-40 h-viewScreen"
    >
        <div class="absolute w-[calc(100%-36px)] xy-center bg-bg-white rounded pt-7 pb-8 px-primary">
            <IconObjectClose @click="onClickClose" :size="20" class="absolute top-primary right-primary cursor-pointer"/>
            <div class="title">
                <h1 class="text-center text-h3 mb-space-between-y-md">코싸인챗 운영 정책</h1>
                <div v-for="item,idx in POLICY" :key="idx" class="flex mb-1 last:mb-0">
                    <div class="shrink-0 p-1.5"><span class="block w-1 h-1 rounded-full bg-font-dark-01"></span></div>
                    <p class="text-body-3r">{{ item }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { piniaPopup } from '~/pinia/popup/piniaPopup';

const { updateFlag } = defineProps<{
    flag: boolean;
    updateFlag: (value: boolean) => void;
}>();

const { togglePopupFlag } = piniaPopup();

const POLICY = [
    `채팅은 200글자 이내로 작성가능 합니다.`,
    `코싸인 콘텐츠에 대한 대화 또는 코인 투자 전반에 걸친 대화를 자유롭게 하실 수 있습니다.`,
    `닉네임 옆에 '프리미엄', '베이직'이라고 표시되는 이용자는 현재 해당 이용권을 이용하고 게신 유료 상품 회원입니다.`,
    `욕설, 비방, 광고성 대화의 경우 발견 시, 경고 없이 즉시 삭제됩니다.`,
    `타 이용자에 의해 3회 이상 신고된 대화는 목록에서 가림 처리됩니다.`,
    `지속적으로 건전에 채팅 운영에 해를 끼치는 이용자의 경우 채팅 사용을 차단할 수 있습니다.`,
]


const onClickClose = () => {
    togglePopupFlag(false);
    updateFlag(false);
}

</script>