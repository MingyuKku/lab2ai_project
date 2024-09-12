import React from "react";
import { useCheckHistoryItemPopupProvider } from '@/context/Chek-history-item-popup-provicer';
import { useSetRecoilState } from 'recoil';
import { checkHistoryState } from '@/lib/recoil/atoms/check-history-origin-text';
import { CheckHistoryOriginText } from '@/lib/recoil/atoms/_types';
import { FactValuesType } from '@/constants/_types';


export const usePopupDetailFilter = () => {

    const setCheckHistoryState = useSetRecoilState(checkHistoryState);
    const { item, scrollElem, updatePopupScrollElemHeight } = useCheckHistoryItemPopupProvider();

    const [ filter, setFilter ] = React.useState<FactValuesType | null>(null);
    const [ docsBottomDetailsInfos, setDocsBottomDetailsInfos ] = React.useState(item?.docsBottomDetailsInfos);
    

    React.useEffect(() => {
        if (!item) return;

        const content = item.docsBottomDetailsInfos.map<CheckHistoryOriginText>(detail => ({
            id: detail.queryId,
            text: detail.query
        }))
        setCheckHistoryState(content);
    }, [item])


    React.useEffect(() => {
        if (!item) return;

        if (filter === null) {
            setDocsBottomDetailsInfos(item.docsBottomDetailsInfos);
        } else {
            setDocsBottomDetailsInfos(item.docsBottomDetailsInfos.filter(info => info.docsSentenceFactCheckResultInfo.result === filter))
        }

    }, [filter])



    React.useEffect(() => {
        // 필터를 변경해 docsBottomDetailsInfos값이 업데이트될 때 scrollElem 요소의 스크롤 높이값을 갱신한다
        if (!scrollElem?.current || !updatePopupScrollElemHeight) return;
        updatePopupScrollElemHeight(scrollElem.current.scrollHeight)
    }, [docsBottomDetailsInfos])


    return {
        filter,
        setFilter,
        docsBottomDetailsInfos,
    }
}