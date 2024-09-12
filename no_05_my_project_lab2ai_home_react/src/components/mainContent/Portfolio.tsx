import { useState } from 'react';
import { useLocaleContext } from "@/components/context/LocaleJson";
import { StyledMainContent, StyledPortfolio } from '@/styled/mainContent/MainContentStyled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper';
import { Swiper as SwiperClass } from 'swiper/types';
import 'swiper/css';
import { useGetLocale } from '@/hooks/useGetLocale';

const Portfolio = ({ isMobile }:{isMobile: boolean;}) => {

  const { text } = useLocaleContext();
  const locale = useGetLocale();
  const [ slideHeight, setSlideHeight ] = useState<number>(0);

  const updateSwiper = (swiper:SwiperClass) => {
    const heightArray = Array.from(swiper.slides).map(slide => slide.offsetHeight);
    const maxHeight = Math.max(...heightArray);
    setSlideHeight(maxHeight);
  }
  

  return (
    <StyledMainContent className='portfolio-section-page'>
      <StyledPortfolio>
        <div className="inner-container">
          <div className="section-title">
            <h1>portfolio</h1>
          </div>
          <Swiper
            className='portfolio-swiper'
            threshold={ 1 }
            mousewheel={ true }
            slidesPerView={ 'auto' }
            freeMode
            modules={[
              FreeMode,
              Mousewheel
            ]}
            onUpdate={ updateSwiper }
          >
            { text?.portfolio.items.map((item,idx) => (
              <SwiperSlide key={ idx } style={ slideHeight !== 0 ? {height: slideHeight}:{} }>
                <div className="slide-inner">
                  <div className="image-wrap">
                    <img src={ item.imgUrl } alt="portfolio" />
                    <div className="title">
                      {
                        isMobile &&
                        (item.title.mobile as string[]).map((tit,idx) => (
                          <h2 key={ idx }>{ tit }</h2>
                        ))
                      }
                    </div>
                  </div>
                  <div className="text-content">
                    { !isMobile && <h2 dangerouslySetInnerHTML={{__html: item.title.deskTop as string }}></h2> }
                    <p>{ item.desc }</p>
                  </div>
                </div>
              </SwiperSlide>
            )) }
          </Swiper>
        </div>
      </StyledPortfolio>
    </StyledMainContent>
  )
}

export default Portfolio;