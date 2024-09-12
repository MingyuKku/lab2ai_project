import React, { useState, memo } from 'react';
import { StyledMainContent, StyledMedia } from "@/styled/mainContent/MainContentStyled";
import { useLocaleContext } from "@/components/context/LocaleJson";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import { useGetLocale } from '@/hooks/useGetLocale';
import { groupBy } from '@/services/media';
// import useGetDesktopMediaItems from '@/hooks/useGetDesktopMediaItems';



const Media = () => {

  const { text } = useLocaleContext();
  const locale = useGetLocale();
  const newMediaItems = React.useMemo(() => groupBy(text, locale), []);

  const [ activeIndex, setActiveIndex ] = useState<number>(0);

  const mediaImages = [
    'https://kr.object.ncloudstorage.com/cosign/lab2ai/media-swiper-1.png',
    'https://kr.object.ncloudstorage.com/cosign/lab2ai/media-swiper-2.png',
    'https://kr.object.ncloudstorage.com/cosign/lab2ai/media-swiper-3.png',
    'https://kr.object.ncloudstorage.com/cosign/lab2ai/media-swiper-4.png',
    'https://kr.object.ncloudstorage.com/cosign/lab2ai/media-swiper-5.jpg',
  ]

  const onClickTabNavi = (idx: number) => {
    setActiveIndex(idx);
  }
  
  return (
    <StyledMainContent>
      <StyledMedia>
        <div className="inner-container">
          <div className="section-title">
            <h1>Media</h1>
          </div>
          <ul className="media-tab-navi">
            {/* { text?.media.desktop.map((tab,idx) => (  */}
            { newMediaItems.map((tab,idx) => ( 
              <li
                key={ idx } 
                className={ idx === activeIndex ? 'active':'' }
                onClick={ () => onClickTabNavi(idx) }
              >{ tab.date }</li>
            )) }
          </ul>
          <div className='tab-content'>
            <div className="left-swiper">
              <Swiper
                className='media-swiper'
                threshold={ 1 }
                loop={ true }
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[
                  Autoplay,
                ]}
              >
                { mediaImages.reverse().map((img,idx) => (
                  <SwiperSlide key={ idx }>
                    <img src={ img } alt="미디어 이미지" loading='lazy' width="auto" height="auto" />
                  </SwiperSlide>
                )) }
              </Swiper>
            </div>
            <div className='right-scroll'>
              <ul>
                {
                  newMediaItems[activeIndex].items.map((list, idx) => (
                    <li key={ idx }>
                      <a href={ list.href } target='_blank' rel="noreferrer">
                        <h3 className='date'>{ list.date }</h3>
                        <h4 className='text'>{ list.text }</h4>
                      </a>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </StyledMedia>
    </StyledMainContent>
  )
}

export default memo(Media);