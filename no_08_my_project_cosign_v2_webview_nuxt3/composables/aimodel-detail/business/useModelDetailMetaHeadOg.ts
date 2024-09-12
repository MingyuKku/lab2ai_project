import { useMetaHead } from "~/composables/_app/useMetaHead";
import type { ModelProfileDetail } from "../service/_types";

export const useModelDetailMetaHeadOg = (profile: ModelProfileDetail | null) => {
    if (!profile) return;

    const { setMetaOg } = useMetaHead();
    
    setMetaOg({
        title: profile.modelName,
        description: profile.description
    })
}