import { useAlertButtonHandler } from "hooks/alert/useAlertButtonHandler";

// 커스텀 훅의 반환 타입 정의
type AlertButtonHandlers = ReturnType<typeof useAlertButtonHandler>;

export type AlertButtonHandlerKeys = keyof AlertButtonHandlers;