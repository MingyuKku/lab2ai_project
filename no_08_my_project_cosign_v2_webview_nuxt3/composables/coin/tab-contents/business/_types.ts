export const CryptoDetailPageQueryContents = ['timeline', 'pattern', 'signs'] as const;

export type CryptoDetailPageQueryContentsType = typeof CryptoDetailPageQueryContents[number];

export interface CoinDetailTabNav {
    name: CryptoDetailPageQueryContentsType;
    label: string | null;
    labelType: 'text' | 'icon',
    icon?: string;
}
