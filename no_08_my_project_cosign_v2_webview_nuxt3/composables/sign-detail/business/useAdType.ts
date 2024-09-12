import { messageWebview } from "~/composables/_app/useFlutterWebview";
import type { AdType } from "../service/_types";
import type { TradeType } from "~/composables/home/service/_types";

export const useAdType = (adType?: AdType, pay?: boolean, tradeType?: TradeType) => {
    if (!adType) return;

    // 무료 + 선물일 경우 광고 노출X ---- 임시조치
    // if (pay === false && tradeType === 'FUTURES') return;

    // 무료 싸인 + 선물일 경우 광고 노출 x
    if (adType === 'BASIC_AD') messageWebview(`show_interstitial_ad`);
    if (adType === 'REWARD_AD') messageWebview(`show_reward_ad`);
}