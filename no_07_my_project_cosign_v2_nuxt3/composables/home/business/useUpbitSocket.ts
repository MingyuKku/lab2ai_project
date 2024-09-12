import type { UpbitSocketMessageItem } from "./_types";
import { useInstance } from "~/composables/_api/useInstance";
import type { CryptoListReactiveData } from "../service/_types";
import { useCommon } from "~/composables/_app/useCommon";
import { useUpbitSocketReconnectDelay } from "~/composables/useLocalStorage/useUpbitSocketReconnectDelay";

export const useUpbitSocket = (crypto: CryptoListReactiveData | string) => {

    const socketUrl = 'wss://api.upbit.com/websocket/v1';
    const upbitSocket = ref<WebSocket | null>(null);
    const errorTimer = ref<NodeJS.Timeout | null>(null);
    const RE_CONNECT_TIME = 10; // 재연결 간격 (10초) 업비트에서 10초당 1회로 제한둠

    const socketMessages = ref<UpbitSocketMessageItem[]>([]);

    const { setStorage, getStorage } = useUpbitSocketReconnectDelay();
    const { delay } = useCommon();
    const { numberFormat } = useInstance();


    /**
     * 업비트 소켓 연결
     */
    const connectUpbit = () => {
        upbitSocket.value?.close();

        upbitSocket.value = new WebSocket(socketUrl);
    
        upbitSocket.value.onopen = async () => {
            upbitSocket.value?.addEventListener('message', onSocketMessage);

            setStorage(String(new Date().getTime()));
            const totalUpbitCryptoCodes = typeof crypto === 'string'
                                            ? ['KRW-' + crypto]
                                            : crypto.total
                                                .filter((cpt) => cpt.exchangeType === 'UPBIT')
                                                .map((cpt) => 'KRW-' + cpt.digitalAssetsCode);
                                                
            const subscribeMsg = JSON.stringify([
                {
                    ticket: "BTC_KRW_TICKER"
                },
                {
                    type: "ticker", // 현재가
                    codes: totalUpbitCryptoCodes
                    // codes: ['KRW-XEM', 'KRW-WAXP', 'KRW-DOGE', 'KRW-SOL', 'KRW-BTC', 'KRW-LRC', 'KRW-STRAX', 'KRW-ETH', 'KRW-SEI', 'KRW-STX', 'KRW-BORA', 'KRW-LRC', 'KRW-ROSE', 'KRW-BCH', 'KRW-LTC', 'KRW-MANA', 'KRW-MED', 'KRW-MVL']
                },
            ]);
            
            upbitSocket.value?.send(subscribeMsg);
        }
    
        upbitSocket.value.onerror = async (err) => {

            const time = getStorage();
            const diff = new Date().getTime() - Number(time);
            const diffSec = Math.floor(diff / 1000);
            const diffTimer = RE_CONNECT_TIME - diffSec;

            if (RE_CONNECT_TIME > diffSec) {
                // 앞전에 연결 후 10초가 지나지 않았을 경우
                await delay(errorTimer, diffTimer * 1000);
                connectUpbit();
            } else {
                // 앞전에 연결 후 10초 이상 지났을 경우
                connectUpbit();
            }
        }
    }


    /**
     * 업비트 소켓 서버로부터 데이터를 받아오는 이벤트 콜백 함수
     */
    const onSocketMessage = async (data:MessageEvent) => {
        const blob: Blob = data.data;
        const text = await blob.text();
        const obj = JSON.parse(text);
        
        // console.log('=== 리시브 소켓 ====', obj.code)
    
        const updateItemIndex = socketMessages.value.findIndex((item) => item.code === obj.code);
    
        if (updateItemIndex > -1) {
            socketMessages.value[updateItemIndex].tradePrice = numberFormat(obj.trade_price);
            const changePrice = Number(obj.trade_price);
            socketMessages.value[updateItemIndex].change = socketMessages.value[updateItemIndex].changePrice === changePrice ? 'EVEN' : changePrice > Number(socketMessages.value[updateItemIndex].changePrice) ? 'RISE' : 'FALL';
            socketMessages.value[updateItemIndex].changePrice = changePrice;

        } else {
            const updateItem: UpbitSocketMessageItem = {
                code: obj.code,
                tradePrice: numberFormat(obj.trade_price),
                changePrice: null,
                change: obj.change,
            }
            socketMessages.value.push(updateItem);
        }
    }


    onUnmounted(() => {
        upbitSocket.value?.close();
        if (errorTimer.value) clearTimeout(errorTimer.value);
    })

    return {
        connectUpbit,
        socketMessages,
        upbitSocket,
    }
}