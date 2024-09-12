import { lazy } from "react";
import { useLocaleContext } from "@/components/context/LocaleJson";
import { StyledMainContent, StyledService } from "@/styled/mainContent/MainContentStyled";
import { useGetLocale } from "@/hooks/useGetLocale";
const ServiceSlide = lazy(() => import("./mobile/ServiceSlide"));

const Service = ({ isMobile }:{isMobile: boolean;}) => {

  const { text } = useLocaleContext();
  const locale = useGetLocale();

  const anchorLink:{
    text: string;
    href: string;
    icon?: string;
    img?: string;
  }[] = !isMobile ? [
    {
      text: text?.service.link ?? '',
      href: 'https://cosign.cc/',
      icon: 'https://kr.object.ncloudstorage.com/cosign/lab2ai/icon/i-right.png',
    },
    {
      text: '',
      href: 'https://play.google.com/store/apps/details?id=com.lab2ai.cosign&pli=1',
      img: locale === 'ko' ? 'https://kr.object.ncloudstorage.com/cosign/lab2ai/google-play.png' : 'https://kr.object.ncloudstorage.com/cosign/lab2ai/google-play-en.png'
    },
    {
      text: '',
      href: 'https://apps.apple.com/kr/app/%EC%BD%94%EC%8B%B8%EC%9D%B8-cosign-ai-24%EC%8B%9C%EA%B0%84-%EC%BD%94%EC%9D%B8-%EC%8B%9C%EC%9E%A5%EA%B0%90%EC%A7%80/id6444056551',
      img: locale === 'ko' ? 'https://kr.object.ncloudstorage.com/cosign/lab2ai/app-store.png' : 'https://kr.object.ncloudstorage.com/cosign/lab2ai/app-store-en.png'
    },
  ] : [
    {
      text: '',
      href: 'https://play.google.com/store/apps/details?id=com.lab2ai.cosign&pli=1',
      img: locale === 'ko' ? 'https://kr.object.ncloudstorage.com/cosign/lab2ai/google-play.png' : 'https://kr.object.ncloudstorage.com/cosign/lab2ai/google-play-en.png'
    },
    {
      text: '',
      href: 'https://apps.apple.com/kr/app/%EC%BD%94%EC%8B%B8%EC%9D%B8-cosign-ai-24%EC%8B%9C%EA%B0%84-%EC%BD%94%EC%9D%B8-%EC%8B%9C%EC%9E%A5%EA%B0%90%EC%A7%80/id6444056551',
      img: locale === 'ko' ? 'https://kr.object.ncloudstorage.com/cosign/lab2ai/app-store.png' : 'https://kr.object.ncloudstorage.com/cosign/lab2ai/app-store-en.png'
    },
  ]


  return (
    <StyledMainContent className="service-section-page">
      <StyledService>
        <div className="inner-container">
          <div className="section-title">
            <h1>Service</h1>
          </div>
          <div className="service-content">
            <div className="left-content">
              <h2>{ text?.service.title }</h2>
              <div className="content-title">
                <div className="icon-image"><img src="https://kr.object.ncloudstorage.com/cosign/lab2ai/app-logo.png" alt="app-logo" /></div>
                <h1 className="gradient-text">{ text?.service.brand }</h1>
              </div>
            </div>
            <div className="right-content">
              { isMobile && <ServiceSlide /> }
              {
                isMobile
                ? (
                  text?.service.mobile.map((desc,idx) => (
                    <p key={ idx }>{ desc }</p>
                  ))
                )
                : (
                  text?.service.desktop.map((desc,idx) => (
                    <p key={ idx }>{ desc }</p>
                  ))
                )
              }
            </div>
          </div>
          <div className="link-list">
            { anchorLink.map((link,idx) => (
              <a 
                key={ idx } 
                href={ link.href } 
                target="_blank" 
                className={ link.text !== '' ? 'text-link gradient-bg' : ''} rel="noreferrer"
              >
                { 
                  link.text !== '' && 
                  <>
                    <span>{ link.text }</span>
                    <div className="icon-image">
                      <img src={ link.icon } alt="icon" />
                    </div>
                  </> 
                }
                { link.img && <img src={ link.img } alt="go" /> }
              </a>
            )) }
          </div>
        </div>
        { !isMobile && 
          <div className="service-image-bg">
            <img src={
              locale === 'ko' ? `${process.env.REACT_APP_IMAGE_URL}sercvice-bg.png` : `${process.env.REACT_APP_IMAGE_URL}sercvice-bg-en.png`
            } alt="service-bg" />
          </div>
        }
      </StyledService>
    </StyledMainContent>
  )
};

export default Service;