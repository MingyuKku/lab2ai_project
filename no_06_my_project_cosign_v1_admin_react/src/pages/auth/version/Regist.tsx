import React from 'react';
import RegistPlatform from 'components/version/regist/Platform';
import RegistAppVersion from 'components/version/regist/App-version';
import RegistUpdateType from 'components/version/regist/Update-type';
import RegistUpdateMemo from 'components/version/regist/Memo';
import RegistReleaseDate from 'components/version/regist/Release-date';
import { useFetchVersion } from 'hooks/version/useFetchVersion';
import { useSubmit } from 'hooks/version/useSubmit';
import Button from 'components/common/button/Button';
import { useNavigate } from 'react-router-dom';


const Regist = () => {

    const navigator = useNavigate();
    const { registVersion } = useFetchVersion();
    const {
        appVersion, setAppVersion, appVersionError,
        platformValues, checkedPlatform, setPlatform,
        updateTypeValues, checkedUpdateType, setUpdateType,
        memo, setMemo,
        releaseDate, setReleaseDate,
        onClickSubmit
    } = useSubmit(registVersion, '/version');


    const onClickList = React.useCallback(() => {
        navigator('/version');
    }, [])



    return (
        <div>
            <RegistPlatform
                ITEMS={ platformValues }
                checkedItem={ checkedPlatform }
                updateItem={ setPlatform }
            />
            <RegistAppVersion
                appVersion={ appVersion }
                setAppVersion={ setAppVersion }
                appVersionError={ appVersionError }
                validateInfo='형식: 띄어쓰기 없이 n.n.n (n은 임의의 자연수. 마침표(.)로 구분.)'
            />
            <RegistUpdateType
                ITEMS={ updateTypeValues }
                checkedItem={ checkedUpdateType }
                updateItem={ setUpdateType }
            />
            <RegistUpdateMemo
                memo={ memo }
                setMemo={ setMemo }
            />
            <RegistReleaseDate
                releaseDate={ releaseDate }
                setReleaseDate={ setReleaseDate }
            />
            <div className="buttons relative flex items-center justify-center">
                <div className='flex items-center'>
                    <Button
                        label='목록으로'
                        buttonType='cancle'
                        className='whitespace-nowrap px-primary mr-space-top-lg'
                        onClick={ onClickList }
                    />
                    <Button
                        label='등록하기'
                        className='whitespace-nowrap px-primary'
                        onClick={ () => onClickSubmit('regist') }
                    />
                </div>
            </div>
        </div>
    )
}

export default Regist
