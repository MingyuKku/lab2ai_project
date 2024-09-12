<template>
    <div class="desktop-visual-always-content w-[476px] mr-space-bottom-lg">
        <div class="center-inner fixed y-center w-[476px]">
            <div class="app-image w-[197px] h-[220px] mx-auto">
                <NuxtImg 
                    src="https://kr.object.ncloudstorage.com/cosign/version2/common/only-desktop-app-img.png" 
                    alt="center" 
                    format="webp" 
                    width="274" 
                    height="226"
                    preload
                />
            </div>
            <div class="text text-h1 text-center mt-3">
                <h1>특허받은 AI 모델로 검증된 SIGN을</h1>
                <h1 class="text-position-short">앱에서 편리하게 만나보세요!</h1>
            </div>
            <div class="download-links flex items-center justify-center mt-9">
                <a
                    href="https://apps.apple.com/kr/app/%EC%BD%94%EC%8B%B8%EC%9D%B8-cosign-ai-24%EC%8B%9C%EA%B0%84-%EC%BD%94%EC%9D%B8-%EC%8B%9C%EC%9E%A5%EA%B0%90%EC%A7%80/id6444056551"
                    target="_blank"
                    class="image-wrap block w-[134px] mr-1.5"
                >
                    <NuxtImg 
                        src="https://kr.object.ncloudstorage.com/cosign/version1/common/app-store-down.svg" 
                        alt="download-image" 
                        format="webp"
                        loading="lazy"
                        width="126"
                        height="40"
                    />
                </a>
                <a
                    href="https://play.google.com/store/apps/details?id=com.lab2ai.cosign"
                    target="_blank"
                    class="image-wrap block w-[140px]"
                >
                    <NuxtImg 
                        src="https://kr.object.ncloudstorage.com/cosign/version1/common/google-play-down.png" 
                        alt="download-image" 
                        format="webp"
                        loading="lazy"
                        width="126"
                        height="50"
                    />
                </a>
            </div>
        </div>
    </div>
</template>