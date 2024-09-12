import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegistCategory from 'components/faq/table/regist/Category';
import RegistTitle from 'components/faq/table/regist/Title';
import RegistContent from 'components/faq/table/regist/Content';
import Button from 'components/common/button/Button';
import { useFetchFaq } from 'hooks/faq/useFetchFaq';
import { useSubmit } from 'hooks/faq/useSubmit';



const Regist = () => {

    const navigator = useNavigate();
    const { registFaq } = useFetchFaq();

    const { setCategory, setTitle, titleError, setContent, setFiles, onClickSubmit } = useSubmit(registFaq, '/faq');
 
    const onClickList = React.useCallback(() => {
        navigator('/faq');
    }, [])


    return (
        <div>
            <RegistCategory setCategory={ setCategory } />
            <RegistTitle setTitle={ setTitle } titleError={ titleError } />
            <RegistContent setContent={ setContent } setFiles={ setFiles } />
            <div className="buttons flex items-center justify-center">
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

export default React.memo(Regist);
