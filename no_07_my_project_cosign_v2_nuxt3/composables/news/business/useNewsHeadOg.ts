import { useMetaHead } from "~/composables/_app/useMetaHead";
import type { ClassAiPersonaNewsChats } from "../service/_types-chat";

export const useNewsHeadOg = (newsChats: ClassAiPersonaNewsChats | null) => {

    if (!newsChats) return;

    const { setMetaOg } = useMetaHead();

    const firstChats = newsChats.aiPersonaNewsChatItems[0].newsChatText?.split('^@^');
    const isImages = firstChats?.map(chat => chat.startsWith('$!'));
    const imageIndex = isImages?.findIndex(image=>image);
    const descChats = firstChats?.slice(1, imageIndex);
    
    if (firstChats && descChats && imageIndex) {
        const image = firstChats[imageIndex].replace('$!#', '')
        const title = newsChats.title;
        
        setMetaOg({
            title: title,
            description: descChats.join(' '),
            image: image,
        })
    }
}