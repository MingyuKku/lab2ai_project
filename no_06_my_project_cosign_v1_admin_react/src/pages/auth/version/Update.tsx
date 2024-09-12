import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import RegistPlatform from 'components/version/regist/Platform';
import RegistAppVersion from 'components/version/regist/App-version';
import RegistUpdateType from 'components/version/regist/Update-type';
import RegistUpdateMemo from 'components/version/regist/Memo';
import RegistReleaseDate from 'components/version/regist/Release-date';
import { useFetchVersion } from 'hooks/version/useFetchVersion';
import { useSubmit } from 'hooks/version/useSubmit';
import Button from 'components/common/button/Button';
import { GET_VERSION_ITEM } from 'constants/react-query-keys';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/_types';
import { toggleModal } from 'store/modal/slice';
import { setAlert } from 'store/popup/alert/slice';


const Update = () => {

    const navigator = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    
    const { updateVersion, getVersionItem, } = useFetchVersion();


    const { data: versionItem, status } = useQuery({
        queryKey: [GET_VERSION_ITEM, id], 
        queryFn: () => getVersionItem(id),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });
    

    const {
        appVersion, setAppVersion, appVersionError,
        platformValues, checkedPlatform, setPlatform,
        updateTypeValues, checkedUpdateType, setUpdateType,
        memo, setMemo,
        releaseDate, setReleaseDate,
        onClickSubmit
    } = useSubmit(updateVersion, '/version');


    React.useEffect(() => {
        if (!versionItem) return;

        setPlatform(versionItem.platformType);
        setAppVersion(versionItem.version);
        setUpdateType(versionItem.updateStateType);
        if (versionItem.memo) setMemo(versionItem.memo);
        setReleaseDate(Date.parseUtcText(versionItem.createdAt));

    }, [versionItem])



    const onClickList = React.useCallback(() => {
        navigator('/version');
    }, [])


    const onClickDelete = React.useCallback(() => {
        dispatch(toggleModal(true));
        dispatch(setAlert({
            description: [
                `삭제 후 복구가 불가능합니다.`,
                `삭제하시겠습니까?`
            ],
            buttons: {
                left: {
                    type: 'CANCLE',
                    label: '취소하기',
                    onClickHandlerName: 'commonCancle',
                },
                right: {
                    type: 'OK',
                    label: '삭제하기',
                    onClickHandlerName: 'versionItemDelete',
                }
            }
        }))
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
                        label='수정하기'
                        className='whitespace-nowrap px-primary'
                        onClick={ () => onClickSubmit('update') }
                    />
                </div>
                <Button
                    label='삭제'
                    buttonType='cancle'
                    className='absolute right-0 !w-auto border-none px-3 text-position-short'
                    onClick={ onClickDelete }
                />
            </div>
        </div>
    )
}

export default Update
