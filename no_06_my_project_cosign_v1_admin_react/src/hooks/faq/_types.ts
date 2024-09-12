const faqSortType = {
    'latest': '최신순',
    'views': '조회순'
} as const;

export type FaqSortType = keyof typeof faqSortType;
export type FaqSortTypeLabel = typeof faqSortType[keyof typeof faqSortType];


const CategoryType = {
    'SERVICE_USAGE': '서비스이용',
    'ACCOUNT': '계정',
    'PAYMENT': '결제',
    'PARTNERSHIP': '제휴',
    'NOTIFICATION': '공지',
    'GUIDE': '안내',
} as const;

export type FaqCategoryType = keyof typeof CategoryType;
export type FaqCategoryTypeLabel = typeof CategoryType[keyof typeof CategoryType];

export interface CommonListRes {
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: object;
    size: number;
    sort: object;
    totalElements: number;
    totalPages: number;
}

export interface FaqListRes extends CommonListRes {
    content: FaqListItem[];
}

interface FaqListItem {
    categoryType: FaqCategoryType;
    content: string;
    count: number;
    createdAt: string;
    deleteCk: boolean;
    id: number;
    title: string;
    updatedAt: string;
}



export type FaqRegistParams = {
    id?: string;
    category?: string;
    title?: string;
    content?: string;
    editorFile?: string[]
}

export interface QuestionDetail {
    categoryType: FaqCategoryType;
    content: string;
    count: number;
    createdAt: string;
    deleteCk: boolean;
    id: number;
    title: string;
    updatedAt: string;
}