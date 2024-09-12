import React from 'react'
import Radio from 'components/common/input/Radio';
import { RadioList } from 'components/common/input/_types';
import { ProductionType } from 'constants/_types';
import { useProductionMode } from 'hooks/_app/useProductionMode';

const ProductionMode = () => {

    const productionModes: RadioList<ProductionType>[] = [
        {
            id: 'dev',
            label: '데브',
            value: 'dev',
        },
        {
            id: 'main',
            label: '메인',
            value: 'main',
        }
    ]

    const { getMode, setMode } = useProductionMode();

    const [ checkedItem, setCheckedItem ] = React.useState(getMode);



    React.useEffect(() => {

        setMode(checkedItem);
        
    }, [checkedItem])



    return (
        <div className='production-mode'>
            <Radio
                name='production-mode'
                items={ productionModes }
                checkedItem={ checkedItem }
                updateItem={ setCheckedItem }
            />
        </div>
    )
}

export default React.memo(ProductionMode);
