<template>
    <div v-if="profile" class="aimodel-profile bg-bg-black pt-space-top-lg pb-space-bottom-lg">
        <div class="model-feature flex items-center px-primary ">
            <div class="image-gif-wrap relative shrink-0">
                <LazyAimodelDetailProfileAnimation />
                <div class="model-image model-image-lg absolute xy-center">
                    <NuxtImg
                        :src="`${config.public.IMAGE_URL}version2/model-image/large/${profile?.modelId}.png`"
                        :alt="profile.modelId"
                        width="68" height="56"
                        format="webp"
                    />
                </div>
            </div>
            <div class="desc ml-4">
                <div class="tags flex items-center mb-3">
                    <p
                        v-for="(tag, idx) in profileTages"
                        :key="idx"
                        class="text-body-4 mr-2 text-font-white last:mr-0"
                    >{{ tag }}</p>
                </div>
                <div class="text">
                    <p class="text-body-4 text-border-gray-01">{{ profile.description }}</p>
                </div>
            </div>
        </div>
        <AimodelDetailProfileStats
            :profile="profile"
        />
    </div>
</template>

<script lang="ts" setup>
import type { ModelProfileDetail } from '~/composables/aimodel-detail/service/_types';


const props = defineProps<{
    profile: ModelProfileDetail | null;
}>();

const config = useRuntimeConfig();


const profileTages = computed(() => props.profile ? props.profile.tag?.split('|') : [])


// const { getModelDetail } = useFetchAimodelDetail();
// const { params } = useRoute();
// const { modelid } = params;

// const dynamicFetchKey = `${MODEL_DETAIL}-${modelid}`;
// const {
//     data: profile,
// } = await useAsyncData(
//     dynamicFetchKey,
//     () => getModelDetail(dynamicFetchKey, modelid as string)
// )


// let profileSrc = ref(`${config.public.IMAGE_URL}version2/model-image/large/${profile.value?.modelId}.png`);

// updateHeaderData({
//     modelName: profile.value?.modelName ?? null,
//     tradeType: profile.value?.modelType ?? null
// })


// console.log('프로필', profile.value)


</script>