import type { SignIdList } from "~/composables/home/service/_types";

export interface SignIdListDataType {
    total: SignIdList;
    startIndex: number;
    endIndex: number;
    isLast: boolean; // 더 불러올 데이터가 있는지 여부를 판별하기 위함
    isMore: boolean; // 데이터 패치가 스크롤 더보기용인지 아닌지 판별하기 위함
} 