export const Facts = {
    'TRUE': {
        label: '사실',
        color: '#007BDC',
        analysisComplete: true,
    },
    'MOSTLY_TRUE': {
        label: '대부분 사실',
        color: '#69BEDF',
        analysisComplete: true,
    },
    'PARTLY_TRUE': {
        label: '일부 사실',
        color: '#EABB09',
        analysisComplete: true,
    },
    'MOSTLY_FALSE': {
        label: '대부분 거짓',
        color: '#FC8AA4',
        analysisComplete: true,
    },
    'FALSE': {
        label: '거짓',
        color: '#D40011',
        analysisComplete: true,
    },
    'UNCHECKABLE': {
        label: '판독 불가',
        color: '#777777',
        analysisComplete: true,
    },
    'PENDING_ANALYSIS': {
        label: '분석 대기 중',
        color: '#222',
        analysisComplete: false,
    },
    'IN_PROGRESS': {
        label: '분석 진행 중',
        color: '#222',
        analysisComplete: false,
    },
} as const;

export type FactValuesType = keyof typeof Facts;
export type FactLabelType = typeof Facts[FactValuesType]['label'];


export type FactMapping = {
    [K in FactValuesType]: {
        value: K;
        label: typeof Facts[K]['label'];
        color: typeof Facts[K]['color']
        analysisComplete: typeof Facts[K]['analysisComplete']
    }
}[FactValuesType];


export type CompletedFactMapping = Exclude<
    FactMapping,
    { analysisComplete: false }
>;
