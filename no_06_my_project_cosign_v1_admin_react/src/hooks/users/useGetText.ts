import React from "react";
import { formatDate } from "utils";

export const useGetText = () => {

    const genderText = (gender: string | null) => {
        return gender !== null ? gender === 'M' ? '남' : '여' : null;
    }

    const birthdayText = (birthday: string | null) => {
        return birthday ? birthday.slice(0,4) : null;
    }

    const roundNumberText = (roundNumber: number) => {
        return roundNumber === 0 ? '-' : roundNumber;
    }

    const startDateTimeKst = (startDateTime: string) => {
        return formatDate(Date.parseUtcText(startDateTime), 'yyyy.MM.dd HH:mm');
    }

    const endDateTimeKst = (endDateTime: string) => {
        return formatDate(Date.parseUtcText(endDateTime), 'yyyy.MM.dd HH:mm');
    }

    return {
        genderText,
        birthdayText,
        roundNumberText,
        startDateTimeKst,
        endDateTimeKst,
    }
}