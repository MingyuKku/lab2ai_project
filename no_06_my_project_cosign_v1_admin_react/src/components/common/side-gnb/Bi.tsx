import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Bi = () => {
    return (
        <div>
            <a href='/faq' className='block w-[140px] h-7'>
                <img
                    src="https://kr.object.ncloudstorage.com/cosign/version1/admin/logo/admin-logo-white.png" 
                    alt="bi"
                    width={140}
                    height={28}
                />
            </a>
        </div>
    )
}

export default Bi
