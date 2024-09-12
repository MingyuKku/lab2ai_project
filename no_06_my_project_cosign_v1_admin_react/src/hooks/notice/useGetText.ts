
export const useGetText = () => {
    
    const answerText = (answerCk: boolean) => {
        if (answerCk) return '답변완료';
        if (!answerCk) return '답변대기';
    }
    

    return {
        answerText,
    }
}