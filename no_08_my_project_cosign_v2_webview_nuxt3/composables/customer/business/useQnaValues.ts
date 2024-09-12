import type { QnaFiles, QnaRegistValue } from "./_types"

export const useQnaValues = () => {

    const qnaValue = reactive<QnaRegistValue>({
        content: {
            id: 'textarea',
            value: '',
            label: '문의 내용',
            placeholder: '내용을 입력해 주세요.',
            setValue: (value: any) => {
                qnaValue.content.value = value;
            }
        },
        files: {
            attachFileList: [],
            attachFileSize: 0,
            tips: '사진은 최대 5장, 10MB 이내로 등록할 수 있습니다.',
            errors: {
                rule: {
                    label: '사진은 최대 5장, 10MB 이내로 등록할 수 있습니다.',
                    flag: false,
                },
            },
        }
    })

    
    const updateFiles = (fileList: FileList | null) => {
        if (!fileList) return;
        
        for (let i = 0; i < fileList.length; i++) {
            let checkFileType = ['image/png','image/jpg','image/jpeg']
            if (!checkFileType.includes(fileList[i].type)) return;
            
            qnaValue.files.attachFileList.push(fileList[i]);
            qnaValue.files.attachFileSize += fileList[i].size;
        }
    }


    const deleteFile = (idx: number) => {
        qnaValue.files.attachFileSize -= qnaValue.files.attachFileList[idx].size;
        qnaValue.files.attachFileList.splice(idx,1);
    }


    return {
        qnaValue,
        updateFiles,
        deleteFile,
    }
}