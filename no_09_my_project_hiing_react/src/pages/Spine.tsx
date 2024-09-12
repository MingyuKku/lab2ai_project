import React from 'react';
import { SpinePlayer } from '@esotericsoftware/spine-player';


const Spine = () => {

    const playerRef = React.useRef<HTMLDivElement | null>(null);
    const container = React.useRef<SpinePlayer | null>(null);


    React.useEffect(() => {
        if (playerRef.current) {
            new SpinePlayer(playerRef.current, {
                // jsonUrl: '/spine/home_hana.json',
                // atlasUrl: '/spine/home_hana.atlas',
                // animation: "animate",
                jsonUrl: '/spine/home_poguny.json',
                atlasUrl: '/spine/home_poguny.atlas',
                animation: "animate",
                // jsonUrl: '/spine/raptor-pro.json',
                // atlasUrl: '/spine/raptor-pma.atlas',
                // animation: "walk",
                // jsonUrl: '/spine/skeleton.json',
                // atlasUrl: '/spine/skeleton.atlas',
                // animation: "animation",
                showControls: false,
                premultipliedAlpha: true,
                preserveDrawingBuffer: true,
                backgroundColor: "#000000",
                alpha: true,
                // defaultMix: 1,
                defaultMix: 0,
                // viewport: {
                //     debugRender: true,
                // },
                // controlBones: ["root"],
                success: (player: SpinePlayer) => {
                    console.log('성공', player)
                    container.current = player;
                },
            })
        }
    }, [])

    return (
        <div className='h-[2000px]'>
            <div ref={ playerRef }></div>
            {/* <button onClick={ () => container.current?.setAnimation('walk', true) }>걷기</button><br />
            <button onClick={ () => container.current?.setAnimation('jump', false) }>점프</button><br />
            <button onClick={ () => container.current?.setAnimation('roar', false) }>울기</button> */}
            <button onClick={ () => container.current?.setAnimation('enjoy', true) }>즐거움</button><br />
            <button onClick={ () => container.current?.setAnimation('angry', false) }>화냄</button><br />
            <button onClick={ () => container.current?.setAnimation('sad', false) }>슬퍼함</button>
        </div>
    )
}

export default Spine