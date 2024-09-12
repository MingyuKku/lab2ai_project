import React from 'react';
import { Outlet } from 'react-router-dom';
import SideGnb from 'components/common/side-gnb/Side-gnb';
import DefaultHeader from 'components/common/header/Default';


const LazyModal = React.lazy(() => import('components/common/modal/Modal'));
const LazyAlert = React.lazy(() => import('components/common/modal/Alert'));


const SideGnbLayout = () => {
    return (
        <div className='flex min-h-viewScreen'>
            <React.Suspense>
                <LazyModal />
            </React.Suspense>
            <React.Suspense>
                <LazyAlert />
            </React.Suspense>
            <SideGnb />
            <div className='relative flex-1'>
                <DefaultHeader />
                <div className="content pt-app-header px-5 pb-5">
                    <div className="page-box shadow-02 p-5"><Outlet /></div>
                </div>
            </div>
        </div>
    )
}

export default SideGnbLayout;
