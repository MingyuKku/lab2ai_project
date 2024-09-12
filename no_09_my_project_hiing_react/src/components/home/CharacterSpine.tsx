import React from 'react';
import { SpinePlayer } from '@esotericsoftware/spine-player';
import { messageWebview } from 'hooks/useWebviewBridge';

interface Props {
    jsonUrl: string;
    atlasUrl: string;
    animationName: string;
    loop: boolean;
    className?: string;
}

const CharacterSpine = ({
    jsonUrl,
    atlasUrl,
    animationName,
    loop,
    className,
}: Props) => {
    const playerRef = React.useRef<HTMLDivElement | null>(null);
    const trackLoop = React.useRef<boolean>(true);

    React.useEffect(() => {
        if (playerRef.current) {
            new SpinePlayer(playerRef.current, {
                // jsonUrl: '/spine/home_hana.json',
                // atlasUrl: '/spine/home_hana.atlas',
                jsonUrl: jsonUrl,
                atlasUrl: atlasUrl,
                animation: animationName,
                // scale: 0.3,
                viewport : {
                    padTop: 0,
                    padBottom: 0,
                    padLeft: 0,
                    padRight: 0
                },
                showLoading: false,
                showControls: false,
                preserveDrawingBuffer: true,
                // backgroundColor: "#000000",
                premultipliedAlpha: true,
                alpha: true,
                defaultMix: 1,
                // viewport: {
                //     debugRender: true,
                // },
                // controlBones: ["root"],
                // success: (player: SpinePlayer) => {
                //     if (!playerRef.current) return;

                //     const lastIndex = playerRef.current.children.length - 1;
                //     const arrayDom = Array.from(playerRef.current.children);
                //     arrayDom.forEach((dom,idx) => {
                //         if (lastIndex !== idx) dom.remove();
                //     })
                // },
                loading: (player: SpinePlayer, delta: number) => {
                    if (loop || !player.animationState || !trackLoop.current) return;
                    const track = player.animationState.tracks[0];
                    
                    if (track) {
                        track.loop = false;
                        trackLoop.current = false;
                    }
                },
            })
        }
    }, [])


    return (
        <div className={`${className ?? ''}`}>
            <div ref={ playerRef }></div>
        </div>
    )
}

export default CharacterSpine;
