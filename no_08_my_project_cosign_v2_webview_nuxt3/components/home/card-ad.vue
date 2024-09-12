<template>
    <div
        class="card-ad"
        :class="isDev() ? 'pointer-events-none select-none' : ''"
    >
        <div class="w-full">
            <CommonAd
                class="min-h-[200px] text-center"
                :adsense="{
                    slot: '9951301238',
                    layoutKey: '-6d+cb-8-4s+o3',
                    format: 'fluid',
                    style: {
                        'display': 'block',
                    }
                }"
                :adfit="{
                    src: '//t1.daumcdn.net/kas/static/ba.min.js',
                    unit: 'DAN-I4bV8Se5qBhVcAX9',
                    width: '300',
                    height: '250',
                }"
            />
        </div>
        
    </div>
</template>

<script lang="ts" setup>
import { useCommon } from '~/composables/_app/useCommon';

const { isDev } = useCommon();

</script>