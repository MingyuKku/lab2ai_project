'use client';

import React from 'react'
import { usePathname } from 'next/navigation';
import Link, { LinkProps } from 'next/link';


interface Props extends LinkProps {
    activeClassName?: string;
    inactiveClassName?: string;
    className?: string;
    isActiveBar?: boolean;
    children?: React.ReactNode;
}

const NavLink: React.FC<Props> = ({ activeClassName, inactiveClassName, className, isActiveBar, children, ...props }) => {

    const pathname = usePathname();
    const isActive = props.href === pathname;
    
    return (
        <Link
            { ...props }
            className={`
                ${className}
                ${ isActiveBar ? 'relative' : '' }
                ${isActive ? activeClassName : inactiveClassName}
            `}
        >
            { children }
            { (isActiveBar && isActive) && <span className='absolute bottom-0 left-0 w-full h-1 bg-primary-blue-02'></span> }
        </Link>
    )
}

export default NavLink;
