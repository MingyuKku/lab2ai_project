import { messageWebview } from 'hooks/useWebviewBridge';
import React from 'react'
import { FallbackProps } from 'react-error-boundary';

interface ErrorType {
    error: Error | PromiseRejectionEvent;
    resetErrorBoundary?: (...args: any[]) => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorType) => {
    console.log('에러 바운더리', error);

    // React.useEffect(() => {
    //     window.location.href = '/';
    // })

    React.useEffect(() => {
        if (error instanceof Error) {

            if (error.name.includes('ChunkLoadError')) {
                window.location.reload(); return;
            }
        }

        

        if (error && 'reason' in error) {
            if (
                error.reason.name === 'AxiosError' &&
                Number(error.reason.response.status) === 401
            ) {
                // window.location.reload(); return;

                messageWebview({
                    type: 'push',
                    path: '/user_information',
                })
            }
        }
        
    }, [error])


    return (
        <div>
            <h2>불편을 드려 죄송합니다.</h2>
            {
                error instanceof Error &&
                <div>
                    <p>{ error?.name }</p>
                    <p>{ error?.message }</p>
                </div>
            }
            {
                (error && 'reason' in error) &&
                <div>
                    {/* {
                        error.reason?.config &&
                        <div>
                            <p>{ error.reason.config?.url }</p>
                        </div>
                    } */}
                    {
                        error.reason?.response &&
                        <div>
                            {
                                error.reason.response?.config &&
                                <div>
                                    <p>{ error.reason.response.config?.url }</p>
                                </div>
                            }
                            <p>{ error.reason.response?.status }</p>
                        </div>
                    }
                    <p>{ error.reason?.name }</p>
                    <p>{ error.reason?.message }</p>
                    <p>{ error?.type }</p>
                </div>
            }
            {
                JSON.stringify(error)
            }
            
            {/* <button onClick={ () => resetErrorBoundary() } className='d-button-st px-4 rounded-full'>리셋 버튼</button> */}
        </div>
    )
}

export default ErrorFallback;