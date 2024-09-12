<template>
    <div
        class="no-content flex items-center flex-col"
        :style="{
            'padding-top': `${paddingTop}px`
        }"
    >
        <div class="w-[60px] mb-3">
            <NuxtImg
                src="https://kr.object.ncloudstorage.com/cosign/version2/common/no-content.jpg"
                alt="no-content"
                loading="lazy"
                format="webp"
                width="60" height="50"
            />
        </div>
        <h1 class="text-h6 text-font-dark-01">선택한 조건의 SIGN이 없어요.</h1>
        <p class="text-body-4 text-font-dark-02 mt-0.5">조건을 바꿔보세요.</p>
    </div>
</template>

<script lang="ts" setup>


const paddingTop = ref(120);
const FILTER_HEIGHT = 142;
const HERDER_HEIGHT = 60;
onMounted(() => {
    paddingTop.value = (window.innerHeight / 2) - FILTER_HEIGHT - HERDER_HEIGHT;
})

</script>