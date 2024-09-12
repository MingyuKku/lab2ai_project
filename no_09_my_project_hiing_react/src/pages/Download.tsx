import React from 'react'
import { isAndroid, isIOS } from 'react-device-detect';

const Download = () => {

    // const [ visibility, setVisibility ] = React.useState<DocumentVisibilityState | null>(null);
    // const visibilityStateTimeout = React.useRef<NodeJS.Timeout>();

    React.useEffect(() => {
        // window.location.href = 'hiing://hiing.co/';
        if (isIOS) {
            // window.location.href = 'itms-apps://itunes.apple.com/app/6476132969';
            window.location.href = 'https://apps.apple.com/kr/app/%ED%95%98%EC%9E%89-%EA%B3%A0%EB%AF%BC%EC%83%81%EB%8B%B4-%ED%9E%90%EB%A7%81-%EB%8C%80%ED%99%94-ai-%EC%B1%84%ED%8C%85/id6476132969';
        }
        if (isAndroid) {
            // window.location.href = 'market://details?id=co.hiing.hiing';
            window.location.href = 'https://play.google.com/store/apps/details?id=co.hiing.hiing&hl=ko&gl=US';
        }
    }, [])


    // React.useEffect(() => {
    //     if (visibility !== null) return;

    //     const onvisibilitychange = (e: Event) => {
    //         const { visibilityState } = document;

    //         setVisibility(visibilityState);
    //     }


    //     if (visibilityStateTimeout.current) clearTimeout(visibilityStateTimeout.current);
    //     visibilityStateTimeout.current = setTimeout(() => {
    //         if (visibility === null) {
    //             if (isIOS) {
    //                 // window.location.href = 'itms-apps://itunes.apple.com/app/6476132969';
    //                 window.location.href = 'https://apps.apple.com/kr/app/%ED%95%98%EC%9E%89-%EA%B3%A0%EB%AF%BC%EC%83%81%EB%8B%B4-%ED%9E%90%EB%A7%81-%EB%8C%80%ED%99%94-ai-%EC%B1%84%ED%8C%85/id6476132969';
    //             }
    //             if (isAndroid) {
    //                 // window.location.href = 'market://details?id=co.hiing.hiing';
    //                 window.location.href = 'https://play.google.com/store/apps/details?id=co.hiing.hiing&hl=ko&gl=US';
    //             }
    //         }
    //     }, 1500)

    //     window.addEventListener('visibilitychange', onvisibilitychange);

    //     return () => {
    //         window.removeEventListener('visibilitychange', onvisibilitychange);
    //         if (visibilityStateTimeout.current) clearTimeout(visibilityStateTimeout.current);
    //     }
    // }, [visibility])
    
    return (
        <div>
            {/* <h1>다운로드 페이지</h1> */}
        </div>
    )
}

export default Download;
