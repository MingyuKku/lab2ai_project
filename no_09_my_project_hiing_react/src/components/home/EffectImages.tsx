import React from "react";

const EffectImages = () => {

    const onLoadImg = React.useCallback((e: React.BaseSyntheticEvent, cssClass: string) => {
        const target = e.target as HTMLElement;
        const parentEl = target.parentElement;
        parentEl?.classList.add(cssClass);
    }, [])
    
    return (
        // <div className='effect-images absolute top-0 -translate-y-1/2 w-full h-full'>
        <div className='effect-images absolute top-full w-full -translate-y-[10%] h-full'>
            <div className="right-side-cloud-image absolute right-0 top-1/2 select-none pointer-events-none">
                <img
                    src="https://d25qtvpmz7kl1a.cloudfront.net/home/cloud-side.png"
                    alt="side-cloud"
                    width={360}
                    height={200}
                    loading='lazy'
                    onLoad={ (e) => onLoadImg(e, 'home-character-effect-right-side-cloud') }
                />
            </div>
            <div className="left-side-cloud-image absolute left-0 top-1/2 select-none pointer-events-none">
                <img
                    src="https://d25qtvpmz7kl1a.cloudfront.net/home/cloud-side.png"
                    alt="side-cloud"
                    width={360}
                    height={200}
                    loading='lazy'
                    onLoad={ (e) => onLoadImg(e, 'home-character-effect-left-side-cloud') }
                />
            </div>
            <div className='base-cloud-image w-full'>
                <img
                    src="https://d25qtvpmz7kl1a.cloudfront.net/home/cloud-base.png"
                    alt="base-cloud"
                    width={360}
                    height={260}
                    loading='lazy'
                />
            </div>
        </div>
    )
}

export default EffectImages;