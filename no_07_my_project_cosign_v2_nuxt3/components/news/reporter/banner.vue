<template>
    <div class="reporter-top-banner-wrap px-primary">
        <div
            class="
                reporter-top-banner relative
                rounded-r-[10px] rounded-ss-[10px] overflow-hidden flex items-center justify-between
                h-[150px] max-460:h-[130px]"
        >
            <div class="back-image absolute top-0 left-0 w-full h-full">
                <NuxtImg 
                    :src="description?.characterBackGroundImg"
                    alt="배경 이미지"
                    format="webp"
                    width="343"
                    height="130"
                    fit="cover"
                    class="h-full"
                />
            </div>
            <div v-if="description?.characterDisplayDescription" class="text pl-primary relative z-[1]">
                <h1 
                    v-for="description,idx in computedDescription" :key="idx" 
                    class="text-h2 text-font-white"
                >{{ description }}</h1>
            </div>
            <div 
                class="image relative z-[1] self-end shrink-0 w-[154px] max-460:w-[134px] max-360:w-[110px]" 
                :class="{'w-[200px] max-460:w-[170px] max-360:w-[146px]': reporterid === '1'}"
            >
                <NuxtImg 
                    :src="description?.characterImg"
                    alt="기자 이미지"
                    format="webp"
                    sizes="200px sm:146px md:170px"
                    class="w-full h-full object-cover object-center"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PERSONA_NEWS_REPORTER_DESCRIPTION } from '~/composables/_app/asyncDataFetchKeys';
import { useFetchNews } from '~/composables/news/service/useFetchNews';


const { params } = useRoute();
const { reporterid } = params;
const { getPersonaReporterDescription } = useFetchNews();


const dynamicFetchKey = `${PERSONA_NEWS_REPORTER_DESCRIPTION}-${reporterid}`;
const {
    data: description
} = await useAsyncData(
    dynamicFetchKey,
    () => getPersonaReporterDescription(dynamicFetchKey, reporterid as string)
)


const computedDescription = computed(() => {
    return description.value?.characterDisplayDescription ? description.value.characterDisplayDescription.split('\\n') : null;
})


</script>