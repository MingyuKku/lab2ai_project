
import { FactValuesType } from '@/constants/_types';
import { usePopupOriginText } from '@/hooks/check-history/use-popup-origin-text';
import { usePopupOriginTextHighlight } from '@/hooks/check-history/use-popup-origin-text-highlight';
import { useTextTransform } from '@/hooks/check-history/use-text-transform';
import { checkHistoryState } from '@/lib/recoil/atoms/check-history-origin-text';
import React from 'react'
import { useRecoilValue } from 'recoil';




interface SubProps {
    popupElem: React.RefObject<HTMLDivElement>;
    checkResult: FactValuesType;
}

const ParseHighlightText: React.FC<SubProps> = ({ popupElem, checkResult }) => {
    const originText = useRecoilValue(checkHistoryState);
    const { getDocsStatusBgStyle } = useTextTransform();
    const { highlightElem } = usePopupOriginTextHighlight(originText, popupElem);
    
    const spanStyle = React.useMemo<React.CSSProperties>(() => ({
        'fontWeight': 'bold',
        'backgroundColor': '#F8FF97'
    }), [])

    
    return (
        <React.Fragment>
            {
                originText.map((text, idx) => {
                    if (text.isHighlight) {
                        return (
                            <p
                                key={ idx }
                                ref={ highlightElem }
                                className='body-md'
                            >
                                <span style={ getDocsStatusBgStyle(checkResult) } className='inline-block w-4 h-4 rounded mr-1'></span>
                                {
                                    text.text.split('').map((t, i) => (
                                        <span
                                            key={ i }
                                            style={ spanStyle }
                                        >{ t }</span>
                                    ))
                                }
                            </p>
                        )
                    } else {
                        return (
                            <p key={ idx } className='body-md'>{ text.text }</p>
                        )
                    }
                })
            }
        </React.Fragment>
    )
}



interface Props {
    queryId: number;
    checkResult: FactValuesType;
    updateFlag: React.Dispatch<React.SetStateAction<boolean>>;
    height: number;
    className?: string;
}

const OriginalTextPopup: React.FC<Props> = ({ queryId, checkResult, updateFlag, height, className }) => {

    
    const { isPopupPosBottom, popupElem } = usePopupOriginText(queryId);
    

    const popupStyle = React.useMemo<React.CSSProperties>(() => {
        return {
            'height': height
        }
    }, [])



    return (
        <React.Fragment>
            <div onClick={ () => updateFlag(false) } className="modal fixed left-0 top-0 z-10 w-full h-viewScreen"></div>
            <div
                ref={ popupElem }
                style={ popupStyle }
                className={`absolute right-0 ${ isPopupPosBottom ? 'bottom-12' : 'top-12' } z-10 w-[612px] overflow-y-auto overscroll-contain rounded shadow-03 bg-achromatic-white border-2 border-achromatic-black p-8`}
            >
                <ParseHighlightText popupElem={ popupElem } checkResult={ checkResult } />
            </div>
        </React.Fragment>
    )
}

export default OriginalTextPopup;
