'use client'

import React from 'react'
import { RecoilRoot } from 'recoil';

interface Props {
    children: React.ReactNode;
}

const RecoilWrapper: React.FC<Props> = ({ children }) => {
    
    return (
        <RecoilRoot>
            { children }
        </RecoilRoot>
    )
}

export default RecoilWrapper;
