import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { StyledDropDown } from '@/styled/common/DropDownStyled'
import { useSetLocale } from '@/hooks/useGetLocale';

const CheckSvg = React.lazy(() => import('../../icon/Check'));

const LocaleDropDown = ({
    setFlagState
}: {
    setFlagState: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const navigate = useNavigate();
    const params = useParams();
    const setLocale = useSetLocale;

    const locales = [
        {label: '한국어', locale: 'ko'},
        {label: 'English', locale: 'global'}
    ]

    const onClickModal = () => {
        setFlagState(false);
    }

    const onClickLocale = (locale: string) => {
        // navigate(`/${locale}`, {
        //     replace: true
        // });
        // setFlagState(false);
        setLocale(locale);
        window.location.replace(`/${locale}`);
    }

    return (
        <StyledDropDown>
            <div onClick={ onClickModal } className='modal'></div>
            <div className="box">
                {
                    locales.map((locale,idx) => (
                        <div key={ idx } onClick={ () => onClickLocale(locale.locale) } className='locale-item'>
                            <span className='check-icon'>
                                {
                                    params.locale === locale.locale &&
                                    <React.Suspense fallback={<span></span>}>
                                        <CheckSvg />
                                    </React.Suspense>
                                }
                            </span>
                            <span className={`text ${params.locale === locale.locale && 'active'}`}>{ locale.label }</span>
                        </div>
                    ))
                }
            </div>
        </StyledDropDown>
    )
}

export default LocaleDropDown