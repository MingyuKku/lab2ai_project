'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import ButtonMd from '@/components/buttons/Button-md';
import IconUpload from '@/components/icon/Upload';
import FullScreen from '@/components/fallback/Full-screen';
import { RadioList } from '@/components/form/_types';
import { DocType } from '@/services/check-history/_types';
import { useFetchRequestCheckParser } from '@/services/check-history/use-fetch-request-check-parser';



const LazySidePopup = dynamic(() => import('@/components/popup/Side'), {
    ssr: false,
    
});
const LazyCheckDocUrlForm = dynamic(() => import('@/containers/check-history/popup/Check-doc-url-form'), {
    ssr: false,
    loading: () => <FullScreen />
});


interface Props {
    items: RadioList<DocType>[];
    label: string;
}
const RequestCheckButton: React.FC<Props> = ({ items, label }) => {
    
    const [ sidePopupFlag, setSidePopupFlag ] = React.useState(false);

    const onClickRegistButton = React.useCallback(() => {
        setSidePopupFlag(true);
    }, [])


    // React.useEffect(() => {
    //     const res = serverFetch().getCsrfToken();
    // }, [])
    
    return (
        <React.Fragment>
            <LazySidePopup
                flag={ sidePopupFlag }
                setFlag={ setSidePopupFlag }
                className=''
            >
                <LazyCheckDocUrlForm items={ items } title={ label } setSidePopupFlag={ setSidePopupFlag } />
            </LazySidePopup>
            <div className="button-area flex justify-end mt-8">
                <ButtonMd
                    onClick={ onClickRegistButton }
                    className='flex items-center justify-center w-[200px]'
                >
                    <IconUpload />
                    <span className='title-sm ml-2.5'>{ label }</span>
                </ButtonMd>
            </div>
        </React.Fragment>
    )
}

export default RequestCheckButton;