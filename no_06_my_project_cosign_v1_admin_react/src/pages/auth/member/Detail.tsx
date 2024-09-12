import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import DetailDataLabel from 'components/common/parts/Detail-data-label';
import Button from 'components/common/button/Button';
import { GET_MEMBER_ITEM } from 'constants/react-query-keys';
import { useCommonGetText } from 'hooks/_app/useGetText';
import { useGetText } from 'hooks/member/useGetText';
import { useFetchMember } from 'hooks/member/useFetchMember';



const Detail = () => {
    const navigator = useNavigate();
    const { id } = useParams();

    const { createAtTextFull } = useCommonGetText();
    const { eventCkText, genderText, foreignerText, telecomText, cellphoneNoText, } = useGetText();
    const { getMemberItem } = useFetchMember();


    const { data: item, status } = useQuery({
        queryKey: [GET_MEMBER_ITEM, id], 
        queryFn: () => getMemberItem(id),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    const onClickList = React.useCallback(() => {
        navigator('/member');
    }, [])

    const onClickUpdate = React.useCallback(() => {
        if (!id) return;

        navigator(`/member/${id}/update`);
    }, [])


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
            <DetailDataLabel<string> label='UUID' data={ item.uuid } />
            <DetailDataLabel<string | null> label='이메일' data={ item.email } />
            <DetailDataLabel<string> label='닉네임' data={ item.nickName } />
            <DetailDataLabel<string> label='정보수신' data={ eventCkText(item.eventCk) } />
            <DetailDataLabel<string> label='회원가입일' data={ createAtTextFull(item.createdAt) } />
            <DetailDataLabel<string | null> label='회원정보 수정일' data={ item.infoChangeTimestamp ? createAtTextFull(item.infoChangeTimestamp) : null } />
            <DetailDataLabel<string | null> label='비밀번호 변경일' data={ item.passwordChangeTimestamp ? createAtTextFull(item.passwordChangeTimestamp) : null } />
            <DetailDataLabel<string | null> label='최근 로그인 시간' data={ item.recentLoginTimestamp } />
            {/* <DetailDataLabel<string> label='회원탈퇴일' data={ createAtTextFull(item.updatedAt) } /> */}
            <DetailDataLabel<string | null> label='최근로그인 IP' data={ item.recentLoginIp } />
            <DetailDataLabel<string | null> label='이름' data={ item.name } />
            <DetailDataLabel<string | null> label='생년월일' data={ item.birthday } />
            <DetailDataLabel<string | null> label='성별' data={ genderText(item.gender) } />
            <DetailDataLabel<string> label='국적' data={ foreignerText(item.foreignerCK) } />
            <DetailDataLabel<string | null> label='DI' data={ item.di } />
            <DetailDataLabel<string | null> label='CI' data={ item.ci } />
            <DetailDataLabel<string | null> label='통신사' data={ telecomText(item.telecom_type) } />
            <DetailDataLabel<string | null> label='핸드폰번호' data={ cellphoneNoText(item.cellphoneNo) } />
            <DetailDataLabel<string | null> label='휴대폰 인증일' data={ item.certTimestamp ? createAtTextFull(item.certTimestamp) : null } />
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
                        onClick={ onClickUpdate }
                    />
                </div>
            </div>
        </div>
    )
}

export default Detail
