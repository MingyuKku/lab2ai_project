import React from "react";

export function useViewportResize() {

    const setScreenSize = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`); //"--vh"라는 속성으로 정의해준다.
    }

    
    React.useEffect(() => {
        setScreenSize();
        window.addEventListener('resize', setScreenSize);

        return () => {
            window.removeEventListener('resize', setScreenSize);
        }
    }, [])
}