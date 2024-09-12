import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale/ko';

interface Props {
    date: Date;
    updateDate: React.Dispatch<React.SetStateAction<Date>>;
    initDate?: Date | string;
    onlyFutureDate?: boolean;
}
const DatePickerComponent: React.FC<Props> = ({ date, updateDate, initDate, onlyFutureDate }) => {

    

    React.useEffect(() => {
        if (!initDate) return;

        if (typeof initDate === 'string') {
            updateDate(new Date(initDate));
        } else {
            updateDate(initDate);
        }

    }, [initDate])


    const filterPassedTime = React.useCallback((time: Date) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
    }, []);

    const onChangeDate = React.useCallback((dateParam: Date | null) => {
        if (!dateParam) return;
        updateDate(dateParam);
    }, [])

    return (
        <div>
            <DatePicker
                selected={ date } 
                onChange={ onChangeDate }
                dateFormat="yyyy-MM-dd HH:mm"
                placeholderText='날짜를 선택해 주세요.'
                locale={ ko }
                minDate={ onlyFutureDate ? new Date() : undefined }
                filterTime={ onlyFutureDate ? filterPassedTime : undefined }
                showTimeSelect
                timeIntervals={ 10 }
                className='none-st h-9 border border-border-gray-02 rounded-lg text-body-3r px-3
                    peer focus:border-position-short focus:shadow-border-1 transition-border-shadow'
            />
        </div>
    )
}

export default DatePickerComponent;
