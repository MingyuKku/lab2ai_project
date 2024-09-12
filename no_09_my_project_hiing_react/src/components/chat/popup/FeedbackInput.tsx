import React from 'react'
import { isIOS, isMobile } from 'react-device-detect';
import { scrollToBottom } from 'utils';

interface Props {
    selectValue: number;
    name: string;
    error: boolean;
    iosMobileScrollRef: React.RefObject<HTMLDivElement>;
}


const FeedbackInput = ({ selectValue, name, error, iosMobileScrollRef }: Props) => {

    const [ errorF, setErrorF ] = React.useState<boolean | null>(null);
    
    const onInputHandle = React.useCallback((e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        if (error) {
            if (target.value.length >= 15) {
                setErrorF(false)
            } else {
                setErrorF(true);
            }
        }
    }, [error])

    const onFocusHandle = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        if (!iosMobileScrollRef.current) return;

        const target = e.target;
        const nextElement = target.nextElementSibling
        nextElement?.classList.add('bg-primary-01');

        if (isIOS) {
            scrollToBottom('smooth', iosMobileScrollRef.current);
        }
    }, [])


    const onBlurHandle = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        const target = e.target;
        const nextElement = target.nextElementSibling
        nextElement?.classList.remove('bg-primary-01');
    }, [])


    return (
        <div>
            <input
                type="text"
                autoComplete='off'
                name={ name }
                placeholder='피드백 사유를 적어주세요'
                className='block w-full none-st text-[15px] input-placeholder-text-15'
                onInput={ onInputHandle }
                onFocus={ onFocusHandle }
                onBlur={ onBlurHandle }
                disabled={ selectValue === 5 ? false : true }
            />
            <span className={`block bg-gray-05 h-px my-1`}></span>
            {
                (
                    (error && errorF === null) ||
                    errorF
                ) &&
                <p className='font-pretendard text-[12px] text-system-01'>15자 이상 입력해 주세요.</p>
            }
        </div>
    )
}

export default FeedbackInput;