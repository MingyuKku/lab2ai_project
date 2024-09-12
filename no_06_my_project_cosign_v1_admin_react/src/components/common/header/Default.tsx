import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NAV_LIST } from 'constants/side-nav-list';
import { useProductionMode } from 'hooks/_app/useProductionMode';
import { useFetchLogin } from 'containers/home-login/useFetchLogin';

const DefaultHeader = () => {

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { getMode } = useProductionMode();
    const { logout } = useFetchLogin();

    const title = React.useMemo(() => NAV_LIST.find((nav => nav.path ? pathname.includes(nav.path) : NAV_LIST[0]))?.name, [pathname])


    const onClickLogout = React.useCallback(async () => {
        const { isSuccess } = await logout();
        if (isSuccess === 'success') navigate('/');
    }, [])

    return (
        <div className='absolute w-full h-app-header flex items-center justify-between px-5'>
            <div className="left">
                <h1 className='text-h1 text-position-short'>{ title }</h1>
            </div>
            <div className="right flex items-center text-body-3r">
                <div className="production-mode">
                    <p className='text-position-short'>적용 DB: <span className='text-body-2'>{ getMode }</span></p>
                </div>
                <div
                    className="logout ml-primary cursor-pointer"
                    onClick={ onClickLogout }
                ><span>로그아웃</span></div>
                <div className="customer ml-primary">
                    <a
                        href={ getMode === 'main' ? 'https://cosign.cc/customer/faq' : 'https://dev.cosign.cc/customer/faq' }
                        target='_blank'
                        rel="noopener noreferrer"
                    >고객센터</a>
                </div>
            </div>
        </div>
    )
}

export default DefaultHeader
