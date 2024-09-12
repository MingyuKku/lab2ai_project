import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '_redux/store';
import { isDesktop } from 'react-device-detect'
import { setBasicPopup } from '_redux/modal/slice';

const Basic = ({ children }: React.PropsWithChildren) => {

    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {

        return () => {
            dispatch(setBasicPopup({
                basicModalFlag: false
            }))
        }
    }, [])


    const onClickModalHandle = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        const curTarget = e.currentTarget as HTMLElement;
        if (target === curTarget) {
            dispatch(setBasicPopup({
                basicModalFlag: false
            }))
        }
        
    }, [])

    
    return (
        <div onClick={ onClickModalHandle } className='fixed top-0 left-0 z-50 w-full h-full bg-gray-01 bg-opacity-60'>
            { children }
        </div>
    )
}

export default Basic;