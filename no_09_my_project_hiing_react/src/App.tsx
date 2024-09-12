import React, { useRef } from "react";
import { Routes, useLocation, useNavigate, useNavigationType } from "react-router-dom";
import routes, { getRoute } from 'router/_index';
// import SocketProvider from "context/Socket";
import { messageWebview, useWebviewBridge } from "hooks/useWebviewBridge";
import { prevLocationSessionName } from "hooks/useIsHistoryBack";
import FallbackProvider from "context/Fallback";
import PageLoading from "components/common/fallback/PageLoading";
import { useErrorBoundary } from 'react-error-boundary';
import { isDesktop, isIOS } from "react-device-detect";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import { TransitionGroup, CSSTransition } from "react-transition-group";


const App = () => {
    useWebviewBridge(); // 웹뷰 통신 함수 등록
    const { showBoundary } = useErrorBoundary();
    const location = useLocation();

    const reloadTimeout = useRef<NodeJS.Timeout>();

    React.useEffect(() => {

        if (isDesktop) {
            window.HiingBridge?.setMemberInfo(
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJzaWQiOiJyOTJ3S3RaRXdsZEFnR2QvZzhESWtRPT0iLCJ1bmlxdWVfbmFtZSI6IkRzZGhVbHFxc1ZUcGlia2hSejdTWlpIQU9hY2dmVU04In0.--zes9yE4ekQdUiMzS5q_2yIdloLYuI1YxkblKYynSQ',
                1,
                'test',
                'test'
            )
        }

        window.sessionStorage.setItem(prevLocationSessionName, JSON.stringify(location));
    }, [location])

    React.useEffect(() => {
        setScreenSize();
        window.addEventListener('resize', setScreenSize);


        // window.HiingBridge?.setMemberInfo(
        //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJzaWQiOiJyOTJ3S3RaRXdsZEFnR2QvZzhESWtRPT0iLCJ1bmlxdWVfbmFtZSI6IkRzZGhVbHFxc1ZUcGlia2hSejdTWlpIQU9hY2dmVU04In0.--zes9yE4ekQdUiMzS5q_2yIdloLYuI1YxkblKYynSQ',
        //     1,
        //     'test',
        //     'test'
        // )

        // 임시 테스트용
        // window.HiingBridge?.setMemberInfo(
        //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjNmM4NGViMWQ4Mzc1MTE5Iiwic2lkIjoiVlJqN1NWeTF3dzNjTEE4QnhRZEJ3RFd4bUJRdG5Da2oiLCJ1bmlxdWVfbmFtZSI6IkRzZGhVbHFxc1ZUcGlia2hSejdTWlpIQU9hY2dmVU04IiwiZXhwIjoxNzA5MTkwMTY3fQ.ZkA1rl6s3szeGuSLiSDzqYB7mDAXLS5U-aIPJ2gRYNQ',
        //     208,
        //     '카카오',
        //     '튜브'
        // )
    

        // 웹뷰 통신용
        if (window.HiingBridge?.setMemberInfo) {
            messageWebview({
                type: 'get_user_info',
            });
        }

        // 테스트
        // messageWebview({
        //     type: 'dialog',
        //     param: {
        //         'title': `${window.navigator.userAgent}`
        //     }
        // });
        // alert(window.navigator.userAgent)

        const errorHandler = (error: PromiseRejectionEvent) => {
            console.log('unhandledrejection 핸들러', error)
            showBoundary(error);
        }


        window.addEventListener('unhandledrejection', errorHandler);

        return () => {
            window.removeEventListener('resize', setScreenSize);
            window.removeEventListener('unhandledrejection', errorHandler);
            if (reloadTimeout.current) clearTimeout(reloadTimeout.current);
        }
    }, [])


    const setScreenSize = () => {

        // 간헐적으로 생기는 이슈를 해결하기 위한 조치
        if (window.innerHeight === 0) {
            if (reloadTimeout.current) clearTimeout(reloadTimeout.current);
            reloadTimeout.current = setTimeout(() => {
                window.location.reload();
            }, 300)
        }

        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`); //"--vh"라는 속성으로 정의해준다.
    }

    return (
        <div
            className={`hiing-wrapper font-suite text-gray-01 select-none`}
        >
            <div className={`hiing-content`}>
                <React.Suspense fallback={ <PageLoading /> }>
                    <Routes>
                        { getRoute(routes) }
                    </Routes>
                </React.Suspense>
                {/* <SocketProvider> */}
                {/* <TransitionGroup appear>
                    <CSSTransition
                        key={ location.pathname }
                        timeout={ 1000 }
                        classNames="page-transition"
                    >
                        <div className="router-wrap absolute w-full h-viewScreen">
                            <React.Suspense fallback={ <PageLoading /> }>
                                {
                                    isLoading
                                    ? <PageLoading />
                                    : <Routes>
                                        { getRoute(routes) }
                                    </Routes>
                                }
                            </React.Suspense>
                        </div>
                    </CSSTransition>
                </TransitionGroup> */}
                
                {/* </SocketProvider> */}
            </div>
        </div>
    )
}

export default App;