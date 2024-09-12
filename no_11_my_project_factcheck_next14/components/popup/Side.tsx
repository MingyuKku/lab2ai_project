'use client'

import React from 'react'

import ButtonClose from '../buttons/Button-close';
import { CSSTransition } from 'react-transition-group';

import { useEffectPopup } from '@/hooks/common-popup/use-Effect-popup';


interface Props {
    flag: boolean;
    setFlag: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string;
    scrollElClassName?: string;
    isAppear?: boolean;
    isCloseRouteBack?: boolean; // 닫기 버튼 클릭할 경우 페이지 뒤로가기를 사용할지 여부
    isWide?: boolean; // 팩트 체크 리포트 결과 팝업은 일반 팝업보다 width가 더 커야 함
    scrollElem?: React.RefObject<HTMLDivElement>; // 팝업의 스크롤이 생기는 태그에 넣어줄 의 ref값
    setScrollElemHeight?: React.Dispatch<React.SetStateAction<number>>; // 팝업의 스크롤이 생기는 태그에 넣어줄 의 ref값의 높이를 업데이트하는 메서드
    scrollElemHeight?: React.MutableRefObject<number>; // 팝업의 스크롤이 생기는 태그에 넣어줄 의 ref값의 높이값 ref
    children?: React.ReactNode;
}

const SidePopup: React.FC<Props> = ({ flag, setFlag, className, scrollElClassName, children, isAppear, isCloseRouteBack, isWide, scrollElem, setScrollElemHeight, scrollElemHeight }) => {


    const { MODAL_DURATION_TIME, POPUP_DURATION_TIME, onClickClose, } = useEffectPopup({
        popupFlag: flag,
        setPopupFlag: setFlag,
        isCloseRouteBack,
    });


    React.useEffect(() => {
        if (!scrollElem?.current || !setScrollElemHeight) return;

        setScrollElemHeight(scrollElem.current.scrollHeight);
    }, [])



    return (
        <React.Fragment>
            <CSSTransition
                in={ flag }
                appear={ isAppear }
                timeout={ MODAL_DURATION_TIME }
                unmountOnExit
                classNames='modal-trans'
            >
                <div onClick={ onClickClose } className='modal fixed z-40 top-0 left-0 w-full h-viewScreen bg-achromatic-black/45'></div>
            </CSSTransition>
            <CSSTransition
                in={ flag }
                appear={ isAppear }
                timeout={ POPUP_DURATION_TIME }
                unmountOnExit
                classNames='side-popup-trans'
            >
                <div className={`popup fixed z-40 top-0 right-0 ${ isWide ? 'w-[1200px]' : 'w-[749px]' } h-viewScreen bg-achromatic-white ${ className }`}>
                    <ButtonClose
                        onClickButton={ onClickClose }
                        className='absolute z-40 left-0 top-16 -translate-x-1/2'
                    />
                    <div ref={ scrollElem } className={`scroller h-full overflow-y-auto ${ scrollElClassName }`}>
                        { children }
                    </div>
                </div>
            </CSSTransition>
        </React.Fragment>
    )
}

export default SidePopup;
