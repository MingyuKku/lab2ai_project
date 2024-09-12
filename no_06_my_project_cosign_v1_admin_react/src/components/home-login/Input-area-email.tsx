import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import Input from 'components/common/input/Input';

interface Props {
    name: string
}
const InputAreaEmail: React.FC<Props> = ({ name }) => {

    const [ focusFlag, setFocusFlag ] = React.useState(false);

    const onFocusInput = React.useCallback(() => {
        setFocusFlag(!focusFlag);
    }, [focusFlag])

    const onBlurInput = React.useCallback(() => {
        setFocusFlag(!focusFlag);
    }, [focusFlag])


    const styleIcon = React.useMemo(() => {
        if (focusFlag) {
            return {
                'fontSize': '18px',
                'color': '#000'
            } 
        } else {
            return {
                'fontSize': '18px',
                'color': '#4B5058'
            }
        }
    }, [focusFlag])
    
    return (
        <div className="email flex items-center">
            <div className="icon shrink-0 w-12 h-12 flex items-center justify-center bg-bg-gray-03 border border-border-gray-02 rounded-l-lg">
                <UserOutlined className='transition-colors' style={ styleIcon } />
            </div>
            <Input
                name={ name }
                type='text'
                placeholder='이메일을 입력해 주세요.'
                className='block w-full rounded-none rounded-r-lg'
                onFocus={ onFocusInput }
                onBlur={ onBlurInput }
                autoComplete='email'
            />
        </div>
    )
}

export default InputAreaEmail;
