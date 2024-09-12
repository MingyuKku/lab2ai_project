import { useMetaHead } from "../_app/useMetaHead";
import type { CryptoDetailInfo } from "./tv-tech-chart/services/_types";

export const useCoinDetailMetaHeadOg = (crypto: CryptoDetailInfo | null) => {
    if (!crypto) return;

    const { setMetaOg } = useMetaHead();

    setMetaOg({
        title: `${crypto.cryptoCurrencyItem.digitalAssetsKoName} 상세 정보`,
        description: `${crypto.cryptoCurrencyItem.digitalAssetsKoName}의 시세 감지와 패턴 포착, 그리고 AI 시세 예측까지 한 눈에 확인하실 수 있습니다.`,
    })
}