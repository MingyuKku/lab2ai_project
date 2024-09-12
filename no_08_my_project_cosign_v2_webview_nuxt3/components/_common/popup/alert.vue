<template>
    <transition name="opacity" mode="out-in">
        <div
            v-if="alertStore.alertValues.flag"
            class="cosing-alert-popup fixed top-1/2 z-40 bg-bg-white rounded py-primary px-3 w-[calc(100%-60px)] -translate-x-1/2 translate-y-[calc(-50%-40px)] max-w-desktop left-1/2"
        >
            <div class="title mt-[15px] mb-5">
                <h1 v-if="typeof alertStore.alertValues.title === 'string'" class="text-h4 leading-5 text-center">{{ alertStore.alertValues.title }}</h1>
                <h1
                    v-if="Array.isArray(alertStore.alertValues.title)"
                    v-for="title,idx in alertStore.alertValues.title" :key="idx"
                    class="text-h4 leading-5 text-center"
                >{{ title }}</h1>
            </div>
            <div class="description text-center">
                <p v-if="typeof alertStore.alertValues.description === 'string'" class="text-body-3r leading-6">{{ alertStore.alertValues.description }}</p>
                <p
                    v-if="Array.isArray(alertStore.alertValues.description)"
                    v-for="description,idx in alertStore.alertValues.description" :key="idx"
                    class="text-body-3r leading-6"
                >{{ description }}</p>
            </div>
            <div v-if="alertStore.alertValues?.buttons" class="buttons flex items-center justify-between mt-[30px]">
                <div
                    v-if="alertStore.alertValues.buttons?.left"
                    class="left-button d-button-st flex-1 flex items-center justify-center h-[50px] rounded !text-body-3 "
                    :class="computedButtonStyle(alertStore.alertValues?.buttons?.left.type)"
                    @click="alertStore.alertValues?.buttons?.left.onClick"
                >
                    {{ alertStore.alertValues?.buttons?.left.label }}
                </div>
                <div
                    v-if="alertStore.alertValues?.buttons?.center"
                    class="center-button d-button-st flex-1 flex items-center justify-center h-[50px] rounded !text-body-3 ml-3"
                    :class="computedButtonStyle(alertStore.alertValues?.buttons?.center.type)"
                    @click="alertStore.alertValues?.buttons?.center.onClick"
                >
                    {{ alertStore.alertValues?.buttons?.center.label }}
                </div>
                <div
                    v-if="alertStore.alertValues?.buttons?.right"
                    class="right-button d-button-st flex-1 flex items-center justify-center h-[50px] rounded !text-body-3 ml-3"
                    :class="computedButtonStyle(alertStore.alertValues?.buttons?.right.type)"
                    @click="alertStore.alertValues?.buttons?.right.onClick"
                >
                    {{ alertStore.alertValues?.buttons?.right.label }}
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import type { ButtonType } from '~/pinia/popup/_types';
import { piniaAlert } from '~/pinia/popup/piniaAlert';

// const { isMobile } = useDevice();

const alertStore = piniaAlert();

const computedButtonStyle = computed(() => {
    return (type?: ButtonType) => {
        if (type === 'OK') return 'bg-bg-black text-font-white';
        if (type === 'CANCLE') return 'bg-bg-white text-font-black border border-border-black'
        return 'bg-bg-black text-font-white'
    }
})

const { afterEach } = useRouter();

afterEach((to, from) => {
    if (!alertStore.alertValues.flag) return;

    alertStore.hiddenAlert();
})



</script>