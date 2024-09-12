<template>
    <div class="data-input-box">
        <h2 v-if="label" class="mb-1 text-body-2">{{ label }}</h2>
        <input
            :id="id"
            :name="id"
            :value="value"
            :type="type" 
            :autocomplete="autocomplete ?? 'on'"
            :placeholder="placeholder ?? ''"
            @input="onInput"
            :disabled="disabled"
            class="none-st block w-full h-10 text-body-3r placeholder:text-border-gray-01 border border-border-gray-04 rounded px-3 focus:border-system-mint"
            :class="{'border-position-short': isError, 'bg-bg-gray-05 text-font-dark-02': disabled}"
        >
        <div v-if="tips" class="tips flex items-center mt-2">
            <div class="w-3 mr-1"><IconObjectInfo fill="#4B5058" /></div>
            <p class="text-cap-2m font-normal text-font-dark-01">{{ tips }}</p>
        </div>
        <div v-if="errors" class="errors mt-2">
            <div
                v-for="error,idx in errors" :key="idx"
                class="mb-1.5 last:mb-0"
            >
                <div v-if="error?.flag" class="flex items-center">
                    <div class="w-3 mr-1"><IconObjectInfo fill="#F3475D" /></div>
                    <p class="text-cap-2m font-normal text-position-short">{{ error.label }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { InputTypeHTMLAttribute } from 'vue';
import type { SignupInputerrors } from '~/composables/user/sign-up/business/_types';


const { setValue, disabled, errors } = defineProps<{
    id: string;
    type: InputTypeHTMLAttribute;
    value?: any;
    setValue?: (value: any) => void;
    label?: string;
    tips?: string;
    errors?: SignupInputerrors;
    autocomplete?: 'on' | 'off';
    placeholder?: string;
    disabled?: boolean;
}>()

const onInput = (e: Event) => {
    if (!setValue || disabled) return;
    
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