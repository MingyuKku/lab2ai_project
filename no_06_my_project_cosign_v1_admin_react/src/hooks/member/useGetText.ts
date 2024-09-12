import { TelecomType } from "./_types";

export const useGetText = () => {
    
    const eventCkText = (eventCk: boolean) => {
        return eventCk ? '동의' : '거절';
    }

    const genderText = (gender: string | null) => {
        if (gender === 'M') return '남자';
        if (gender === 'W') return '여자';
        else return null;
    }

    const foreignerText = (foreignerCK: boolean) => {
        return foreignerCK ? '외국인' : '내국인';
    }


    const telecomText = (type: TelecomType | null) => {
        switch(type) {
            case '01': return 'SKT';
            case '02': return 'KT';
            case '03': return 'LG U+';
            case '04': return '알뜰폰 SKT';
            case '05': return '알뜰폰 KT';
            case '06': return '알뜰폰 LG U+';
            default: return null;
        }
    }


    const cellphoneNoText = (str: string | null) => {
        let cleaned = ('' + str).replace(/\D/g, '');

        // 전화번호 형식으로 포맷팅
        let match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
        if (match) {
            return match[1] + '-' + match[2] + '-' + match[3];
        }
        return null;
    }


    const getAuthType = (oauthAppleId:string | null, oauthGoogleId:string | null) => {
        if (
            oauthAppleId === null &&
            oauthGoogleId === null
            ) {
            return '코싸인'
        }
    
        if (
            oauthAppleId !== null &&
            oauthGoogleId !== null
            ) {
            return '구글&애플';
        }
    
        if (
            oauthAppleId !== null &&
            oauthGoogleId !== null
            ) {
            return '구글&애플';
        }
    
        if (
            oauthAppleId === null &&
            oauthGoogleId !== null
            ) {
            return '구글';
        }
    
        if (
            oauthAppleId !== null &&
            oauthGoogleId === null
            ) {
            return '애플';
        }
    
        return '';
      }


    return {
        eventCkText,
        genderText,
        foreignerText,
        telecomText,
        cellphoneNoText,
        getAuthType,
    }
}