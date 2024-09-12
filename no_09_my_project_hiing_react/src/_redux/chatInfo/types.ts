export interface State {
    info: {
        character_en_nm: string;
        character_nm: string;
        dday: number;
        porofile_thumbnail_lk: string;
        subscribe_yn: number; // 구독여부(1: 구독, 2: 미구독)
        // nick_nm2: string;
    }
}


export interface ChatInfoPayloadAction {
    character_en_nm: string; // 캐릭터 영문 이름
    character_nm: string; // 캐릭터 이름
    character_se: number; // 캐릭터 일련번호
    dday: number; // 캐릭터와 함께한 날
    member_se: number; // 회원 일련번호
    porofile_thumbnail_lk: string; // 캐릭터 프로필 링크
    subscribe_yn: number; // 구독여부(1: 구독, 2: 미구독)
    nick_nm2: string; // 이름
}