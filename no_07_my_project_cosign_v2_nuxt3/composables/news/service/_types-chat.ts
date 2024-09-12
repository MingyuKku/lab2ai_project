import { Emoji } from "../business/emoji";
import type { NewsListItem } from "./_types";


export const AiPersonaNewsCharacter = ['REPORTER','PANEL','AD'] as const;

export interface AiPersonaNewsChats {
    aiPersonaCharacterId: number;
    aiPersonaNewsChatItems: AiPersonaNewsChatItem[];
    aiPersonaReporterName: string;
    createdAt: string;
    title: string;
}


interface AiPersonaNewsChatItem {
    aiPersonaCharacterId: number;
    characterDisplayName: string;
    characterProfileBackgroundCode: string;
    characterProfileImg: string;
    characterType: typeof AiPersonaNewsCharacter[number];
    newsChatSequence: number;
    newsChatText: string;
}


export class ClassAiPersonaNewsChats {
    aiPersonaCharacterId: number;
    aiPersonaNewsChatItems: ClassAiPersonaNewsChatItem[];
    aiPersonaReporterName: string;
    createdAt: string;
    createdAtText: string;
    title: string;
    constructor(res: AiPersonaNewsChats, dateFormat: Intl.DateTimeFormat) {

        this.title = res.title;
        this.createdAt = res.createdAt;
        const createdAtIso = Date.isoFormat(res.createdAt);
        this.createdAtText = dateFormat.format(new Date(createdAtIso));
        this.aiPersonaCharacterId = res.aiPersonaCharacterId;
        this.aiPersonaNewsChatItems = res.aiPersonaNewsChatItems.map(item => new ClassAiPersonaNewsChatItem(item));
        this.aiPersonaReporterName = res.aiPersonaReporterName;
    }
}

interface NewsChatTextArray {
    text: string | string[];
    type: 'image' | 'text';
}


export class ClassAiPersonaNewsChatItem {
    aiPersonaCharacterId: number;
    characterDisplayName: string;
    characterProfileBackgroundCode: string;
    characterProfileImg: string;
    characterType: typeof AiPersonaNewsCharacter[number];
    newsChatSequence: number | null;
    newsChatText: string | null;
    newsChatTextArray: NewsChatTextArray[];
    constructor(res: AiPersonaNewsChatItem) {
        function getText(text:string) {
            const regex_true = /\^\!\!\^true\^\!\!\^/g;
            const regex_false = /\^\!\!\^false\^\!\!\^/g;

            const { $I } = useNuxtApp();

            if (regex_true.test(text)) {
                // regex_true 변수에 담긴 정규식 기호를 태그로 치환
                return text.replace(regex_true, `<span style="color: #0EB48C; font-weight: 700;">${Emoji.positive.uniCode}${ $I.labels.goodNews }</span>`);
            }
            if (regex_false.test(text)) {
                // regex_false 변수에 담긴 정규식 기호를 태그로 치환
                return text.replace(regex_false, `<i style="color: #F33652; font-weight: 700;">${Emoji.negative.uniCode}${ $I.labels.badNews }</i>`);
            }
            
            return text.split('\n');
        }

        function getChatTextArray(array: string[]): NewsChatTextArray[] {
            return array.map(text => {
                const regex = /\$!#/g;
                
                if (regex.test(text)) {
                    return {
                        text: text.replace(regex, ''),
                        type: 'image',
                    }
                } else {
                    return {
                        text: getText(text),
                        type: 'text',
                    }
                }
            })
        }

        this.aiPersonaCharacterId = res.aiPersonaCharacterId;
        this.characterDisplayName = res.characterDisplayName;
        this.characterProfileBackgroundCode = res.characterProfileBackgroundCode;
        this.characterProfileImg = res.characterProfileImg;
        this.characterType = res.characterType;
        this.newsChatSequence = res.newsChatSequence;
        this.newsChatText = res.newsChatText ?? '';
        let splitText = res.newsChatText.split('^@^');
        this.newsChatTextArray = getChatTextArray(splitText);
    }
}



export interface RecentPersonaNews extends NewsListItem {
    newsBigTitleImg: string;
}