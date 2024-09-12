import React from "react";
import { FaqCategoryType, FaqCategoryTypeLabel } from "./_types";

export const useGetText = () => {
    const categoryText = React.useCallback((categoryType: FaqCategoryType): FaqCategoryTypeLabel => {
        switch (categoryType) {
            case 'ACCOUNT': return '계정';
            case 'GUIDE': return '안내';
            case 'NOTIFICATION': return '공지';
            case 'PARTNERSHIP': return '제휴';
            case 'PAYMENT': return '결제';
            case 'SERVICE_USAGE': return '서비스이용';
        }
    }, [])



    return {
        categoryText,
    }
}