import React from 'react'

export interface RadioData {
    label: string;
    code: any;
}

interface Props {
    radioData: RadioData[];
    selectValue: any;
    onChangeRadioHandle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioSelect = ({ radioData, selectValue, onChangeRadioHandle }: Props) => {
    return (
        <div className='mt-7 mb-[18px] flex flex-col items-start'>
            {
                radioData.map((radio,idx) => (
                    <label key={ idx } className='flex items-center mb-3 last:mb-0 cursor-pointer'>
                        <input
                            type="radio" 
                            value={ radio.code }
                            checked={ selectValue === radio.code }
                            onChange={ onChangeRadioHandle }
                        />
                        <div className={`
                            w-[18px] h-[18px] border-[1px] rounded-full flex items-center justify-center
                            ${ selectValue === radio.code ? 'border-button-default' : 'border-gray-04' }
                        `}>
                            {
                                selectValue === radio.code &&
                                <span className='w-3 h-3 bg-button-default rounded-full'></span>
                            }
                        </div>
                        <div className="text font-pretendard text-[15px] ml-1">{ radio.label }</div>
                    </label>
                ))
            }
        </div>
    )
}

export default RadioSelect