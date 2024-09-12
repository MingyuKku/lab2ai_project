import { useInstance } from "~/composables/_api/useInstance";
import type { SocketUiData } from "./_types";

export const useBinanceSocket = (digitalAssetsCode: string) => {

    const streamName = digitalAssetsCode.toLocaleLowerCase() + 'usdt';
    const socketUrl = `wss://stream.binance.com:9443/ws/${streamName}@ticker`;

    const binanceSocket = ref<WebSocket | null>(null);


    const binanceUiData = reactive<SocketUiData>({
        tradePrice: null,
        changePrice: null,
        change: null,
    })

    const { numberFormat } = useInstance();


    /**
     * 바이낸스 소켓 서버와 연결 + 데이터를 받아오는 이벤트를 등록하는 함수
     */
    const connectBinance = () => {
        binanceSocket.value = new WebSocket(socketUrl);

        binanceSocket.value.onmessage = (data:MessageEvent) => {
            const obj = JSON.parse(data.data);

            const isEqualUsdtCryptoCode = () => obj.s.toLocaleLowerCase() === digitalAssetsCode.toLocaleLowerCase() + 'usdt';
            
            if (isEqualUsdtCryptoCode()) {
                // binanceUiData.tradePrice = numFormat.format(obj.c);
                binanceUiData.tradePrice = numberFormat(obj.c);
                const changePrice = Number(obj.p);
                binanceUiData.change = binanceUiData.changePrice === changePrice ? 'EVEN' : changePrice > Number(binanceUiData.changePrice) ? 'RISE' : 'FALL';
                binanceUiData.changePrice = changePrice;
            }
        }
    }




    onUnmounted(() => {
        binanceSocket.value?.close();
    })

    return {
        connectBinance,
        binanceUiData,
        binanceSocket,
    }
}