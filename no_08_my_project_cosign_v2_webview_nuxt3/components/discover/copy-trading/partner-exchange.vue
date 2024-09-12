
import type { messageWebview } from '~/composables/_app/useFlutterWebview';
<template>
    <div class="partner-exchange pt-space-top-md pb-space-bottom-md border-t border-border-gray-04 border-dashed">
        <div>
            <h1 class="text-cap-1r">파트너 거래소</h1>
            <div class="grid grid-cols-2 gap-3 mt-3">
                <div
                    class="flex flex-col items-center justify-center rounded-lg border border-border-dark-01 bg-bg-gray-04 h-[58px]"
                    @click="messageWebview(`https://cosign/external_link?url=https://www.binance.com/en/copy-trading/lead-details/3887739520667559168`)"
                >
                    <div class="logo w-[105px] h-6">
                        <NuxtImg
                            src="https://kr.object.ncloudstorage.com/cosign/version2/common/binance-logo.png"
                            alt="logo"
                            width="105" height="24"
                            format="webp"
                            loading="lazy"
                            class="h-full object-cover"
                        />
                    </div>
                    <div class="text-center leading-none">
                        <span class="text-body-4 text-font-dark-01 mr-0.5 align-middle">Copy</span>
                        <IconObjectLink class="inline-block" />
                    </div>
                </div>
                <div
                    class="flex flex-col items-center justify-center rounded-lg border border-border-dark-01 bg-bg-gray-04 h-[58px]"
                    @click="messageWebview(`https://cosign/external_link?url=https://i.bybit.com/seJabnp`)"
                >
                    <div class="logo w-[105px] h-6">
                        <NuxtImg
                            src="https://kr.object.ncloudstorage.com/cosign/version2/common/bybit-logo.png"
                            alt="logo"
                            width="105" height="24"
                            format="webp"
                            loading="lazy"
                            class="h-full object-cover"
                        />
                    </div>
                    <div class="text-center leading-none">
                        <span class="text-body-4 text-font-dark-01 mr-0.5 align-middle">Copy</span>
                        <IconObjectLink class="inline-block" />
                    </div>
                </div>
                <div
                    class="flex flex-col items-center justify-center rounded-lg border border-border-dark-01 bg-bg-gray-04 h-[58px]"
                    @click="messageWebview(`https://cosign/external_link?url=https://www.okx.com/copy-trading/account/92942E12F694FD65?tab=swap`)"
                >
                    <div class="logo w-[105px] h-6">
                        <NuxtImg
                            src="https://kr.object.ncloudstorage.com/cosign/version2/common/okx-logo.png"
                            alt="logo"
                            width="105" height="24"
                            format="webp"
                            loading="lazy"
                            class="h-full object-cover"
                        />
                    </div>
                    <div class="text-center leading-none">
                        <span class="text-body-4 text-font-dark-01 mr-0.5 align-middle">Copy</span>
                        <IconObjectLink class="inline-block" />
                    </div>
                </div>
                <!-- 기존 https://cosign/external_link?url=https://www.zoomex.com/copyTrade/trade-center/detail?leaderMark=wRlhnc/GWULc+lKklFmeQw== -->
                <div
                    class="flex flex-col items-center justify-center rounded-lg border border-border-dark-01 bg-bg-gray-04 h-[58px]"
                    @click="messageWebview(`https://cosign/external_link?url=https%3A%2F%2Fwww.zoomex.com%2FcopyTrade%2Ftrade-center%2Fdetail%3FleaderMark%3DwRlhnc%2FGWULc%2BlKklFmeQw%3D%3D`)"
                >
                    <div class="logo w-[105px] h-6">
                        <NuxtImg
                            src="https://kr.object.ncloudstorage.com/cosign/version2/common/zoomex-logo.png"
                            alt="logo"
                            width="105" height="24"
                            format="webp"
                            loading="lazy"
                            class="h-full object-cover"
                        />
                    </div>
                    <div class="text-center leading-none">
                        <span class="text-body-4 text-font-dark-01 mr-0.5 align-middle">Copy</span>
                        <IconObjectLink class="inline-block" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { messageWebview } from '~/composables/_app/useFlutterWebview';



</script>