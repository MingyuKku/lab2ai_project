import React from 'react'
import { useSelector } from 'react-redux';
import { selectModal } from 'store/modal/selector';

const Modal = () => {

    const { modalFlag } = useSelector(selectModal);

    if (modalFlag) {
        return (
            <div className='fixed top-0 left-0 w-full h-viewScreen z-50 bg-bg-black bg-opacity-65 backdrop-blur-sm'></div>
        )
    } else {
        return <React.Fragment />
    }
}

export default Modal;
