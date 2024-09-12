<template>
    <div class="data-input">
        <h2 v-if="label" class="mb-1 text-body-3">{{ label }}</h2>
        <input
            :id="id" 
            :name="id"
            :type="type" 
            :autocomplete="autocomplete ?? 'on'"
            :placeholder="placeholder ?? ''"
            @input="onInput"
            class="login-input-st !text-cap-1r px-1.5"
        >
        <label :for="id">
            <span class="bar bg-black h-px"></span>
        </label>
        <div v-if="tips" class="tips flex items-center mt-1.5">
            <div class="w-3 mr-1"><IconObjectInfo fill="#000" /></div>
            <p class="text-cap-2m font-normal">{{ tips }}</p>
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


const { setValue } = defineProps<{
    id: string;
    type: InputTypeHTMLAttribute;
    setValue: (value: any) => void;
    label?: string;
    tips?: string;
    errors?: SignupInputerrors;
    autocomplete?: 'on' | 'off';
    placeholder?: string;
}>()

const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
}

</script>