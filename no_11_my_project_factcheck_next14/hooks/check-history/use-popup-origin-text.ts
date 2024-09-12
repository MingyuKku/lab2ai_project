import React from "react";
import { useSetRecoilState } from 'recoil';
import { checkHistoryState } from '@/lib/recoil/atoms/check-history-origin-text';
import { useCheckHistoryItemPopupProvider } from '@/context/Chek-history-item-popup-provicer';

export const usePopupOriginText = (queryId: number) => {

    const setCheckHistoryState = useSetRecoilState(checkHistoryState);
    const [ isPopupPosBottom, updatePopupPosBottom ] = React.useState(false);
    const { scrollElem, scrollElemHeight: originScrollHeight } = useCheckHistoryItemPopupProvider();
    const popupElem = React.useRef<HTMLDivElement>(null);
    


    /**
     * 원문 보기 텍스트에서 사용자가 클릭한 쿼리 텍스트를 강조하기 위한 함수
     */
    const setHighlightTextInOriginText = React.useCallback(() => {
        setCheckHistoryState((prev) => {
            const cloneItem = [...prev];
            const updateIndex = cloneItem.findIndex(item => item.id === queryId);
            if (updateIndex > -1) {
                cloneItem[updateIndex] = {...cloneItem[updateIndex], isHighlight: true}
            }
    
            return cloneItem;
        })
    }, [])
    

    /**
     * 강조된 텍스트를 초기화시킴
     */
    const clearHightlightText = React.useCallback(() => {
        setCheckHistoryState((prev) => {
            const cloneItem = prev.map(item => ({
                id: item.id,
                text: item.text
            }))

            return cloneItem;
        })
    }, [])


    /**
     * popupElem요소가 화면에 보일 수 있도록 scrollElem 요소의 스크롤의 위치를 조정하는 함수
     */
    const setScrollElemScrollPosition = React.useCallback(() => {
        if (!window || !popupElem.current || !scrollElem?.current) return;

        const { innerHeight } = window;
        const { scrollTop, scrollHeight } = scrollElem.current;

        if (originScrollHeight >= scrollHeight) {
            updatePopupPosBottom(false);

            const { y, height } = popupElem.current.getBoundingClientRect();
            const diffH = (y + height) - innerHeight;

            if (diffH > 0) {
                scrollElem.current.scrollTo({
                    top: scrollTop + diffH + 20 // 20정도의 여유를 준다
                })
            }

        } else {
            // 원문 보기 팝업이 생길 때 기존 스크롤 영역의 높이값을 벗어날 경우 ==> 원문 보기 팝업의 위치를 버튼 위로 올린다
            updatePopupPosBottom(true);

            const { y, height } = popupElem.current.getBoundingClientRect();
            scrollElem.current.scrollTo({
                top: scrollTop + y - (height + 60)
            })
        }
    }, [])


    React.useEffect(() => {
        setHighlightTextInOriginText();
        setScrollElemScrollPosition();

        return () => {
            // 초기화
            clearHightlightText();
        }
    }, [])



    return {
        isPopupPosBottom,
        popupElem,
    }
}