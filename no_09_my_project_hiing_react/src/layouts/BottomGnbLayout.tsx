import { Outlet } from 'react-router-dom';
import { isDesktop, isIOS } from 'react-device-detect';
import MainGnb from 'components/common/gnb/MainGnb';

const BottomGnbLayout = () => {
    return (
        <div className='layout bottom-gnb-layout h-viewScreen overflow-y-auto overscroll-contain scrolling-touch'>
            <main className={
                `mx-auto pb-gnb-bottom-header
                ${ isDesktop ? 'w-desktop' : 'max-w-desktop w-full' }
                ${ isIOS ? 'h-[calc(100%+1px)]' : 'h-full' }
            `}>
                <Outlet />
                <MainGnb />
            </main>
        </div>
    )
}

export default BottomGnbLayout;