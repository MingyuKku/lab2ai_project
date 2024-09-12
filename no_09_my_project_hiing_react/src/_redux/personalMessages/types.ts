export interface State {
    messages: {
        [key: string]: string;
    }
}


export interface PersonalMessagesPayloadAction {
    key: string;
    message: string;
}