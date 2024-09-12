import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { GET_MEMBER_ITEM } from 'constants/react-query-keys';
import DataInputLabel from 'components/member/update/Data-input-label';
import DataSelectLabel, { Props } from 'components/member/update/Data-select-label';
import Button from 'components/common/button/Button';
import { useFetchMember } from 'hooks/member/useFetchMember';
import { useCommonGetText } from 'hooks/_app/useGetText';
import { useGetText } from 'hooks/member/useGetText';
import { useSubmit } from 'hooks/member/useSubmit';
import { useReset } from 'hooks/member/useReset';



const Update = () => {

    const navigator = useNavigate();
    const { id } = useParams();
    const { getMemberItem, updateMember, resetPassword } = useFetchMember();
    const { createAtTextFull } = useCommonGetText();
    const { genderText, foreignerText, telecomText, cellphoneNoText, getAuthType } = useGetText();
    
    const {
        email, setEmail,
        nickname, setNickname,
        eventCk, setEventCk,
        VALUES, onClickSubmit
    } = useSubmit(updateMember, '/member');

    const { data: item, status } = useQuery({
        queryKey: [GET_MEMBER_ITEM, id], 
        queryFn: () => getMemberItem(id),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });
    

    const { onClickResetPassword, onClickResetCellphone } = useReset(item);
    

    React.useEffect(() => {
        if (!item) return;

        setEmail(item.email ?? '');
        setNickname(item.nickName);
        setEventCk({
            key: item.eventCk,
            label: item.eventCk ? '수신 동의' : '수신 거절'
        });
    }, [item])


    const onClickList = React.useCallback(() => {
        navigator('/member');
    }, [])
    

    
    const TypedDataSelectLabel = DataSelectLabel as unknown as React.FC<Props<boolean>>;

    if (status === 'pending') {
        return <p>데이터 로딩중...</p>
    }

    if (status === 'error') {
        return <p>에러 발생!</p>
    }

    if (!item) {
        return <p>데이터가 없어요!</p>
    }

    return (
        
        <div>
            <DataInputLabel label='UUID' value={ item.uuid } readOnly />
            <DataInputLabel label='이메일' value={ email } setValue={ setEmail } />
            <DataInputLabel label='닉네임' value={ nickname } setValue={ setNickname } />
            <TypedDataSelectLabel
                label='정보수신'
                items={ VALUES }
                selectedItem={ eventCk }
                setItem={ setEventCk }
            />
            <DataInputLabel label='회원가입일' value={ createAtTextFull(item.createdAt) + ' ' + getAuthType(item.oauthAppleId, item.oauthGoogleId) } readOnly />
            <DataInputLabel label='회원정보 수정일' value={ item.infoChangeTimestamp ? createAtTextFull(item.infoChangeTimestamp) : null } readOnly />
            <DataInputLabel label='비밀번호 변경일' value={ item.passwordChangeTimestamp ? createAtTextFull(item.passwordChangeTimestamp) : null } readOnly>
                <div onClick={ onClickResetPassword } className='cursor-pointer ml-2 p-2 bg-bg-gray-04 border border-border-gray-03 rounded h-9 flex items-center justify-center text-font-dark-03 text-cap-1r whitespace-nowrap'>비밀번호 초기화</div>
            </DataInputLabel>
            <DataInputLabel label='최근 로그인 시간' value={ item.recentLoginTimestamp } readOnly />
            {/* <DataInputLabel label='회원탈퇴일' value={ createAtTextFull(item.updatedAt) } readOnly /> */}
            <DataInputLabel label='최근로그인 IP' value={ item.recentLoginIp } readOnly />
            <DataInputLabel label='이름' value={ item.name } readOnly />
            <DataInputLabel label='생년월일' value={ item.birthday } readOnly />
            <DataInputLabel label='성별' value={ genderText(item.gender) } readOnly />
            <DataInputLabel label='국적' value={ foreignerText(item.foreignerCK) } readOnly />
            <DataInputLabel label='DI' value={ item.di } readOnly />
            <DataInputLabel label='CI' value={ item.ci } readOnly />
            <DataInputLabel label='통신사' value={ telecomText(item.telecom_type) } readOnly />
            <DataInputLabel label='핸드폰번호' value={ cellphoneNoText(item.cellphoneNo) } readOnly />
            <DataInputLabel label='휴대폰 인증일' value={ item.certTimestamp ? createAtTextFull(item.certTimestamp) : null } readOnly>
                <div onClick={ onClickResetCellphone } className='cursor-pointer ml-2 p-2 bg-bg-gray-04 border border-border-gray-03 rounded h-9 flex items-center justify-center text-font-dark-03 text-cap-1r whitespace-nowrap'>휴대폰 인증 초기화</div>
            </DataInputLabel>
            <div className="buttons relative flex items-center justify-center mt-space-top-lg">
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
                        onClick={ onClickSubmit }
                    />
                </div>
            </div>
        </div>
    )
}

export default Update
