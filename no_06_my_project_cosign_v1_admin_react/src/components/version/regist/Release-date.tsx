import React from 'react';
import DatePicker from 'components/common/date/DatePicker';
import Input from 'components/common/input/Input';
import { formatDate } from "utils"

interface Props {
    releaseDate: Date;
    setReleaseDate: React.Dispatch<React.SetStateAction<Date>>;
}
const ReleaseDate: React.FC<Props> = ({ releaseDate, setReleaseDate }) => {


    return (
        <div className='flex items-center mb-space-bottom-lg'>
            <h1 className='text-h4 font-medium shrink-0 min-w-[90px] w-1/5'>릴리즈 일시<span className='text-position-short'>*</span></h1>
            <div className='w-full'>
                <DatePicker
                    date={ releaseDate }
                    updateDate={ setReleaseDate }
                />
                {/* <Input
                    readOnly
                    value={ formatDate(releaseDate, 'yyyy-MM-dd HH:mm') }
                /> */}
            </div>
        </div>
    )
}

export default ReleaseDate;
