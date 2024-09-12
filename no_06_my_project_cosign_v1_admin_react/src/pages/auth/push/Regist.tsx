import React from 'react';
import { useSubmit } from 'hooks/push/useSubmit';
import RegistPushTitle from 'components/push/regist/Title';
import RegistPushAppLink from 'components/push/regist/App-link-input';
import RegistPushContent from 'components/push/regist/Content';
import { useFetchPush } from 'hooks/push/useFetchPush';
import Button from 'components/common/button/Button';

const Push = () => {

    const { registPush } = useFetchPush();
    
    const {
        title, setTitle, titleError,
        appLink, setAppLink, appLinkError,
        content, setContent, contentError,
        onClickSubmit,
    } = useSubmit(registPush, '/popup');
    
    return (
        <div>
            <RegistPushTitle
                title={ title }
                setTitle={ setTitle }
                titleError={ titleError }
            />
            <RegistPushAppLink
                appLink={ appLink }
                setAppLink={ setAppLink }
                appLinkError={ appLinkError }
            />
            <RegistPushContent
                content={ content }
                setContent={ setContent }
                contentError={ contentError }
            />
            <div className="buttons relative flex items-center justify-center">
                <div className='flex items-center'>
                    <Button
                        label='등록하기'
                        className='whitespace-nowrap px-primary'
                        onClick={ onClickSubmit }
                    />
                </div>
            </div>
        </div>
    )
}

export default Push
