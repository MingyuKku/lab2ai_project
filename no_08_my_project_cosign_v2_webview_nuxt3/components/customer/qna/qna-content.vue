<template>
    <div class="qna-content px-primary">
        <div class="q-content flex py-primary">
            <span class="text-h2 text-font-dark-03 mr-2">Q</span>
            <p class="text-body-5 mt-1">{{ content }}</p>
        </div>
        <div class="a-content flex py-primary border-t border-border-gray-03">
            <span class="text-h2 text-font-dark-03 mr-2">A</span>
            <div v-if="answer" class="text-body-5 mt-1" v-html="answer.content"></div>
            <p v-else class="text-body-5 mt-1 text-border-gray-01">답변을 기다리고 있습니다.</p>
        </div>
        <div class="files py-primary border-t border-border-gray-03 text-body-5">
            <div v-for="file,idx in siteInquiryFile" :key="idx" class="mr-1 mb-0.5 last:mb-0">
                <span class="mr-1">첨부파일:</span>
                <a :href="file.fileLink" target="_blank" class="text-font-dark-02 underline">{{ file.fileName }}</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { AnswerInquiryData, SiteInquiryFile } from '~/composables/customer/service/_types';


defineProps<{
    content: string;
    answer: AnswerInquiryData | null;
    siteInquiryFile: SiteInquiryFile[];
}>();

</script>