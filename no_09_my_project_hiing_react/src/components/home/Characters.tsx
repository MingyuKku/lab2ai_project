import React from 'react';
import { useSelector } from 'react-redux';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { selectMember } from '_redux/member/selector';
import { selectHomeCharactor } from '_redux/home-character/selector';
import { useSwiperMethods } from 'hooks/home/useSwiperMethods';
import { getCharacterList, CharactersClass } from 'services/character';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import CharacterThumbList from 'components/home/CharacterThumbList';
import SlideView from 'components/home/SlideView';
import PageLoading from 'components/common/fallback/PageLoading';
import ErrorFallback from 'components/error/ErrorFallback';
import { useLocation } from 'react-router-dom';


export interface PersonalMessages {
    [key: string]: string;
}

const Characters = () => {
    const { se } = useSelector(selectMember);
    const { activeTabIndex } = useSelector(selectHomeCharactor);
    const location = useLocation();
    const characteEnNm = new URLSearchParams(location.search).get('character_en_nm');

    const INDEX_KEY: QueryKey = ['characters'];
    const { data: characters, isLoading, isFetching, error, status } = useQuery({
        queryKey: INDEX_KEY,
        queryFn: () => getCharacterList(se!, 1, 5),
        staleTime: Infinity // 무한대
    })

    const getIndex = React.useMemo(() => {
        if (!characters) return;
        if (!characteEnNm) return 0;
        
        const characteEnNmSearchParams = characteEnNm.toLocaleLowerCase();
        const findIndex = characters.findIndex(item => item.character_en_nm.toLocaleLowerCase() === characteEnNmSearchParams);
        // console.log('하핫', findIndex, activeTabIndex)
        if (findIndex > -1) return findIndex;
        else return 0;

    }, [characters, characteEnNm])


    const [ visibleSwiperIndex, setVisibleSwiperIndex ] = React.useState<number[]>([]);

    React.useEffect(() => {
        if (getIndex === undefined) return;
        setVisibleSwiperIndex([getIndex])
    }, [getIndex])

    const {
        swiperInit,
        onSlideChange,
        swiper,
        characterTitle,
    } = useSwiperMethods({
        setVisibleSwiperIndex,
        visibleSwiperIndex,
        memberSe: se,
        characters: characters!,
    });


    if (error) {
        return <ErrorFallback error={ error } />
    }

    if (isLoading || isFetching || !characters) {
        return <PageLoading />
    }

    return (
        <div className='character-wrap relative h-full'>
            {/* <span className='bottom-space-fill absolute top-full left-0 w-full h-[400px] bg-white'></span> */}
            {
                swiper &&
                <CharacterThumbList
                    items={ characters }
                    swiper={ swiper }
                />
            }
            <Swiper
                className='character-swiper h-full'
                threshold={ 1 }
                resistanceRatio={ 0 }
                spaceBetween={ 0 }
                slidesPerView={ 1 }
                modules={[
                    EffectFade
                ]}
                effect={'fade'}
                onInit={ swiperInit }
                onSlideChange={ onSlideChange }
            >
                {
                    characters.map((character,idx) => (
                        <SwiperSlide key={ character.order_no }>
                            {
                                visibleSwiperIndex.includes(idx) &&
                                <SlideView
                                    item={ character }
                                    characterTitle={ characterTitle }
                                />
                            }
                        </SwiperSlide>
                    )) 
                }
            </Swiper>
        </div>
    )
}

export default Characters;