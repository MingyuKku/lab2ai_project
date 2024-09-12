import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectRefreshToken } from '_redux/refreshToken/selector';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/pagination';
import PageLoading from 'components/common/fallback/PageLoading';
import { CharacterStateHistoryClass, getCharacterProfileHistory } from 'services/character';
import SwiperModalHeader from 'components/common/header/SwiperModalHeader';
import { messageMixpanel } from 'hooks/useWebviewBridge';
import { QueryKey, useQuery } from '@tanstack/react-query';
import ErrorFallback from 'components/error/ErrorFallback';

const ImageSwiper = React.lazy(() => import('components/common/modal/ImageSwiper'));

// const images = [
//     'https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg',
//     'https://cdn.pixabay.com/photo/2017/07/18/18/02/little-girl-2516582_1280.jpg',
//     'https://cdn.pixabay.com/photo/2014/06/21/08/43/rabbit-373691_1280.jpg',
//     'https://cdn.pixabay.com/photo/2012/02/27/15/35/lion-17335_1280.jpg',
//     'https://cdn.pixabay.com/photo/2014/07/11/22/05/baby-390555_1280.jpg',
//     'https://cdn.pixabay.com/photo/2016/11/19/14/39/girl-1839623_1280.jpg',
//     'https://cdn.pixabay.com/photo/2015/02/24/15/41/wolf-647528_1280.jpg',
//     'https://cdn.pixabay.com/photo/2017/10/24/16/52/blue-2885289_1280.jpg',
//     'https://cdn.pixabay.com/photo/2013/08/28/00/54/field-176602_1280.jpg',
//     'https://cdn.pixabay.com/photo/2022/11/27/10/31/bird-7619338_1280.jpg',
//     'https://cdn.pixabay.com/photo/2014/09/20/05/16/oak-453390_1280.jpg',
// ]

const ProfileImages = () => {
    const { characterSe } = useParams();
    const [ searchParams ] = useSearchParams();
    // const token = useSelector(selectRefreshToken);
    // const [ , startTransition ] = React.useTransition();
    const [ historyImage, setHistoryImage ] = React.useState<{image: string | null}[]>([]);


    const INDEX_KEY: QueryKey = ['characters-profile-history-images', characterSe];

    const { data: profileHistoryImages, isLoading, isFetching, error } = useQuery({
        queryKey: INDEX_KEY,
        queryFn: () => getCharacterProfileHistory(characterSe),
        staleTime: 1000 * 60 * 1 // 1분
    });


    React.useEffect(() => {
        if (!profileHistoryImages) return;

        const type = searchParams.get('type') as keyof Pick<CharacterStateHistoryClass, 'background_lk' | 'profile_thumbnail_lk'>;
        if (type) {
            const images = profileHistoryImages.historyItem.reduce((acc, history) => {
                if (type === 'background_lk') {
                    if (history.type_cd === 2 && history[type] !== null) {
                        acc.push({
                            image: history[type]
                        })
                    }
                }
                if (type === 'profile_thumbnail_lk') {
                    if (history.type_cd === 1 && history[type] !== null) {
                        acc.push({
                            image: history[type]
                        })
                    }
                }
                
                return acc;
            }, [] as { image: string | null }[])
            setHistoryImage(images);
        }

    }, [profileHistoryImages])


    const swiperInit = React.useCallback((sw: SwiperClass) => {
        // sw.wrapperEl.style.alignItems = 'center';
    }, [])
    
    const onClickHistory = () => {
        messageMixpanel({
            tracking_type: 'event',
            event_name: 'click_profile_history',
            param: {
                'location': '프로필 히스토리'
            }
        })
    }

    if (error) {
        return <ErrorFallback error={ error } />
    }

    if (isLoading || isFetching || !profileHistoryImages) {
        return <PageLoading />
    }

    return (
        <div className='characer-profile-images-page max-w-desktop'>
            <SwiperModalHeader
                rightIcon={
                    <Link
                        to={`/character/${characterSe}/profile/history?before_location=프로필 히스토리`}
                        onClick={ onClickHistory }
                        className='block w-9 h-9 rounded-[10px] overflow-hidden'
                    >
                        {
                            historyImage.length > 0 && historyImage[0].image &&
                            <img
                                src={ historyImage[0].image }
                                alt="thumb"
                                width={36} height={36}
                                loading='lazy'
                                className='h-full object-cover'
                            />
                        }
                        
                    </Link>
                }
            />
            <React.Suspense fallback={ <PageLoading /> }>
                <ImageSwiper>
                    <div className="profile-image-swiper-wrap h-viewScreen">
                        <Swiper
                            className='character-profile-image-swiper h-full'
                            threshold={ 1 }
                            spaceBetween={ 0 }
                            slidesPerView={ 1 }
                            speed={ 350 }
                            modules={[
                                Pagination
                            ]}
                            pagination={{
                                type: 'fraction'
                            }}
                            onInit={ swiperInit }
                        >
                            {
                                historyImage.map((image, idx) => (
                                    <SwiperSlide key={idx} className='!flex !items-center !justify-center'>
                                        <div className="image-wrap">
                                            {
                                                image.image &&
                                                <img
                                                    src={ image.image }
                                                    alt="img"
                                                    width={360}
                                                    height={500}
                                                    loading='lazy'
                                                />
                                            }
                                            <div className="swiper-lazy-preloader"></div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                </ImageSwiper>
            </React.Suspense>
        </div>
    )
}

export default ProfileImages;