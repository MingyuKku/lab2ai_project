import { createAsyncThunk } from "@reduxjs/toolkit";
import { messageMixpanel } from "hooks/useWebviewBridge";
import { chatFeedback } from "services/chat/_fetch/chatRoom";

interface Props {
    member_se: number;
    character_se: number;
    character_nm: string;
    chat_id: string;
    type_cd: number;
    etc_ct?: string;
}

export const fetchChatFeedback = createAsyncThunk(
    'modalSlice/fetchChatFeedback',
    async ({
        member_se,
        character_se,
        character_nm,
        chat_id,
        type_cd,
        etc_ct
    }: Props) => {
        try {
            await chatFeedback(member_se, character_se, chat_id, type_cd, etc_ct);

            messageMixpanel({
                tracking_type: 'event',
                event_name: 'complete_complain_chat',
                param: {
                    'persona': character_nm,
                    'type': String(type_cd)
                }
            })

            return {
                success: true
            }

        } catch (err) {
            console.log('피드백 에러', err)
            return {
                success: false
            }
        }
    }
)