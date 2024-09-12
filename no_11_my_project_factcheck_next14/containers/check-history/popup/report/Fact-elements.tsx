import React from 'react';
import { FACTS } from '@/constants/facts';

const FactElements = () => {
    
    const boxStyle = React.useCallback((color: string): React.CSSProperties => {
        return {
            backgroundColor: color,
        }
    }, [])

    return (
        <div className='flex items-center body-sm mt-4'>
            {
                FACTS.map((fact,idx) => (
                    <div key={ idx } className='flex items-center ml-4 first:ml-0'>
                        <div
                            className={`w-3 h-3 rounded-sm`}
                            style={ boxStyle(fact.color) }
                        ></div>
                        <span className='ml-2'>{ fact.label }</span>
                    </div>
                ))
            }
        </div>
    )
}

export default FactElements;
