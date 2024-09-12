import { CloseOutlined } from '@ant-design/icons';
import React from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/_types';
import { toggleModal } from 'store/modal/slice';

interface Props {
    src?: string;
    setSrc?: React.Dispatch<React.SetStateAction<string | null>>;
    setToggleModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImagePopup: React.FC<Props> = ({ src, setSrc, setToggleModal }) => {

    const dispatch = useDispatch<AppDispatch>();
    
    const onClickClose = React.useCallback(() => {
        dispatch(toggleModal(false));
        if (setSrc) setSrc(null);
        if (setToggleModal) setToggleModal(false);
    }, [])


    return (
        <div className='fixed xy-center z-50'>
            <div>
                <CloseOutlined onClick={ onClickClose } className='absolute -top-10 -right-3 z-50 text-font-white text-[32px] cursor-pointer' />
            </div>
            {
                src &&
                <img
                    src={ src }
                    alt="popup-image"
                    width={500}
                    height={500}
                    className='max-h-[700px] min-h-[120px]'
                />
            }
        </div>
    )
}

export default ImagePopup;
