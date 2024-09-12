import React from "react";
import { RangeKeyDict, type Range } from "react-date-range";


interface Props {
    setStartDateText: React.Dispatch<React.SetStateAction<string>>;
    setEndDateText: React.Dispatch<React.SetStateAction<string>>;
}

export const useRangeDateState = ({ setStartDateText, setEndDateText }: Props) => {
    const [ rangeState, setRangeState ] = React.useState<Range[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
            color: '#0351C5'
        }
    ]);


    const onChangDate = React.useCallback((item: RangeKeyDict) => {
        
        setRangeState([item.selection]);

        const { startDate, endDate } = item.selection;
        if (!startDate || !endDate) return;
        // console.log('startDate 변경', startDate, new Date(startDate).format('yyyy.MM.dd'))
        // console.log('endDate 변경',  endDate, new Date(endDate).format('yyyy.MM.dd'))

        const startFormat = new Date(startDate).format('yyyy.MM.dd');
        const endFormat = new Date(endDate).format('yyyy.MM.dd');

        setStartDateText(startFormat);
        setEndDateText(endFormat);
    }, [])


    return {
        rangeState,
        onChangDate,
    }
}