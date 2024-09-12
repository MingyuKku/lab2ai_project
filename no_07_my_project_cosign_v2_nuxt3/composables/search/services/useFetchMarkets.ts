import { useInstance } from "~/composables/_api/useInstance";
import { TickerClass, type Ticker } from "./_types";

export const recomendList = [
    {
        digitalAssetsDisplayKrName: '비트코인',
        digitalAssetsId: 1,
        digitalAssetsCode: 'BTC',
        cryptoId: 1,
    }, {
        digitalAssetsDisplayKrName: '이더리움',
        digitalAssetsId: 2,
        digitalAssetsCode: 'ETH',
        cryptoId: 2,
    }, {
        digitalAssetsDisplayKrName: '리플',
        digitalAssetsId: 5,
        digitalAssetsCode: 'XRP',
        cryptoId: 5,
    }, {
        digitalAssetsDisplayKrName: '에이다',
        digitalAssetsId: 20,
        digitalAssetsCode: 'ADA',
        cryptoId: 20,
    }, {
        digitalAssetsDisplayKrName: '솔라나',
        digitalAssetsId: 102,
        digitalAssetsCode: 'SOL',
        cryptoId: 102,
    }
]

export const useFetchMarkets = async (): Promise<TickerClass[]> => {
    const url = `https://api.upbit.com/v1/ticker`;

    try {
        const { $externalApiFetch } = useNuxtApp();
        const { numberFormat } = useInstance();
    
        const codesParam = recomendList.map(item => `KRW-${item.digitalAssetsCode}`);
        
        const res = await $externalApiFetch<Ticker[]>(`${url}?markets=${codesParam.join(',')}`);
        
        return res.map(item => new TickerClass(item, numberFormat));
    } catch (err) {
        return [];
    }
}