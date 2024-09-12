<template>
    <div 
        class="toggle-button-wrap toggle-stick rounded-full relative transition-background cursor-pointer" 
        :style="{width: `${Number(stickSize ?? 34)}px`, height: `${Number(stickHeight ?? 14)}px`}"
        :class="{
            'bg-[#b2e5d6]': !styleMode && flag,
            'bg-[#DDDDDD]': !flag,
            'p-1': styleMode === 'mode-1',
            'bg-system-mint': styleMode === 'mode-1' && flag,
        }"
    >
        <div 
            class="button rounded-full shadow-04 absolute top-1/2 transition-all" 
            :style="{
                width: `${Number(buttonSize ?? 18)}px`, 
                height: `${Number(buttonSize ?? 18)}px`,
                transform: 
                    !styleMode 
                    ? flag 
                    ? `translate(${stickSize && buttonSize ? Number(stickSize) - Number(buttonSize) : 34 - 18}px, -50%)` : `translate(0, -50%)`
                    : flag
                    ? `translate(${stickSize && buttonSize ? Number(stickSize) - Number(buttonSize) - 8 : 34 - 18 - 8}px, -50%)` : `translate(0, -50%)`,
            }"
            :class="{
                'bg-system-mint': !styleMode && flag,
                'bg-bg-white': (!styleMode && !flag) || (styleMode === 'mode-1' && flag),
                'bg-bg-white border border-border-gray-01': styleMode === 'mode-1' && !flag
            }"
        ></div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    flag: boolean;
    buttonSize?: number | string;
    stickSize?: number | string;
    stickHeight?: number | string;
    styleMode?: 'mode-1'
}>();
  

</script>