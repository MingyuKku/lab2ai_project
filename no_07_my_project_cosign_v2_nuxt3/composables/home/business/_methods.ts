import type { SignStatusType } from "~/composables/aimodel-detail/service/_types";
import { piniaAuthInfoValues } from "~/pinia/user/piniaAuthInfoValues";
import type { SimpleStatusType } from "../service/_types";

/**
 * 권한이 있는 경우 false, 권한이 없는 경우 true
 */
export const isSignBlur = (pay: boolean, ticket: boolean, signStatusType?: SignStatusType | Lowercase<SignStatusType>): boolean => {
    if (signStatusType === 'END' || signStatusType === 'end') return false;

    if (ticket) return false;

    if (!pay) return false;

    return true;
}


/**
 * 무료이용자에게 노출해야 할 경우 true 반환
 */
export const isFreeSign = (ticket: boolean, pay: boolean, status: SimpleStatusType | SignStatusType) => {
    
    if (ticket) return false;
    if (status === 'end' || status === 'END') return false;
    if (!pay) return true;
    // if (!isUserSignedIn && !pay) return true;
    return false;
}