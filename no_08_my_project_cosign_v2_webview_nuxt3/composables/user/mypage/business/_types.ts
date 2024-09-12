import type { InputData } from "../../sign-up/business/_types";

export interface MypageInputs {
    nickname: InputData;
    email: InputData;
    oldPassword: InputData;
    newPassword: InputData;
    newPasswordCheck: InputData;
}