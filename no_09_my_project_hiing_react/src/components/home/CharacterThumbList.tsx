import { selectHomeCharactor } from '_redux/home-character/selector';
import { sethomeCharacter } from '_redux/home-character/slice';
import { AppDispatch } from '_redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CharactersClass } from 'services/character';
import { SwiperClass } from 'swiper/react';

interface Props {
    items: CharactersClass[];
    // activeIndex: number;
    swiper: SwiperClass;
    // changeActiveIndex: (index: number) => void;
}
const CharacterThumbList = ({ items, swiper }: Props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const characteEnNm = new URLSearchParams(location.search).get('character_en_nm');
    const dispatch = useDispatch<AppDispatch>();
    const { activeTabIndex } = useSelector(selectHomeCharactor);

    // React.useEffect(() => {
    //     if (!characteEnNm || !swiper) return;

    //     const characteEnNmSearchParams = characteEnNm.toLocaleLowerCase();
    //     const findIndex = items.findIndex(item => item.character_en_nm.toLocaleLowerCase() === characteEnNmSearchParams);

    //     swiper.slideTo(findIndex);

    // }, [items, swiper])

    const onClickChangeActiveIndex = React.useCallback((index: number, character: CharactersClass) => {
        swiper.slideTo(index);

        if (location.search !== '') {
            navigate(location.pathname, { replace: true });
        }

        // dispatch(sethomeCharacter({
        //     activeTabIndex: index,
        //     characterSe: character.character_se,
        //     characterNm: character.character_nm,
        //     characterNmEn: character.character_en_nm,
        // }))

        // return () => {
        //     swiper.slideTo(index);
        //     dispatch(sethomeCharacter({
        //         activeTabIndex: index,
        //         characterSe: character.character_se,
        //         characterNm: character.character_nm,
        //         characterNmEn: character.character_en_nm,
        //     }))
        // }
    }, [location]);

    return (
        <ul className='character-thumbnail-list absolute top-0 z-[2] flex items-center justify-center py-8 px-6'>
            {
                items.map((item,idx) => (
                    <li
                        key={ idx }
                        className={`
                            relative mr-2 last:mr-0 cursor-pointer rounded-full flex items-center justify-center pointer-events-auto w-14 h-14
                        `}
                        onClick={ () => onClickChangeActiveIndex(idx, item) }
                    >
                        {
                            activeTabIndex === idx &&
                            // characteEnNm?.toLocaleLowerCase() === item.character_en_nm.toLocaleLowerCase() &&
                            <span className='active-bg absolute xy-center w-16 h-16 rounded-full border-[#FF8E25] border-[2px]'></span>
                        }
                        <div className='image-wrap relative z-[1] w-full h-full rounded-full overflow-hidden'>
                            <img
                                src={ item.profile_thumbnail_lk }
                                alt="thumbnail"
                                width={48} height={48}
                                loading='lazy'
                                className='object-cover h-full'
                            />
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default React.memo(CharacterThumbList);