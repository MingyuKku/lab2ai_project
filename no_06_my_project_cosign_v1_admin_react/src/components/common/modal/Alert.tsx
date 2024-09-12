import React from 'react'
import { useSelector } from 'react-redux';
import { selectAlert } from 'store/popup/alert/selector';
import { isMobile } from 'react-device-detect';
import { ButtonType } from 'store/popup/alert/_types';
import { useAlertButtonHandler } from 'hooks/alert/useAlertButtonHandler';

const Alert = () => {

    const { flag, title, description, buttons } = useSelector(selectAlert);
    const handler = useAlertButtonHandler();
    

    const computedButtonStyle = React.useCallback((type?: ButtonType) => {
        if (type === 'OK') return 'bg-bg-black text-font-white';
        if (type === 'CANCLE') return 'bg-bg-white text-font-black border border-border-black'
        return 'bg-bg-black text-font-white'
    }, [])


    const onClickLeftButton = React.useCallback(() => {
        if (!buttons || !buttons.left || !buttons.left.onClickHandlerName) return;

        handler[buttons.left.onClickHandlerName]();
        // dispatch(alertButtonThunk({
        //     key: buttons.left.onClickHandlerName
        // }));

    }, [buttons])

    const onClickCenterButton = React.useCallback(() => {
        if (!buttons || !buttons.center || !buttons.center.onClickHandlerName) return;

        handler[buttons.center.onClickHandlerName]();
        // dispatch(alertButtonThunk({
        //     key: buttons.center.onClickHandlerName,
        // }));

    }, [buttons])

    const onClickRightButton = React.useCallback(() => {
        if (!buttons || !buttons.right || !buttons.right.onClickHandlerName) return;

        handler[buttons.right.onClickHandlerName]();
        // dispatch(alertButtonThunk({
        //     key: buttons.right.onClickHandlerName,
        //     id: buttons.right.paramId
        // }))

    }, [buttons])


    if (flag) {
        return (
            <div className={`
                fixed xy-center z-50 p-5 bg-bg-white rounded shadow-01
                ${ isMobile ? 'w-[calc(100%-48px)]' : 'w-desktop' }
            `}>
                <div className="title mt-[15px] mb-5">
                    {
                        typeof title === 'string' &&
                        <h1 className="text-h4 leading-5 text-center">{ title }</h1>
                    }
                    {
                        Array.isArray(title) &&
                        title.map((tit,idx) => (
                            <h1
                                key={ idx }
                                className="text-h4 leading-5 text-center"
                            >{ tit }</h1>
                        ))
                    }
                </div>
                <div className="description text-center">
                    {
                        typeof description === 'string' &&
                        <p className="text-body-3r leading-6">{ description }</p>
                    }
                    {
                        Array.isArray(description) &&
                        description.map((desc,idx) => (
                            <p
                                key={ idx }
                                className="text-body-3r leading-6"
                            >{ desc }</p>
                        ))
                    }
                </div>
                {
                    buttons &&
                    <div className="buttons flex items-center justify-between mt-[30px]">
                        {
                            buttons.left &&
                            <div
                                className={`
                                    left-button d-button-st flex-1 flex items-center justify-center h-[50px] rounded !text-body-3 border-border-dark-01 !text-font-dark-01
                                    ${ computedButtonStyle(buttons.left.type) }
                                `}
                                // onClick={ buttons.left.onClick }
                                onClick={ onClickLeftButton }
                            >
                                { buttons.left.label }
                            </div>
                        }
                        {
                            buttons.center &&
                            <div
                                className={`
                                    center-button d-button-st flex-1 flex items-center justify-center h-[50px] rounded !text-body-3 ml-3
                                    ${ computedButtonStyle(buttons.center.type) }
                                `}
                                onClick={ onClickCenterButton }
                            >
                                { buttons.center.label }
                            </div>
                        }
                        {
                            buttons.right &&
                            <div
                                className={`
                                    right-button d-button-st flex-1 flex items-center justify-center h-[50px] bg-position-short rounded !text-body-3 ml-3
                                    ${ computedButtonStyle(buttons.right.type) }
                                `}
                                onClick={ onClickRightButton }
                            >
                                { buttons.right.label }
                            </div>
                        }
                    </div>
                }
            </div>
        )
    } else {
        return <React.Fragment />
    }
    
}

export default Alert
