import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "_redux/store";
import { sethomeCharacter } from "_redux/home-character/slice";
import { selectHomeCharactor } from "_redux/home-character/selector";
import { selectMember } from "_redux/member/selector";
import { messageMixpanel } from "hooks/useWebviewBridge";
import { Swiper as SwiperClass } from 'swiper/types';
import { CharactersClass, getCharacterTitleMessage } from "services/character";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
    setVisibleSwiperIndex: React.Dispatch<React.SetStateAction<number[]>>;
    visibleSwiperIndex: number[];
    memberSe: number | null;
    characters: CharactersClass[]
}

export const useSwiperMethods = ({
    setVisibleSwiperIndex,
    visibleSwiperIndex,
    memberSe,
    characters
}: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const characteEnNm = new URLSearchParams(location.search).get('character_en_nm');
    const { activeTabIndex } = useSelector(selectHomeCharactor);
    const { nick_nm2 } = useSelector(selectMember);

    const [ , startTransition ] = React.useTransition();

    // const getIndex = React.useMemo(() => {
    //     if (!characteEnNm) return 0;

    //     const characterEnNms = [
    //         'pogny',
    //         'hana'
    //     ]

    //     const characteEnNmSearchParams = characteEnNm.toLocaleLowerCase();
    //     const findIndex = characterEnNms.findIndex(item => item.toLocaleLowerCase() === characteEnNmSearchParams);

    //     if (findIndex > -1) return findIndex;
    //     return 0;

    // }, [characteEnNm])

    // const [ activeIndex, setActiveIndex ] = React.useState<number>(0);
    const [ swiper, setSwiper ] = React.useState<SwiperClass | null>(null);
    const [ characterTitle, setCharacterTitle ] = React.useState<string | null>(null);


    React.useEffect(() => {
        // if (!swiper || visibleSwiperIndex.length <= 0) return;
        if (!swiper) return;
        
        if (characteEnNm) {
            const characteEnNmSearchParams = characteEnNm.toLocaleLowerCase();
            const findIndex = characters.findIndex(item => item.character_en_nm.toLocaleLowerCase() === characteEnNmSearchParams);
            // console.log('야이야', findIndex, swiper.activeIndex, activeTabIndex, visibleSwiperIndex)

            if (
                findIndex !== activeTabIndex ||
                swiper.activeIndex !== activeTabIndex
            ) {
                // console.log('여기도야?')
                swiper.slideTo(findIndex, 0);
            } else {
                startTransition(() => {
                    fetchCharacterTitleMessage(swiper);
                })
            }


            // else {
            //     startTransition(() => {
            //         fetchCharacterTitleMessage(swiper);
            //     })
            // }

        } else {
            // navigate(`/?character_en_nm=pogny`, {replace: true});
            if (swiper.activeIndex !== activeTabIndex) {
                swiper.slideTo(activeTabIndex, 0);
            } else {
                startTransition(() => {
                    fetchCharacterTitleMessage(swiper);
                })
            }
        }

    }, [characters, swiper])


    const fetchCharacterTitleMessage = React.useCallback(async (sw: SwiperClass) => {
        // console.log('개인화?')
        const characterSe = characters[sw.activeIndex].character_se;
        const res = await getCharacterTitleMessage(memberSe!, characterSe, nick_nm2);
        if (res) {
            setCharacterTitle(() => res);


        } else {
            setCharacterTitle(null);
        }
    }, [characters])


    const swiperInit = React.useCallback((sw: SwiperClass) => {
        // if (!characters) return;
        // if (characters.length <= 0) return;

        setSwiper(sw);

        // if (sw.activeIndex !== activeTabIndex) {
        //     sw.slideTo(activeTabIndex, 0);
        // } else 
        
        // if (!visibleSwiperIndex.includes(sw.activeIndex)) {
        //     sw.slideTo(visibleSwiperIndex[0], 0);
        // } else {
        //     startTransition(() => {
        //         fetchCharacterTitleMessage(sw);
        //     })
        // }
        
    // }, [characteEnNm, characters]);
    }, []);

    const onSlideChange = React.useCallback(async (sw: SwiperClass) => {

        
        const activeCharacter = characters[sw.activeIndex];
        // navigate(`/?character_en_nm=${activeCharacter.character_en_nm}`, {replace: true});

        setCharacterTitle(() => null);
        // setActiveIndex(() => sw.activeIndex);
        dispatch(sethomeCharacter({
            activeTabIndex: sw.activeIndex,
            characterSe: characters[sw.activeIndex].character_se,
            characterNm: characters[sw.activeIndex].character_nm,
            characterNmEn: characters[sw.activeIndex].character_en_nm,
        }));

        if (!visibleSwiperIndex.includes(sw.activeIndex)) {
            setVisibleSwiperIndex([
                ...visibleSwiperIndex,
                sw.activeIndex
            ]);
        }

        if (characters.length > 0) {
            fetchCharacterTitleMessage(sw);
        }

        messageMixpanel({
            tracking_type: 'event',
            event_name: 'click_change_character',
            param: {
                'persona': activeCharacter.character_nm
            }
        });
        
      
    }, [visibleSwiperIndex, characters]);

    
    return {
        swiper,
        swiperInit,
        onSlideChange,
        characterTitle,
    }
}