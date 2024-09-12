import { useGetLocale } from "@/hooks/useGetLocale";
import { StyledServiceSlides } from "@/styled/mainContent/mobile/MainContentStyled"

const ServiceSlide = () => {
  const locale = useGetLocale();

  const slideImages:string[] = locale === 'ko' ? [
    'https://kr.object.ncloudstorage.com/cosign/lab2ai/service-slide-1.png',
    'https://kr.object.ncloudstorage.com/cosign/lab2ai/service-slide-2.png',
    'https://kr.object.ncloudstorage.com/cosign/lab2ai/service-slide-3.png',
    'https://kr.object.ncloudstorage.com/cosign/lab2ai/service-slide-4.png',
    'https://kr.object.ncloudstorage.com/cosign/lab2ai/service-slide-5.png',
    // 'https://kr.object.ncloudstorage.com/cosign/lab2ai/service-slide-6.png',
  ] : [
    'https://kr.object.ncloudstorage.com/cosign/lab2ai/service-slide-1-en.png',
    'https://kr.object.ncloudstorage.com/cosign/lab2ai/service-slide-2-en.png',
    'https://kr.object.ncloudstorage.com/cosign/lab2ai/service-slide-3-en.png',
    'https://kr.object.ncloudstorage.com/cosign/lab2ai/service-slide-4-en.png',
  ]

  return (
    <StyledServiceSlides>
      <ul>
        {
          slideImages.map((slide,idx) => (
            <li key={ idx }>
              <img src={ slide } alt="슬라이드 이미지" />
            </li>
          ))
        }
      </ul>
    </StyledServiceSlides>
  )
}

export default ServiceSlide