import { serviceAxios } from "_fetch/service";



/**
 * @returns GNB 레드닷
 */
export async function getGnbRedDot(member_se: number):Promise<GnbRedDot[] | null> {
    try {
        const { data } = await serviceAxios().get(`red-dot/gnb/${member_se}`);
        if (data && data.redDot) {
            const { redDot }:{redDot: GnbRedDot[]} = data;
            return redDot;
        } else {
            return null;
        }

    } catch (err) {
        return null;
    }
}

export interface GnbRedDot extends RedDot {
    // type_cd: 1: 채팅  2: 프로필
};


/**
 * @returns 채팅 레드닷
 */
export async function getChatRedDot(
    member_se: number,
    character_se: number | string,
):Promise<any | null> {
    try {
        const { data } = await serviceAxios().get(`chat/red-dot/${member_se},${character_se}`);

        console.log('레드닷 응답', data)

    } catch (err) {
        return null;
    }
}


/**
 * @returns 프로필 레드닷
 */
export async function getProfileRedDot(member_se: number):Promise<ProfileRedDot[] | null> {
    try {
        const { data } = await serviceAxios().get(`red-dot/profile/${member_se}`);
        if (data && data.redDot) {
            const { redDot }:{redDot: ProfileRedDot[]} = data;
            return redDot;
        } else {
            return null;
        }

    } catch (err) {
        return null;
    }
}

export interface ProfileRedDot extends RedDot {
    // type_cd: 1: 알림  2: 공지사항  3: 나의 정보  4: 약관 및 정책  5: 의견 보내기
};

export interface RedDot {
    type_cd: number;
    red_dot: boolean; // 레드닷(true: 활성화, false: 비활성화)
}

export interface SettingAndInfoListType {
    label: string;
    type: number; // 1: 알림  2: 공지사항  3: 나의 정보  4: 약관 및 정책  5: 의견 보내기
    webviewPath: string; // 플러터와 통신할 path
    mixpanel: string; // 믹스패널에 사용될 이벤트 네임
}
