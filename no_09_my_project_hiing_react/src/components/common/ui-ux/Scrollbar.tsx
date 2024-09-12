import { messageWebview } from 'hooks/useWebviewBridge';
import React from 'react'
import { isDesktop, isIOS, isMobile } from 'react-device-detect'

interface Props {
    className?: string;    
}

const Scrollbar = React.forwardRef<HTMLDivElement, React.PropsWithChildren<Props>>((props, ref) => {

    const thumbRef = React.useRef<HTMLDivElement | null>(null);
    const [ thumbHeight, setThumbHeight ] = React.useState<number>(50); // 단위: %
    const [ scrollFlag, setScrollFlag ] = React.useState(false);
    const visualTimer = React.useRef<NodeJS.Timeout>();

    React.useEffect(() => {
        const wrapEl = ref as React.MutableRefObject<HTMLDivElement | null>;

        if (!wrapEl.current || !isIOS) return;

        let mutationObserver: MutationObserver | null = null;
        const options:MutationObserverInit = {
            childList: true,
            subtree: true,
        }
        
        const mutateCallback:MutationCallback = () => {
            setScrollbarUI(wrapEl.current!)
        }

        mutationObserver = new MutationObserver(mutateCallback);
        mutationObserver.observe(wrapEl.current, options);

        // clean up
        return () => {
            mutationObserver?.disconnect();
            clearTimeout(visualTimer.current);
        }
    }, [ref])


    const setScrollbarUI = React.useCallback((el: HTMLElement) => {
        const thumbHeight = Math.max(((el.clientHeight / el.scrollHeight) * 100), 3); // 최소값 3%
        const shouldHideScrollbar = thumbHeight >= 99.5;
        setThumbHeight(shouldHideScrollbar ? 0 : thumbHeight);
    }, [])

    
    const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
        if (!thumbRef.current) return;
        if (!scrollFlag) setScrollFlag(true);

        const target = e.target as HTMLElement;
        const targetScrollTop = target.scrollTop;
        // let frameTime = null;

        thumbRef.current!.classList.remove('opacity-0');
        thumbRef.current!.classList.add('opacity-1');

        const updateAnimationFrame = () => {
            
            const scrollHeight = target.scrollHeight;
            const clientHeight = target.clientHeight;
            const thumbHeightPx = thumbRef.current!.clientHeight; // 스크롤바의 실제 높이 (px)
            const headerHeight = 57;

            // 스크롤 가능한 범위 계산
            const scrollableHeight = scrollHeight - clientHeight;

            // 스크롤바가 이동할 수 있는 범위 계산
            const thumbMovableHeight = Math.max((clientHeight - thumbHeightPx - headerHeight), 0);

            // 스크롤 비율에 따라 스크롤바 위치 계산
            const thumbTop = (targetScrollTop / scrollableHeight) * thumbMovableHeight;

            thumbRef.current!.style.transform = `translateY(${thumbTop}px)`;
        }

        // if (frameTime) cancelAnimationFrame(frameTime);
        // requestAnimationFrame(updateAnimationFrame);
        updateAnimationFrame();

        clearTimeout(visualTimer.current);
        visualTimer.current = setTimeout(() => {
            thumbRef.current!.classList.remove('opacity-1');
            thumbRef.current!.classList.add('opacity-0');
        }, 1000)

    }, [thumbHeight])


    return (
        <div
            ref={ ref }
            // className={ `${props.className ?? ''} ${ !isDesktop ? 'h-viewScreen overflow-y-auto' : 'min-h-viewScreen'}` }
            className={ `${props.className ?? ''}` }
            onScroll={ (isIOS) ? handleScroll : undefined }
        >
            {
               (isIOS) &&
               <div className="scrollbar fixed top-0 right-0 z-50 w-[5px] h-full cursor-pointer pr-0.5 pt-basic-header">
                    <div
                        ref={ thumbRef }
                        className="scrollbarThumb fixed w-[3px] pt-0.5 pb-1 transition-opacity duration-450 ease-in-out"
                        style={{ 'height': `${thumbHeight}%` }}
                    >
                        {
                            scrollFlag &&
                            <div className='bg-gray-02 bg-opacity-50 rounded-full h-full'></div>
                        }
                    </div>
                </div>
            }
            { props.children }
        </div>
    )
})

export default React.memo(Scrollbar);