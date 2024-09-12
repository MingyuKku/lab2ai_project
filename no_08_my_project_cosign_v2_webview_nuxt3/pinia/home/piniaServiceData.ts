import { PiniaHomeServiceData } from "../keys";
import type { SignIdListDataType } from "./_types";
import type { SignIdList } from "~/composables/home/service/_types";


export const piniaServiceData = defineStore(PiniaHomeServiceData, () => {

    const initViewCount = 20;
    
    const signIdList = reactive<SignIdListDataType>({
        total: [],
        startIndex: 0,
        endIndex: initViewCount,
        isLast: false,
        isMore: false,
    });

    const totalSignIdList = computed(() => signIdList.total);
    const startIndex = computed(() => signIdList.startIndex);
    const endIndex = computed(() => signIdList.endIndex);
    const isLast = computed(() => signIdList.isLast);
    const isMore = computed(() => signIdList.isMore);


    const setIsLast = () => {
        if (signIdList.total.length <= signIdList.endIndex) {
            signIdList.isLast = true;
        } else {
            signIdList.isLast = false;
        }
    }

    const initSignIdList = (value: SignIdList) => {
        signIdList.total = value;
        signIdList.startIndex = 0;
        signIdList.endIndex = initViewCount;
        setIsLast();
    }

    const setSignIdListIndex = (start: number) => {
        signIdList.startIndex = start;
        signIdList.endIndex = start + initViewCount;
        setIsLast();
    }

    const seIsMore = (value: boolean) => {
        signIdList.isMore = value;
    }
    
    return {
        signIdList,
        totalSignIdList,
        startIndex,
        endIndex,
        isLast,
        isMore,
        initSignIdList,
        setSignIdListIndex,
        seIsMore,
    }
})