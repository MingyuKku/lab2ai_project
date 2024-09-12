import type { CoinDetailTabNav } from "./_types";

export const queryName = 'content';

export const coinDetailTabNav: CoinDetailTabNav[] = [
    {
        name: 'timeline',
        label: '타임 라인',
        labelType: 'text'
    },
    {
        name: 'pattern',
        label: '차트 패턴',
        labelType: 'text'
    },
    {
        name: 'signs',
        label: null,
        labelType: 'icon',
        icon: 'https://kr.object.ncloudstorage.com/cosign/version1/aimodel/sign.png',
    },
]