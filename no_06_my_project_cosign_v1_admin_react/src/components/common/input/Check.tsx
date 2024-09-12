import { CheckOutlined } from '@ant-design/icons';
import React from 'react'

interface Props {
    id: string;
    label: string;
    name: string;
    isChecked: boolean;
    setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
    readOnly?: boolean;
}

const Check: React.FC<Props> = ({ id, label, name, isChecked, setChecked, readOnly }) => {

    const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!setChecked) return;

        setChecked(e.target.checked);
    }
    
    return (
        <div>
            <input
                id={ id }
                name={ name }
                type="checkbox"
                // value={ item.value }
                onChange={ onChangeRadio }
                // onFocus={ (e) => onFocusRadio(e, idx) }
                // onBlur={ (e) => onBlurRadio(e, idx) }
                checked={ isChecked }
                readOnly={ readOnly }
                className='peer'
                hidden
            />
            <label
                htmlFor={ id }
                className={
                    `
                        flex items-center cursor-pointer mr-3 last:mr-0 peer
                        ${ isChecked ? '' : '' }
                        ${ readOnly ? 'opacity-60' : 'opacity-100' }
                    `
                }
            >
                <div className={`${ isChecked ? 'bg-position-short ' : 'bg-bg-white border border-border-gray-01' } w-4 h-4 flex items-center justify-center text-font-white rounded`}><CheckOutlined /></div>
                <span className='ml-1 text-body-3r'>{ label }</span>
            </label>
        </div>
    )
}


export default Check
