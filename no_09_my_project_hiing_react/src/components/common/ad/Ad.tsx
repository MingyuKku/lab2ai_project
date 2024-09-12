import React from 'react'


// 애드센스
{/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2185824829459089" crossorigin="anonymous"></script> */}


// :adsense="{
//     slot: '9951301238',
//     layoutKey: '-6d+cb-8-4s+o3',
//     format: 'fluid',
//     style: {
//         'display': 'block',
//     }
// }"


const Ad = () => {

    const adins = React.useRef<HTMLDivElement>(null);
    const adpush = React.useRef<HTMLDivElement>(null);

    const adsenseClientId = '2185824829459089';
    const adsenseSlot = '8158915752';
    const adfitUnitId = 'DAN-FMrtqBxqOFeriV7S';

    React.useEffect(() => {

        if (!adins.current || !adpush.current) return;


        function createGoogleAdSense() {
            const ins = document.createElement('ins') as HTMLElement;
            ins.classList.value = "adsbygoogle";
            ins.setAttribute('data-ad-client', `ca-pub-${adsenseClientId}`);
            ins.setAttribute('data-ad-slot', adsenseSlot);
            ins.setAttribute('data-ad-format', 'auto');
            ins.setAttribute('data-full-width-responsive', 'true');
            ins.style.display = 'block';
            adins.current!.append(ins);
          
            const script = document.createElement('script') as HTMLScriptElement;
            script.text = `
              (adsbygoogle = window.adsbygoogle || []).push({});
            `;
            script.async = true;
            adpush.current!.append(script);
        }


        const createKakaoAdfit = () => {
            const ins = document.createElement('ins') as HTMLElement;
            ins.className = 'kakao_ad_area';
            ins.style.display = "none";
            ins.setAttribute('data-ad-unit', adfitUnitId);
            ins.setAttribute('data-ad-width', '320');
            ins.setAttribute('data-ad-height', '50');
            // ins.setAttribute('data-ad-onfail', 'callBackFunc'); // NO-AD시 실행될 Callback 함수명
            adins.current!.append(ins);

            const script = document.createElement('script') as HTMLScriptElement;
            script.async = true;
            script.type = "text/javascript";
            script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
            adpush.current!.append(script);
        }

        // createGoogleAdSense();
        createKakaoAdfit();
    })


    const callBackFunc = React.useCallback((arg: any) => {
        console.log('이게 뭐지', arg)
    }, [])
    
    return (
        <div className='pointer-events-none'>
            <div ref={ adins } className='adins'></div>
            <div ref={ adpush } className='adpush'></div>
        </div>
    )
}

export default Ad;