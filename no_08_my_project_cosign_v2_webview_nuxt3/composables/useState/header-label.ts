import type { HeaderLabel } from "./_types";
import { HEADER_LABEL } from "./keys";

export function useStateHeaderLabel() {

    const getLabel = () => {
        return useState<HeaderLabel>(HEADER_LABEL);
    }

    const setLabel = (value: HeaderLabel) => {
        const state = useState<HeaderLabel>(HEADER_LABEL);
        state.value = value;
    }

    return {
        getLabel,
        setLabel,
    }
}