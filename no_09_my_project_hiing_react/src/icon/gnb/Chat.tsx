
interface Props {
    active: boolean;
}

const Chat = ({ active }: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
        >
            <path fill={ active ? '#FF763B' : '#CACACA'} d="M12.714 25H2v-6.694c0-2.468.63-4.413 1.898-5.834 1.26-1.429 3.43-2.685 6.5-3.777l2.316 3.56c-1.89.718-3.195 1.436-3.914 2.147-.725.71-1.12 1.555-1.209 2.528h5.124V25zM28 25H14.868v-8.212c0-3.022.777-5.408 2.323-7.158 1.547-1.75 4.207-3.291 7.974-4.63L28 9.36c-2.316.883-3.913 1.758-4.8 2.633-.887.875-1.378 1.908-1.48 3.104H28V25z"/>
        </svg>
    )
}

export default Chat