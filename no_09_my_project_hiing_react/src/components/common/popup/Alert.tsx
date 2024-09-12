import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '_redux/store';
import { selectBasicModal } from '_redux/modal/selector'
import { setBasicPopup } from '_redux/modal/slice';

interface Props {
    okButtonClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
    cancleButtonClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Alert = ({ okButtonClick, cancleButtonClick }: Props) => {

    const { popupTitle, popupDescription, popupButtons } = useSelector(selectBasicModal);
    const dispatch = useDispatch<AppDispatch>();

    const onClickDefaultHandle = () => {
        dispatch(setBasicPopup({
            basicModalFlag: false
        }))
    }

    return (
        <div className='absolute xy-center p-3.5 bg-white w-[284px] text-center rounded-[26px]'>
            <div className="title mt-4">
                {
                    popupTitle?.map((title, idx) => (
                        <h1 key={idx} className='font-pretendard text-[18px] font-medium'>{ title }</h1>
                    ))
                }
            </div>
            <div className="description">
                {
                    popupDescription?.map((desc, idx) => (
                        <p key={idx}>{ desc }</p>
                    ))
                }
            </div>
            {
                popupButtons &&
                <div className="buttons mt-6">
                    {
                        popupButtons.ok &&
                        <button
                            className='d-button-st h-12 w-full rounded-full'
                            onClick={ okButtonClick ?? onClickDefaultHandle }
                        >{ popupButtons.ok.title }</button>
                    }
                </div>
            }
        </div>
    )
}

export default Alert;