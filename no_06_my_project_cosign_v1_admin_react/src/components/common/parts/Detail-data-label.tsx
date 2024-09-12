import React from 'react'

interface Props<T extends React.ReactNode> {
    data?: T;
    label: string;
}

const DetailDataLabel = <T extends React.ReactNode>({ data, label }: Props<T>) => {
    return (
        <div className='flex items-center min-h-12 border-b border-border-gray-03'>
            <div className='text-center shrink-0 w-1/5 min-w-[90px] text-body-2r text-font-dark-02'>{ label }</div>
            <div className='text-body-3r px-3'>{ data }</div>
        </div>
    )
}

export default DetailDataLabel;
