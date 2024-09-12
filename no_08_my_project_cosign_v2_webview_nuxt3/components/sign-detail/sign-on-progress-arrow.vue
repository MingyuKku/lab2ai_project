<template>
    <div class="progress-arrow-wrap flex items-center">
        <div
            v-for="(cnt,idx) in count" :key="idx"
            class="relative w-3 h-3 bg-clip-text scale-x-75"
        >
            <span
                class="absolute xy-center text-[12px]"
                :class="`${ filledClass } ${filledClass}-${count}step-${idx+1}`"
                :style="{
                    'animation-duration': '800ms'
                }"
            >&#9654;</span>
        </div>
    </div>
</template>

<script setup lang="ts">

defineProps<{
    filledClass?: string;
}>();


const MAX_COUNT = 5; // 최대
const MIN_COUNT = 2; // 최소
const count = ref<number>(0); // 기본 화살표 갯수 = 0


const reactiveSpot = () => {
    const maxWidth = useDevice().isMobile ? 768 : 500;
    let react_count = Math.floor(Math.min(window.innerWidth, maxWidth) / 100);
    if (react_count > MAX_COUNT) react_count = MAX_COUNT;
    if (react_count < MIN_COUNT) react_count = MIN_COUNT;
    count.value = react_count;
}


onMounted(() => {
    reactiveSpot();
    window.addEventListener('resize', reactiveSpot);
})

onUnmounted(() => {
    window.removeEventListener('resize', reactiveSpot);
})
</script>