import React from 'react';
import Image from 'next/image';
import NavLink from '@/components/link/Nav-link';
import UserInfo from './User-info';


const MainGnbMenu = () => {
    const NAV = [
        {
            label: '체크 히스토리',
            href: '/check-history',
            
        },
        {
            label: '데이타 뱅크',
            href: '/data-bank',
            disabled: true,
        },
        {
            label: '사용자 관리',
            href: '/users-manage',
        },
    ]
    return (
        <div className='flex items-center'>
            {
                NAV.map((item,idx) => (
                    <NavLink
                        key={ idx }
                        href={ !item?.disabled ? item.href : '#' }
                        activeClassName='title-sm text-primary-blue-02'
                        inactiveClassName={`body-md ${ item?.disabled ? 'pointer-events-none text-achromatic-03' : 'text-achromatic-black' }`}
                        className={`flex items-center justify-center h-main-header mr-6`}
                        isActiveBar={true}
                        scroll={ false }
                    >
                        { item.label }
                    </NavLink>
                ))
            }
        </div>
    )
}





const MainHeader = () => {

    return (
        <div className='fixed z-40 flex items-center justify-between bg-achromatic-white w-full h-main-header px-side border-b border-achromatic-03'>
            <div className="left flex items-center">
                <a href='' className="block gnb-bi w-[126px] mr-10">
                    <Image
                        src='/images/bi.png'
                        alt='gnb-bi'
                        width={126} height={28}
                        loading='lazy'
                    />
                </a>
                <MainGnbMenu />
            </div>
            <div className="right">
                <UserInfo />
            </div>
        </div>
    )
}

export default MainHeader;
