<template>
    <div class="app-download p-2.5">
        <div class="title flex items-center justify-center">
            <div class="image-wrap w-5 h-5 mr-2.5">
                <NuxtImg
                    src="https://kr.object.ncloudstorage.com/cosign/lab2ai/app-logo.png"
                    alt="앱 아이콘"
                    width="20" height="20"
                    format="webp"
                    loading="lazy"
                />
            </div>
            <h2 class="ml-primary text-14 font-medium">코싸인 앱 다운로드</h2>
        </div>
        <div class="down-image-wrap mt-[15px] flex items-center justify-center">
            <NuxtLink
                class="image-wrap block ios min-w-[130px] w-[25%] mr-[30px]"
                target="_blank"
                to="https://apps.apple.com/kr/app/%EC%BD%94%EC%8B%B8%EC%9D%B8-cosign-ai-24%EC%8B%9C%EA%B0%84-%EC%BD%94%EC%9D%B8-%EC%8B%9C%EC%9E%A5%EA%B0%90%EC%A7%80/id6444056551"
            >
                <NuxtImg
                    src="https://kr.object.ncloudstorage.com/cosign/version2/common/app-store-down.svg"
                    alt="앱스토어"
                    format="webp"
                    loading="lazy"
                />
            </NuxtLink>
            <NuxtLink
                class="image-wrap block android min-w-[140px] w-[27%]"
                target="_blank"
                to="https://play.google.com/store/apps/details?id=com.lab2ai.cosign"
            >
                <NuxtImg
                    src="https://kr.object.ncloudstorage.com/cosign/version2/common/google-play-down.png"
                    alt="구글플레이"
                    format="webp"
                    loading="lazy"
                />
            </NuxtLink>
        </div>
    </div>
</template>