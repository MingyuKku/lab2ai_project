export interface AiPersonaReporter {
    aiPersonaCharacterId: number; // 기자 채용중 탭은 99번으로
    characterDisplayName: string;
    characterType: "REPORTER" | "HIRING";
}

const NewsPositiveNegativeType = ['POSITIVE', 'NEGATIVE', 'NORMAL'] as const;


export interface AiPersonaReporterDesc {
    aiPersonaCharacterId: number;
    characterBackGroundImg: string;
    characterDisplayDescription: string | null;
    characterDisplayName: string | null;
    characterImg: string;
}


export interface AiPersonaNewsList {
    aiPersonaNewsItems: AiPersonaNewsListItem[];
    isLast: boolean;
}

export interface NewsListItem {
    aiPersonaCharacterId: number;
    aiPersonaNewsId: number;
    characterDisplayName: string | null;
    characterProfileImg: string;
    characterProfileBackgroundCode: string;
    createdAt: string;
    newsDisplayTitle: string;
    newsImportant: boolean;
    newsPayType: boolean;
    newsPositiveNegativeType: typeof NewsPositiveNegativeType[number];
}

export interface AiPersonaNewsListItem extends NewsListItem {
    newsTitleImg: string | null;
}

export interface NewAiPersonaNewsListItem {
    date: string;
    news: ClassNewPersonaNewsItem[];
}

export class ClassAiPersonaNewsList {
    aiPersonaNewsItems: NewAiPersonaNewsListItem[];
    isLast: boolean;
    constructor(res: AiPersonaNewsList, dateTimeFormat: Intl.DateTimeFormat) {
        this.isLast = res.isLast;
        const content = res.aiPersonaNewsItems.map(item => new ClassNewPersonaNewsItem(item, dateTimeFormat));

        function groupBy<T>(items:T[], property:string) {

            const result = items.reduce((prev, cur, i) => {
                const key = (cur as Record<string, any>)[property];
                
                const newPrev = prev as Record<string, any>

                if (!newPrev[key]) {
                    newPrev[key] = new Object({
                        date: null,
                        news: [] as T[]
                    });

                    if (!newPrev[key].date) {
                        newPrev[key].date = (cur as Record<string, any>)['createdAtKstLocale'];
                        newPrev[key].news = [] as T[];
                    }
                }

                newPrev[key].news.push({
                    ...cur
                })
        
                return newPrev;
            }, {});

            return Object.values<NewAiPersonaNewsListItem>(result);
        }
        this.aiPersonaNewsItems = content.length ? groupBy<ClassNewPersonaNewsItem>(content, 'only_yyyyMMdd') : [];
    }
}


export class ClassNewsListItem {
    aiPersonaCharacterId: number;
    aiPersonaNewsId: number;
    characterDisplayName: string | null;
    characterProfileImg: string;
    characterProfileBackgroundCode: string;
    createdAt: string;
    newsDisplayTitle: string;
    newsImportant: boolean;
    newsPayType: boolean;
    newsPositiveNegativeType: typeof NewsPositiveNegativeType[number];
    constructor(res: NewsListItem) {
        this.aiPersonaCharacterId = res.aiPersonaCharacterId;
        this.aiPersonaNewsId = res.aiPersonaNewsId;
        this.characterDisplayName = res.characterDisplayName;
        this.characterProfileImg = res.characterProfileImg;
        this.characterProfileBackgroundCode = res.characterProfileBackgroundCode;
        this.createdAt = res.createdAt;
        this.newsDisplayTitle = res.newsDisplayTitle;
        this.newsImportant = res.newsImportant;
        this.newsPayType = res.newsPayType;
        this.newsPositiveNegativeType = res.newsPositiveNegativeType;
    }
}


export class ClassNewPersonaNewsItem extends ClassNewsListItem {
    createdAtKstLocale: string;
    only_yyyyMMdd: number;
    postTime: string;
    newsTitleImg: string | null;
    constructor(res: AiPersonaNewsListItem, dateTimeFormat: Intl.DateTimeFormat) {

        super(res);

        // function get_yyyyMMdd(time: dayjs.Dayjs) {
        //     const timeClone = time;

        //     return timeClone.hour(0).minute(0).second(0).valueOf();
        // }
        function get_yyyyMMdd(date: Date) {
            const time = new Date(date.setHours(0,0,0,0));
            return time.getTime();
        }

        const createdAtIso = Date.isoFormat(res.createdAt);
        this.createdAtKstLocale = dateTimeFormat.format(new Date(createdAtIso));
        // this.only_yyyyMMdd = get_yyyyMMdd(Date.timeToLocal(res.createdAt)); // 날짜별로 구분하기 위한 키값으로 사용됨
        this.only_yyyyMMdd = get_yyyyMMdd(Date.parseUtcToLocal(res.createdAt)); // 날짜별로 구분하기 위한 키값으로 사용됨
        // this.postTime = Date.timeToLocal(res.createdAt).format('HH:mm');
        this.postTime = Date.parseUtcToLocal(res.createdAt).format('HH:mm');
        this.newsTitleImg = res.newsTitleImg;
    }
}