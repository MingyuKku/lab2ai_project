import { data } from '@/constants/test-data';



export const getData = () => {
    const parseData = JSON.parse(JSON.stringify(data));

    // console.log('하하', parseData)
    return parseData;
}