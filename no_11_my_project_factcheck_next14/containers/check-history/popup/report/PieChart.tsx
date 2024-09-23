'use client'

import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { FACTS } from '@/constants/facts';
import { useCheckHistoryItemPopupProvider } from '@/context/Chek-history-item-popup-provicer';
import { Facts, FactValuesType, FactLabelType } from '@/constants/_types';

const PieChart = () => {

    const { item } = useCheckHistoryItemPopupProvider();

    const [ data, setData ] = React.useState<{
        id: FactLabelType;
        label: FactLabelType;
        value: number;
        color: string;
    }[]>([]);

    const [ colors, setColors ] = React.useState(['']);


    React.useEffect(() => {
        if (!item) return;
        if (!item.topDetailInfo.topDetailFactCheckResult) return;

        const entries = Object.entries(item.topDetailInfo.topDetailFactCheckResult);

        const newArray = entries.map(([key, value], idx) => ({
            id: Facts[key as FactValuesType].label,
            label: Facts[key as FactValuesType].label,
            value: value,
            color: Facts[key as FactValuesType].color,
        }))

        const onlyColors = newArray
                            .sort((prev, next) => next.value - prev.value)
                            .map(fact => fact.color);

        setData(newArray);
        setColors(onlyColors);

    }, [item])
    
    return (
        <ResponsivePie
            data={ data }
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            colors={ colors }
            innerRadius={0.6}
            padAngle={0.7}
            cornerRadius={4}
            activeOuterRadiusOffset={8}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={[]}
            fill={[]}
            legends={[]}
        />
    )
}

export default PieChart;
