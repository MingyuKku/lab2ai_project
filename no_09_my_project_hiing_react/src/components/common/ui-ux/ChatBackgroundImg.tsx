interface Props {
    bgImageUrl?: string;
    lazy?: boolean;
}

const ChatBackgroundImg = ({ bgImageUrl, lazy }: Props) => {
    // ${ !bgImageUrl ? 'before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-white before:bg-opacity-75' : '' }
    return (
        <div className='bg-image fixed top-0 w-full max-w-desktop h-full pointer-events-none select-none'>
            <img
                // src={ bgImageUrl ?? 'https://d25qtvpmz7kl1a.cloudfront.net/chat/chat-room-bg.png' }
                src={ bgImageUrl }
                alt="bg"
                width={360}
                height={400}
                loading={ lazy === false ? undefined : 'lazy' }
                className='h-full object-cover'
            />
        </div>
    )
}

export default ChatBackgroundImg