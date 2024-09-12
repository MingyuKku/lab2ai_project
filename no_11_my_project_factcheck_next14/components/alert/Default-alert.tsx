'use client'

import React from 'react';
import { useRecoilValue } from 'recoil';
import { alertState } from '@/lib/recoil/atoms/alert-state'
import ButtonLg from '@/components/buttons/Button-lg';


const DefaultAlert = () => {

    const { flag, title, description, buttons } = useRecoilValue(alertState);
    

    if (flag) {
        return (
            <React.Fragment>
                <div className="modal fixed z-50 top-0 left-0 w-full h-viewScreen bg-achromatic-black/45"></div>
                <div className={`
                    fixed xy-center z-50 p-side bg-achromatic-white rounded shadow-01 w-[456px]
                `}>
                    <div className="title mt-[15px] mb-4">
                        {
                            typeof title === 'string' &&
                            <h1 className="title-lg text-center">{ title }</h1>
                        }
                        {
                            Array.isArray(title) &&
                            title.map((tit,idx) => (
                                <h1
                                    key={ idx }
                                    className="title-lg text-center"
                                >{ tit }</h1>
                            ))
                        }
                    </div>
                    <div className="description text-center">
                        {
                            typeof description === 'string' &&
                            <p className="body-md">{ description }</p>
                        }
                        {
                            Array.isArray(description) &&
                            description.map((desc,idx) => (
                                <p
                                    key={ idx }
                                    className="body-md"
                                >{ desc }</p>
                            ))
                        }
                    </div>
                    {
                        buttons &&
                        <div className="buttons flex items-center justify-between mt-12">
                            {
                                buttons.left &&
                                <ButtonLg
                                    buttonType={ buttons.left.type === 'CANCLE' ? 'cancle' : 'ok' }
                                    label={ buttons.left.label }
                                    onClick={ buttons.left.onClick }
                                    className='w-full title-sm'
                                />
                            }
                            {
                                buttons.center &&
                                <ButtonLg
                                    buttonType={ buttons.center.type === 'CANCLE' ? 'cancle' : 'ok' }
                                    label={ buttons.center.label }
                                    onClick={ buttons.center.onClick }
                                    className={`w-full title-sm ${ buttons.center.type === 'OK' ? '!bg-achromatic-black' : '' }`}
                                />
                            }
                            {
                                buttons.right &&
                                <ButtonLg
                                    buttonType={ buttons.right.type === 'CANCLE' ? 'cancle' : 'ok' }
                                    label={ buttons.right.label }
                                    onClick={ buttons.right.onClick }
                                    className={`w-full ml-6 title-sm ${ buttons.right.type === 'OK' ? '!bg-achromatic-black' : '' }`}
                                />
                            }
                        </div>
                    }
                </div>
            </React.Fragment>
        )
    } else {
        return <React.Fragment />
    }
}

export default DefaultAlert;
