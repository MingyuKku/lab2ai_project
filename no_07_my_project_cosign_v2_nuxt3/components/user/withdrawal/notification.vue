<template>
    <div class="withdrawal-notification">
        <div class="info-title flex items-center justify-center py-6">
            <div class="icon-wrap w-3.5 mr-1"><IconObjectInfo fill="black" /></div>
            <h1 class="text-cap-1m">회원 탈퇴 및 계정 삭제 전에 안내 사항을 확인해 주세요.</h1>
        </div>
        <ul class="info-list text-font-dark-01">
            <li class="flex mb-3">
                <span class="dot shrink-0 w-1 h-1 bg-bg-black rounded-full mt-1.5"></span>
                <div class="text-cap-1r ml-1">
                    <p class="text-justify leading-4 break-all">사용하고 계신 계정 ( {{ email }} )은 탈퇴할 경우 재사용 및 복구가 불가능합니다.</p>
                    <p class="text-justify leading-4 break-all">탈퇴한 이메일은 본인과 타인 모두 재사용 및 복구가 불가하오니 신중하게 선택하시기 바랍니다.</p>
                </div>
            </li>
            <li class="flex mb-3">
                <span class="dot shrink-0 w-1 h-1 bg-bg-black rounded-full mt-1.5"></span>
                <div class="text-cap-1r ml-1">
                    <p class="text-justify break-all">탈퇴 후 회원정보 및 서비스 이용기록은 모두 삭제되며, 삭제된 데이터는 복구되지 않습니다.</p>
                </div>
            </li>
            <li class="flex mb-3">
                <span class="dot shrink-0 w-1 h-1 bg-bg-black rounded-full mt-1.5"></span>
                <div class="text-cap-1r ml-1">
                    <p class="text-justify break-all">탈퇴 후에도 게시판형 서비스에 등록된 게시글은 그대로 남아 있습니다.</p>
                </div>
            </li>
        </ul>
        <div class="agree mt-6">
            <input
                id="event-ck"
                type="checkbox"
                :checked="agree"
                @change="changeChecked"
                hidden
            >
            <label for="event-ck" class="flex items-center cursor-pointer">
                <div
                    class="w-4 h-4 rounded-full p-0.5 border"
                    :class="agree ? 'bg-position-short border-position-short' : 'border-position-short'"
                >
                    <IconCheckSm v-if="agree" />
                </div>
                <p class="text-body-3r ml-2 text-position-short">위 안내사항을 모두 숙지하였고 이에 동의합니다.</p>
            </label>
        </div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
    email?: string | null;
    agree: boolean;
    updateAgree: (value: boolean) => void;
}>();


const changeChecked = () => {
    const { agree, updateAgree } = props;
    updateAgree(!agree);
}


</script>