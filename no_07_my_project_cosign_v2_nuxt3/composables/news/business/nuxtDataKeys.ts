import { PERSONA_NEWS_LIST, PERSONA_NEWS_REPORTERS } from "~/composables/_app/asyncDataFetchKeys";
import type { AiPersonaReporter } from "../service/_types";

export const getCharacterNuxtDataKeys = () => {
    const { data } = useNuxtData<AiPersonaReporter[]>(PERSONA_NEWS_REPORTERS);
    if (!data.value) return;

    return data.value.reduce((acc: string[], reporter) => {
        if (reporter.characterType === 'REPORTER') {
            acc.push(`${PERSONA_NEWS_LIST}-${reporter.aiPersonaCharacterId}`);
        }

        return acc;
    }, []);
}