import { useMetaHead } from "~/composables/_app/useMetaHead";
import type { ClassSignDetailInfo } from "../service/_types";

export const useSignDetailMetaHeadOg = (sign: ClassSignDetailInfo | null) => {
    if (!sign) return;
    
    const { setMetaOg } = useMetaHead();
    
    const getCryptoName = () => {
        if (sign.exchangeType === 'UPBIT') return sign.digitalAssetsKoName;
        if (sign.exchangeType === 'BINANCE') return sign.cryptoFullCode;
    }

    setMetaOg({
        title: `${getCryptoName()} AI 시세 예측`,
        description: `${sign.modelName} 모델이 분석한 ${getCryptoName()}의 AI 예측 시세를 공개합니다.`
    })
}