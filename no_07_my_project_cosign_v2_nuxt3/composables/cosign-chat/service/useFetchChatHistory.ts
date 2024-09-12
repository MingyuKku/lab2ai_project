import type { BasicRes } from "~/composables/_api/_types";
import { piniaStompSocket } from "~/pinia/cosign-chat/piniaStompSocket";
import { ClassGroupbyDateMessageHistory, ClassMessageHistory, type ChatHistoryInstance, type ChatHistoryRes, type MessageHistory } from "./_types";
import { useInstance } from "~/composables/_api/useInstance";
import { useDateFormat } from "../business/useDateFormat";
import { useStompSocket } from "../business/useStompSocket";
import { useCommon } from "~/composables/_app/useCommon";

export const useFetchChatHistory = () => {

    const { POJO } = useInstance();
    const { isHistoryBack } = useCommon();
    const { socketRoom, updateMessage } = piniaStompSocket();
    const { isEqualUuid } = useStompSocket();
    const { $serviceChatApiFetch } = useNuxtApp();
    const dateFormat = useDateFormat();

    // const getHistory = async (key: string): Promise<ChatHistoryRes | null> => {
    const getHistory = async (key: string): Promise<ChatHistoryInstance | null> => {

        try {
            // const { data: cache } = useNuxtData<ChatHistoryRes>(key);
            const { data: cache } = useNuxtData<ChatHistoryInstance>(key);

            // console.log('호잇', cache.value, isHistoryBack())
            if (cache.value) {

                if (isHistoryBack()) {
                    // 뒤로가기로 접근시
                    updateMessage(cache.value.message_history);
                    return cache.value;
                }
                
                // 브라우저 비활성화 => 활성화시 최신 데이터 fetch
                if (cache.value.isVisibilitychange) return initHistory();

                // 더보기 fetch
                return moreHistory(cache.value);

            } else {
                // 최초 데이터 fetch
                return initHistory();
            }
            

        } catch (err) {
            return null;
        }
    }




    // const moreHistory = async (cache: ChatHistoryRes) => {
    const moreHistory = async (cache: ChatHistoryInstance) => {
        const { message_history } = cache;
        const pastMessageId = message_history[0].message_id;

        const { data: moreData }: {data: ChatHistoryRes} = await $serviceChatApiFetch<BasicRes>(`message/history`, {
            params: {
                message_id: pastMessageId,
                room_uuid: socketRoom.room_uuid
            }
        });

        if (!moreData) {
            return cache;
        };

        const instance = createInstance(moreData.message_history, dateFormat);
        
        cache.is_last_message = moreData.is_last_message;
        cache.message_history = POJO<ClassMessageHistory[]>(instance).concat(cache.message_history);

        updateMessage(cache.message_history);

        return cache;
    }



    const initHistory = async () => {
        const { data }: {data: ChatHistoryRes} = await $serviceChatApiFetch<BasicRes>(`message/history`, {
            params: {
                room_uuid: socketRoom.room_uuid
            }
        });
        
        if (!data) return null;

        const instance = createInstance(data.message_history, dateFormat);

        const returnInstance: ChatHistoryInstance = {
            is_last_message: data.is_last_message,
            message_history: POJO<ClassMessageHistory[]>(instance)
        }

        updateMessage(returnInstance.message_history);

        return returnInstance;
    }



    // const createInstance = (messageHistory: MessageHistory[]): ClassGroupbyDateMessageHistory => {
    const createInstance = (messageHistory: MessageHistory[], dateFormat: Intl.DateTimeFormat): ClassMessageHistory[] => {

        const instance: ClassMessageHistory[] = messageHistory.map((history) => new ClassMessageHistory(history, isEqualUuid, dateFormat));
        
        return instance;
    }


    return {
        getHistory,
    }
}