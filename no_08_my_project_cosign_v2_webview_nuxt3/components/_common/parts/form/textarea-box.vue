<template>
    <div class="data-textarea-box">
        <h2 v-if="label" class="mb-1 text-body-2">{{ label }}</h2>
        <textarea
            :value="value"
            :cols="cols"
            :rows="rows"
            :placeholder="placeholder"
            @input="onInput"
            class="none-st block w-full text-body-3r placeholder:text-border-gray-01 border border-border-gray-04 rounded p-3 focus:border-system-mint"
            :class="{'border-position-short': isError,}"
        ></textarea>
    </div>
</template>

<script lang="ts" setup>
import type { SignupInputerrors } from '~/composables/user/sign-up/business/_types';


const { setValue, errors } = defineProps<{
    label?: string;
    value?: string;
    setValue?: (value: string) => void;
    cols?: string;
    rows?: string;
    placeholder?: string;
    errors?: SignupInputerrors;
}>()


const onInput = (e: Event) => {
    if (!setValue) return;
    
    const target = e.target as HTMLInputElement;
    setValue(target.value);
}


/**
 * @returns 에러 객체의 속성들 중 하나라도 flag값이 true일 경우 true를 반환
 */
 const isError = computed(() => {
    if (!errors) return false;
    // const errorFlagTrue = Object.entries(errors)
    const errorFlagTrue = Object.values(errors);
    return errorFlagTrue.some(item => (item && item.flag))
})


</script>