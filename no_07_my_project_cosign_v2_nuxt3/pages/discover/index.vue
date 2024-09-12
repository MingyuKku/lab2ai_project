<template>
    <div class="discover-page pt-app-header">
        <CommonHeadersAppHeader>
            <template #left>
                <!-- <h1 v-if="isMobile" class="text-h1">디스커버</h1> -->
                <IconBrandCosignFull />
            </template>
            <template #right>
                <CommonHeadersBasicMenu />
            </template>
        </CommonHeadersAppHeader>
        <main>
            <section>
                <DiscoverChartReport title="차트의 발견" />
                <CommonAd
                    class="min-h-[100px] bg-bg-white"
                    :adsense="{
                        slot: '4828879830',
                        widthResponsive: true,
                        style: {
                            'display': 'block',
                            'height': '100px'
                        }
                    }"
                    :adfit="{
                        src: '//t1.daumcdn.net/kas/static/ba.min.js',
                        unit: 'DAN-XeQX2pPO47fRNwP8',
                        width: '320',
                        height: '100',
                    }"
                />
            </section>
            <section>
                <DiscoverCopyTrading />
            </section>
        </main>
    </div>
</template>


<script lang="ts" setup>
import { useMetaHead } from '~/composables/_app/useMetaHead';


const { setMetaOg } = useMetaHead();
setMetaOg({
    title: '특허받은 AI 모델로 예측하는 현물/선물 가상화폐 시세 예측',
    description: '실시간으로 변하는 코인 시장을 감지하여 업비트에 상장되어 있는 코인의 급등/급락 정보를 가장 빨리 포착할 수 있습니다.'
})

</script>