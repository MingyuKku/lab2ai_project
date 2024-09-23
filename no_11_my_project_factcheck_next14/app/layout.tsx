import React from 'react'
import type { Metadata, Viewport } from "next";
import "@/styles/tailwind.css";
import dynamic from 'next/dynamic';
import CSRFTokenProvider from '@/context/CSRF-token-provider';
import AppClient from '@/components/app/App-client';
import RecoilWrapper from '@/lib/recoil/Recoil-wrapper';


export const metadata: Metadata = {
    title: "팩트체크",
    description: "뉴스를 검증한다!",
    icons: {
        icon: './favicon.png'
    }
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}


const LazyDefaultAlert = dynamic(() => import('@/components/alert/Default-alert'));


const RootLayout = async ({
    children
}: React.PropsWithChildren<{}>) => {

    // const token = 'temp';

    return (
        <html lang='en'>
            <body>
                <div className='bg-achromatic-05 min-w-desktop'>
                    <AppClient />
                    <RecoilWrapper>
                        <LazyDefaultAlert />
                        { children }
                        {/* <CSRFTokenProvider token={ token }>
                            { children }
                        </CSRFTokenProvider> */}
                    </RecoilWrapper>
                </div>
            </body>
        </html>
    )
}

export default RootLayout;