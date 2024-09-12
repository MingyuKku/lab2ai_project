export interface State {
    alertPopup: AlertPopup
    chatFeedback: ChatFeedback;
}

export interface ChatFeedback {
    modalFlag: boolean;
    chatId?: string;
}

export interface AlertPopup {
    basicModalFlag: boolean;
    popupTitle?: string[];
    popupDescription?: string[];
    popupButtons?: {
        ok?: {
            title: string;
        } | null;
        cancle?: {
            title: string;
        } | null;
    }
}