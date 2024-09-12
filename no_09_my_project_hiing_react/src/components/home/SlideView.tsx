import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { messageMixpanel, messageWebview } from 'hooks/useWebviewBridge';
import { CharactersClass } from 'services/character';
import ContentView from 'components/home/ContentView';
import CharacterSpine from './CharacterSpine';
import { PersonalMessages } from './Characters';
import { SwiperClass } from 'swiper/react';
import EffectImages from './EffectImages';
// import PersonalMessage from 'components/home/PersonalMessage';

const PersonalMessage = React.lazy(() => import('components/home/PersonalMessage'));


interface Props {
    item: CharactersClass;
    characterTitle: string | null;
}

const SlideView = ({ item, characterTitle }: Props) => {

    const swiperSlideRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!item) return;
        
        messageMixpanel({
            tracking_type: 'event',
            event_name: 'view_home',
            param: {
                'persona': item.character_nm
            }
        });
    }, [item])

    const onClickCharacterInfo = React.useCallback((character_nm: string) => {
        return () => {
            messageMixpanel({
                tracking_type: 'event',
                event_name: 'click_explanation',
                param: {
                    'persona': character_nm
                }
            });
        }
    }, [])


    React.useEffect(() => {
        if (!swiperSlideRef.current) return;

        // 앱에서 카카오 로그인시 간헐적으로 생기는 이슈를 해결하기 위한 조치
        if (swiperSlideRef.current.offsetHeight > window.innerHeight) {
            window.location.reload();
        }
    }, [swiperSlideRef])


    const onClickSpine = React.useCallback((character_nm: string) => {
        if (!character_nm) return;
        
        messageMixpanel({
            tracking_type: 'event',
            event_name: 'click_character',
            param: {
                'persona': character_nm
            }
        });
    }, [])

    return (
        <div ref={ swiperSlideRef } className='swiper-inner relative min-h-full'>
            <Link
                to={`/character/${item.character_se}`}
                onClick={ onClickCharacterInfo(item.character_nm) }
                className='block absolute top-5 right-3.5 w-[124px] z-[1]'
            >
                <img
                    src={ item.info_button_lk }
                    alt="link"
                    width={124} height={28}
                    loading='lazy'
                />
            </Link>
            <div className="bg-image absolute top-0 left-0 z-0 w-full h-full">
                <img
                    src={ item.background_lk }
                    alt="bg"
                    width={360}
                    height={400}
                    loading='lazy'
                    className='h-full object-cover'
                />
            </div>
            <div className="character-content-wrap absolute bottom-0 w-full">
                <React.Suspense>
                    <PersonalMessage
                        item={ item }
                        characterTitle={ characterTitle }
                    />
                </React.Suspense>
                <div className="home-character-image-wrap relative">
                    <div className="character-image-transition w-full pt-2">
                        <div
                            className="spine-wrap home-character-image flex justify-center"
                            onClick={ () => onClickSpine(item.character_nm) }
                        >
                            <CharacterSpine
                                jsonUrl={`/spine/home_${item.character_en_nm.toLocaleLowerCase()}.json`}
                                atlasUrl={`/spine/home_${item.character_en_nm.toLocaleLowerCase()}.atlas`}
                                animationName='animate'
                                loop={ true }
                                className='w-[136%] shrink-0 -mb-[8%]'
                            />
                        </div>
                    </div>
                    <EffectImages />
                </div>
                <div className="bottom bg-white left-0 w-full relative z-[1]">
                    <ContentView
                        item={ item }
                    />
                </div>
            </div>
        </div>
    )
}

export default SlideView;