<template>
    <div class="user-input">
        <input 
            :id="id" 
            :name="id"
            :type="type" 
            :autocomplete="autocomplete ?? 'on'"
            :placeholder="placeholder ?? ''"
            class="login-input-st"
        >
        <label :for="id">
            <span class="bar bg-black h-px"></span>
        </label>
    </div>
</template>

<script lang="ts" setup>
import type { InputTypeHTMLAttribute } from 'vue';


defineProps<{
    id: string;
    type: InputTypeHTMLAttribute;
    autocomplete?: 'on' | 'off';
    placeholder?: string;
}>()

</script>