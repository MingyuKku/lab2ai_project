import type { LocationQuery, RouteParams } from "vue-router";
import type { CryptoDetailPageQueryContentsType } from "./tab-contents/business/_types";
import type { CryptoDetailInfo } from "./tv-tech-chart/services/_types";
import type { TradeExchangeType } from "../home/service/_types";
import { useFetchCryptoInfo } from "./useFetchCryptoInfo";


/**
 * 
 * @exceptionalCase 외부 페이지 → 타임 라인 탭, SIGN 탭
 * @exceptionalCase 타임 라인 탭 → 차트 패턴 타임 라인 → 차트 패턴 탭
    @exceptionalCase 타임 라인 탭 → 차트 패턴 타임 라인 → 차트 패턴 탭 → 타임 라인 탭 → 차트 패턴 타임 라인
    @exceptionalCase 타임 라인 탭 → 시장 감지 타임 라인 → 시간 이동
    @exceptionalCase 차트 패턴 탭 → 최근 포착된 패턴
    @exceptionalCase SIGN 탭 → SIGN 클릭 → SIGN 상세 → history back
 */
export function useCoinTabIndex(paramCryptoId: number | null, setPatternVisible: (value: boolean) => void) {
    const tabIndex = ref<CryptoDetailPageQueryContentsType | null>(null);
    const cryptoId = ref<number | null>(null);
    const cryptoInfo = ref<CryptoDetailInfo | null>(null);
    const exchange = ref<TradeExchangeType | null>(null);

    const onClickTabNav = (type: CryptoDetailPageQueryContentsType) => {
        if(exchange.value === 'upbit') {
            tabIndex.value = type;
        }
    }

    watch(
      () => {
        const { query: {tabIndex} } = useRoute();
    
        return tabIndex;
      },
      (value) => {
        tabIndex.value = value as CryptoDetailPageQueryContentsType;
      },
    );

    const initTabSelection = async (queryTabIndex: CryptoDetailPageQueryContentsType | null, buttonPatternId: number | null) => {
        await nextTick();
    
        if(queryTabIndex === null) {
            if(exchange.value === 'upbit') {
                tabIndex.value = "timeline";
            } else if(buttonPatternId) {
                tabIndex.value = "pattern";
            } else {
                tabIndex.value = "signs";
            }
        } else {
            if(exchange.value === 'binance') {
                tabIndex.value = "signs";
            } else {
                tabIndex.value = queryTabIndex as CryptoDetailPageQueryContentsType;
            }
        }

        replace();
    }

    const replace = () => {
        const { params, query } = useRoute();
        const { replace } = useRouter();
    
        replace({
            params: {...params, cryptoid: cryptoId.value}, 
            query: {...query, tabIndex: tabIndex.value}
        });
    }

    const initCryptoInfo = async () => {
        const cryptoInfoRes = await useFetchCryptoInfo(paramCryptoId);
        
        cryptoInfo.value = cryptoInfoRes;

        cryptoId.value = cryptoInfoRes?.cryptoCurrencyItem.cryptoCurrencyId ?? null;
        exchange.value = cryptoInfoRes?.exchange?? null;
    }

    watch(tabIndex, (newValue) => {
        replace();
    
        if(newValue === "pattern") {
            setPatternVisible(true);
        } else {
            setPatternVisible(false);
        }
    })

    return {
        cryptoId,
        exchange,
        tabIndex,
        cryptoInfo,
        onClickTabNav,
        initCryptoInfo,
        initTabSelection,
    }
}