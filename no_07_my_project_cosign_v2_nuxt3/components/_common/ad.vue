<template>
    <div class="ad-component-wrap">
        <div ref="adins"></div>
        <div ref="adpush"></div>
    </div>
</template>

<script lang="ts" setup>
import type { StyleValue } from 'vue/dist/vue.js';


const props_ad = defineProps<{
  adsense: {
    slot: string;
    layout?: string;
    layoutKey?: string;
    format?: string;
    style?: StyleValue;
    widthResponsive?: boolean;
  };
  adfit: {
    src: string;
    unit: string;
    width: string;
    height: string;
  }
}>();


const adsenseClientId = '8783218127052555';
const adins = ref<HTMLDivElement | null>(null);
const adpush = ref<HTMLDivElement | null>(null);

function setAdsenseOption(ins: HTMLElement) {
    if (props_ad.adsense.layout) ins.setAttribute('data-ad-layout', props_ad.adsense.layout);
    if (props_ad.adsense.layoutKey) ins.setAttribute('data-ad-layout-key', props_ad.adsense.layoutKey);
    if (props_ad.adsense.format) ins.setAttribute('data-ad-format', props_ad.adsense.format);
    if (props_ad.adsense.widthResponsive !== undefined) {
        props_ad.adsense.widthResponsive ? ins.setAttribute('data-full-width-responsive', 'true') : ins.setAttribute('data-full-width-responsive', 'false');
    }
    if (props_ad.adsense.style) Object.assign(ins.style, props_ad.adsense.style);
}

function createGoogleAdSense() {
    const ins = document.createElement('ins') as HTMLElement;
    ins.classList.value = "adsbygoogle";
    ins.setAttribute('data-ad-client', `ca-pub-${adsenseClientId}`);
    ins.setAttribute('data-ad-slot', props_ad.adsense.slot);
    setAdsenseOption(ins);
    adins.value?.appendChild(ins);

    const script = document.createElement('script') as HTMLScriptElement;
    script.text = `
        (adsbygoogle = window.adsbygoogle || []).push({});
    `;
    script.async = true;
    adpush.value?.appendChild(script);
}

function createKakaoAdfit() {
    const ins = document.createElement("ins") as HTMLElement;
    ins.classList.value = "kakao_ad_area";
    ins.style.display = "none";
    ins.setAttribute("data-ad-unit", props_ad.adfit.unit);
    ins.setAttribute("data-ad-width", props_ad.adfit.width);
    ins.setAttribute("data-ad-height", props_ad.adfit.height);
    adins.value?.appendChild(ins);

    const script = document.createElement('script') as HTMLScriptElement;
    script.type = 'text/javascript';
    script.src = props_ad.adfit.src;
    script.async = true;
    adpush.value?.appendChild(script);
}



let mutationObserver:MutationObserver | null = null;

onMounted(async () => {

    createGoogleAdSense();
    await nextTick();

    const mutateCallback:MutationCallback = (mutationsList) => {
        let getStatus:string | null = null;

        for (let mutation of mutationsList) {
            
            if (mutation.type !== 'attributes') break;
            if (mutation.attributeName !== 'data-ad-status') break;

            getStatus = adins.value?.children[0].getAttribute('data-ad-status') ?? null;
            

            // filled = 광고가 광고 단위로 반환되어 현재 게재 중입니다
            // unfilled = 반환된 광고가 없으며 광고 단위가 비어 있습니다.
            if (getStatus !== 'filled') {
                Array.from(adins.value!.children).forEach(child => { child.remove(); });
                Array.from(adpush.value!.children).forEach(child => { child.remove(); });
                mutationObserver?.disconnect();
                createKakaoAdfit();
            }
        }
    }

    const options:MutationObserverInit = {
        childList: true,
        subtree: true,
        attributes: true,
        // attributeOldValue: true,
    }
    
    if (adins.value) {
        mutationObserver = new MutationObserver(mutateCallback);
        mutationObserver.observe(adins.value, options);
    }
})

onUnmounted(() => {
    mutationObserver?.disconnect();
})

</script>