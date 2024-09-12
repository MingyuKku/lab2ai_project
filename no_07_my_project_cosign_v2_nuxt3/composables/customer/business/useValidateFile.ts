import type { SignupInputerrors } from "~/composables/user/sign-up/business/_types";

interface Props {
    fileErrors?: SignupInputerrors
}

export const useValidateFile = ({ fileErrors }: Props) => {

    const SIZE_UNIT = {
        ONE_KB: 1024,
        ONE_MB: 1024 * 1024,
        ONE_GB: 1024 * 1024 * 1024,
    }
    const FILE_SIZE_UNIT = 'MB';
    const MAX_FILE_SIZE_MB = 10;
    const MAX_FILE_LENGTH = 5;

    /**
     * @return 파일 사이즈 유효성 검사 통과시 true 반환
     */
    const checkFileSize = (size: number) => {
        if (!fileErrors) return;
        
        if (size / SIZE_UNIT.ONE_MB <= MAX_FILE_SIZE_MB) {
            fileErrors.rule.flag = false;
            return true;
        }

        fileErrors.rule.flag = true;
        return false;
    }


    /**
     * @return 파일 사이즈 유효성 검사 통과시 true 반환
     */
    const checkFileLength = (length: number) => {
        if (!fileErrors) return;
        
        if (length <= MAX_FILE_LENGTH) {
            fileErrors.rule.flag = false;
            return true;
        }

        fileErrors.rule.flag = true;
        return false;
    }


    return {
        SIZE_UNIT,
        FILE_SIZE_UNIT,
        checkFileSize,
        checkFileLength,
    }
}