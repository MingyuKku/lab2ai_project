import { serviceAxios } from "_fetch/service";


/**
 * @returns 캐릭터 목록
 */
export async function getCharacterList(member_se: number, page: number, size: number):Promise<CharactersClass[] | null> {
    try {
        const { data } = await serviceAxios().get(`characters/${member_se},${page},${size}`);
        // console.log('캐릭터 리스트 데이터', data)
        if (
            data &&
            data.characterList
        ) {
            const { characterList }: { characterList: CharactersType[] } = data;
            const instance = characterList.map(item => new CharactersClass(item));
            return instance;

        } else {
            return null;
        }

    } catch (err) {
        return null;
    }
}


export interface CharactersType {
    background_lk: string; // 배경 이미지 링크
    character_ct: string; // 하단 문구
    character_en_nm: string; // 캐릭터 영어 이름
    character_nm: string; // 캐릭터 이름
    character_se: number; // 캐릭터 일련번호
    // character_tt: string | null; // 상단 문구
    condition_cd: number; // 상태 코드(1: 정상, 2: 삭제)
    image_lk: string; // 캐릭터 이미지 링크
    info_button_lk: string; // 버튼 이미지 링크
    order_no: number; // 순서번호
    personal_reg_dt: string; // 개인화 메시지 시간
    profile_thumbnail_lk: string; // 프로필 이미지 링크
    subscribe_yn: number; // 구독여부(1: 구독, 2: 미구독)
    type_cd: number; // 1: 첫 대화, 2: 일반, 3: 개인화 메시지, 4. 랜덤 메시지
}

export class CharactersClass {
    background_lk: string;
    character_ct: string;
    character_ct_array: string[];
    character_en_nm: string;
    character_nm: string;
    character_se: number;
    // character_tt: string | null;
    // character_tt_array: string[];
    condition_cd: number;
    image_lk: string;
    info_button_lk: string;
    order_no: number;
    personal_reg_dt: string;
    profile_thumbnail_lk: string;
    subscribe_yn: number;
    type_cd: number;
    constructor(res: CharactersType) {
        this.background_lk = process.env.REACT_APP_IMAGE_URL + res.background_lk;
        this.character_ct = res.character_ct;
        this.character_ct_array = res.character_ct.split('\r\n');
        this.character_en_nm = res.character_en_nm;
        this.character_nm = res.character_nm;
        this.character_se = res.character_se;
        // this.character_tt = res.character_tt;
        // this.character_tt_array = res.character_tt ? res.character_tt.split('\r\n') : [];
        this.condition_cd = res.condition_cd;
        this.image_lk = process.env.REACT_APP_IMAGE_URL + res.image_lk;
        this.info_button_lk = process.env.REACT_APP_IMAGE_URL + res.info_button_lk;
        this.order_no = res.order_no;
        this.personal_reg_dt = res.personal_reg_dt;
        this.profile_thumbnail_lk = process.env.REACT_APP_IMAGE_URL + res.profile_thumbnail_lk;
        this.subscribe_yn = res.subscribe_yn;
        this.type_cd = res.type_cd;
    }
}


/**
 * @returns 캐릭터 말풍선(타이틀) 메세지
 */
export async function getCharacterTitleMessage(member_se: number, character_se: string | number | null, nick_nm2: string):Promise<string | null> {
    if (!character_se) return null;
    
    try {
        const { data } = await serviceAxios().get(`character/title/${member_se},${character_se},${nick_nm2}`);
        if (data) {
            return data.characterTitle;
        } else {
            return null;
        }
        
    } catch (err) {

        return null;
    }
}



/**
 * @returns 캐릭터 프로필
 */
export async function getCharacterProfile(member_se: number, character_se: number | string | undefined):Promise<CharacterProfile | null> {
    if (!character_se) return null;
    
    try {
        const { data } = await serviceAxios().get(`chracter/profile/${member_se},${character_se}`);
        if (
            data &&
            data.characterProfile
        ) {
            const { characterProfile }: {characterProfile: CharacterProfile} = data;
            return characterProfile;

        } else {
            return null;
        }

    } catch (err) {
        return null;
    }
}


export interface CharacterProfile {
    backgroud_lk: string;
    character_nm: string;
    character_se: number;
    dday: number;
    porofile_thumbnail_lk: number;
    state_ct: string;
}


/**
 * @returns 캐릭터 소개
 */
export async function getCharacterInfo(character_se: number | string | undefined):Promise<CharacterInfoClass | null> {
    if (!character_se) return null;

    try {
        const { data } = await serviceAxios().get(`character/${character_se}`);
        // console.log('응답', data)
        if (
            data &&
            data.characterInfo
        ) {
            const { characterInfo }:{characterInfo: CharacterInfo} = data;
            return new CharacterInfoClass(characterInfo);

        } else {
            return null;
        }

    } catch (err) {
        return null;
    }
}


interface CharacterInfo {
    character_info_color1: string;
    character_info_color2: string;
    character_info_ct: string;
    character_info_favorite: string;
    character_info_mbti: string;
    character_info_personality: string;
    character_nm: string;
    character_se: number;
    info_background_lk: string;
    info_lk: string;
}


export class CharacterInfoClass {
    character_info_color1: string;
    character_info_color2: string;
    character_info_ct: string[];
    character_info_favorite: string[];
    character_info_mbti: string;
    character_info_personality: string[];
    character_nm: string;
    character_se: number;
    info_background_lk: string;
    info_lk: string;
    constructor(res: CharacterInfo) {
        this.character_info_color1 = res.character_info_color1;
        this.character_info_color2 = res.character_info_color2;
        this.character_info_ct = res.character_info_ct.split('\r\n');
        this.character_info_favorite = res.character_info_favorite.split('\r\n');
        this.character_info_mbti = res.character_info_mbti;
        this.character_info_personality = res.character_info_personality.split('\r\n');
        this.character_nm = res.character_nm;
        this.character_se = res.character_se;
        this.info_background_lk = process.env.REACT_APP_IMAGE_URL + res.info_background_lk;
        this.info_lk = process.env.REACT_APP_IMAGE_URL + res.info_lk;
    }
    
}


/**
 * @returns 캐릭터 프로필 히스토리
 */
export async function getCharacterProfileHistory(character_se: number | string | undefined):Promise<CharacterHistoryClass | null> {
    if (!character_se) return null;

    try {
        const { data } = await serviceAxios().get(`chracter/state/history/${character_se}`);

        if (
            data &&
            data.characterStateHistory
        ) {
            // const { characterStateHistory }: {characterStateHistory: CharacterStateHistory[]} = data;
            const characterHistory: CharacterHistory = data;
            const instance = new CharacterHistoryClass(characterHistory);
            return instance;
        } else {
            return null;
        }

    } catch (err) {
        return null;
    }
}

interface CharacterHistory {
    characterStateHistory: CharacterStateHistory[];
    totalCount: number;
}

interface CharacterStateHistory {
    index: number;
    result: Result;
}

interface Result {
    background_lk: string | null; // 배경 이미지
    character_nm: string; // 캐릭터 이름
    character_se: number; // 캐릭터 일련번호
    profile_thumbnail_lk: string; // 프로필 이미지
    reg_dt: string; // 입력날짜
    state_ct: string | null; // 상태메시지
    type_cd: number; // 타입 코드 (1: 프로필, 2: 배경, 3: 상태메세지)
}

export class CharacterHistoryClass {
    character_nm: string;
    historyItem: CharacterStateHistoryClass[];
    totalCount: number;
    constructor(res: CharacterHistory) {
        this.character_nm = res.characterStateHistory[0].result.character_nm;
        this.historyItem = res.characterStateHistory.map(item => new CharacterStateHistoryClass(item.result));
        this.totalCount = res.totalCount;
    }
}


export class CharacterStateHistoryClass {
    background_lk: string | null;
    character_se: number;
    profile_thumbnail_lk: string | null;
    reg_dt: string;
    state_ct: string | null;
    type_cd: number;
    character_nm: string;
    constructor(res: Result) {
        this.background_lk = res.background_lk ? process.env.REACT_APP_IMAGE_URL + res.background_lk : res.background_lk;
        this.character_se = res.character_se;
        this.profile_thumbnail_lk = res.profile_thumbnail_lk ? process.env.REACT_APP_IMAGE_URL + res.profile_thumbnail_lk : res.profile_thumbnail_lk;
        this.reg_dt = new Intl.DateTimeFormat('ko', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(res.reg_dt))
        this.state_ct = res.state_ct;
        this.type_cd = res.type_cd;
        this.character_nm = res.character_nm;
    }
}


/**
 * @returns 캐릭터 구독
 */
export async function getCharacterSubscription(member_se: number, character_se: number | string):Promise<any | null> {
    try {
        const { data } = await serviceAxios().post(`character/subscription`, {
            member_se,
            character_se: Number(character_se)
        });

        console.log('구독 응답', data)
        return null;
        // if (
        //   data &&
        //   data.characterList
        // ) {
          

        // } else {
        //   return null;
        // }

    } catch (err) {
        return null;
    }
}


export async function getCharacterComicStrip(character_se: number | string | undefined):Promise<CharacterComicStripClass | null> {
    if (!character_se) return null;
    
    try {
        const { data } = await serviceAxios().get(`character/comic-strip/${character_se}`);

        if (
          data &&
          data.characterComicStrip
        ) {
            const { characterComicStrip }:{characterComicStrip: CharacterComicStrip } = data;
            return new CharacterComicStripClass(characterComicStrip);

        } else {
          return null;
        }

    } catch (err) {
        return null;
    }
}


interface CharacterComicStrip {
    character_se: number;
    comic_strip_lk: string;
    comic_strip_tt_lk: string;
}

export class CharacterComicStripClass {
    character_se: number;
    comic_strip_lk: string;
    comic_strip_tt_lk: string;
    constructor(res: CharacterComicStrip) {
        this.character_se = res.character_se;
        this.comic_strip_lk = process.env.REACT_APP_IMAGE_URL + res.comic_strip_lk;
        this.comic_strip_tt_lk = process.env.REACT_APP_IMAGE_URL + res.comic_strip_tt_lk;
    }
}


// /v1.10/chracter/profile/history/{character_se}