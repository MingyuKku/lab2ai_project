<template>
    <div>
        <div class="title">
            <label class="d-button-st h-[50px] bg-bg-white border border-border-gray-04 text-font-dark-03" for="inputFile">
                <span class="w-5 mr-1"><IconObjectPicture fill="#929AA5" /></span>
                <span class="text-cap-1r">사진 첨부하기</span>
            </label>
            <input 
                class="hidden"
                type="file" 
                multiple
                id="inputFile" 
                ref="DOM_inputFile" 
                accept="image/jpg, image/jpeg, image/png"
                @change="uploadFile"
            >
        </div>
        <div
            v-for="(file,idx) in files.attachFileList" :key="idx"
            class="flex items-center justify-between mt-1 p-3 border border-border-gray-05 group hover:border-border-gray-03 rounded"
        >
            <p class="text-body-3r text-font-dark-03">{{ file.name }}</p>
            <div class="right flex items-center text-body-3r text-font-dark-03">
                <p class="fileVolume">{{(file.size / SIZE_UNIT.ONE_MB).truncateDecimal(100)}}{{ FILE_SIZE_UNIT }}</p>
                <span @click="deleteFile(idx)" class="cursor-pointer text-[16px] font-medium group-hover:text-font-black ml-2">&#10005;</span>
            </div>
        </div>
        <div v-if="tips && !isError" class="tips flex items-center mt-2">
            <div class="w-3 mr-1"><IconObjectInfo fill="#4B5058" /></div>
            <p class="text-cap-2m font-normal text-font-dark-01">{{ tips }}</p>
        </div>
        <div v-if="errors" class="errors mt-2">
            <div
                v-for="error,idx in errors" :key="idx"
                class="mb-1.5 last:mb-0"
            >
                <div v-if="error?.flag" class="flex items-center">
                    <div class="w-3 mr-1"><IconObjectInfo fill="#F3475D" /></div>
                    <p class="text-cap-2m font-normal text-position-short">{{ error.label }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { QnaFiles } from '~/composables/customer/business/_types';
import { useValidateFile } from '~/composables/customer/business/useValidateFile';
import type { SignupInputerrors } from '~/composables/user/sign-up/business/_types';


const props = defineProps<{
    files: QnaFiles;
    tips?: string;
    errors?: SignupInputerrors;
    updateFiles: (fileList: FileList | null) => void;
    deleteFile: (idx: number) => void;
}>();

const { FILE_SIZE_UNIT, SIZE_UNIT } = useValidateFile({});


const uploadFile = (e:Event) => {
    const target = e.target as HTMLInputElement;

    props.updateFiles(target.files)

    target.value = '';
}


/**
 * @returns 에러 객체의 속성들 중 하나라도 flag값이 true일 경우 true를 반환
 */
 const isError = computed(() => {
    if (!props.errors) return false;
    // const errorFlagTrue = Object.entries(errors)
    const errorFlagTrue = Object.values(props.errors);
    return errorFlagTrue.some(item => (item && item.flag))
})


</script>