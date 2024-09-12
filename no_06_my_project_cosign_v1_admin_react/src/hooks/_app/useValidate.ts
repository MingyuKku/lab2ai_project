export const useValidate = () => {
    /**
     * 입력된 텍스트가 공백으로만 이루어져 있는지 검사
     * @returns 통과시 true 반환
     */
    const checkValidateTextBlank = (value: string, setError: React.Dispatch<React.SetStateAction<boolean>>) => {
        const noneBlankText = value.replace(/\s+/g, '');

        if (noneBlankText.length > 0) return true;
        
        setError(true);
        return false;
    }


    return {
        checkValidateTextBlank,
    }
}