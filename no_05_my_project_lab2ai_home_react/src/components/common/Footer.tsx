import { StyledFooter } from "@/styled/common/CommonStyled"
import { useLocaleContext } from "@/components/context/LocaleJson";

const Footer = () => {

  const { text } = useLocaleContext();

  const sns:{
    logo: string;
    href: string;
    font: 'en'|'ko';
    text?: string;
  }[] = [
    {
      logo: 'https://kr.object.ncloudstorage.com/cosign/lab2ai/icon/i-instargram.png',
      text: 'instagram',
      href: 'https://www.instagram.com/cosign.cc/',
      font: 'en'
    },
    {
      logo: 'https://kr.object.ncloudstorage.com/cosign/lab2ai/icon/i-youtube.png',
      text: 'youtube',
      href: 'https://www.youtube.com/channel/UCZe96FhZXFeCOu8oWU70-5w',
      font: 'en',
    },
    {
      logo: 'https://kr.object.ncloudstorage.com/cosign/lab2ai/icon/i-blog.png',
      text: 'blog',
      href: 'https://blog.cosign.cc/',
      font: 'ko',
    },
    {
      logo: 'https://kr.object.ncloudstorage.com/cosign/lab2ai/icon/i-cosign.png',
      href: 'https://cosign.cc/',
      font: 'ko',
    },
  ]

  return (
    <StyledFooter>
      <div className="inner-container">
        <div className="left-content">
          <p>{ text?.footer.company }</p>
          <p>{ text?.footer.address }</p>
        </div>
        <div className="right-content">
          <ul>
            {
              sns.map((item,idx) => (
                <li key={ idx } className={ item.font }>
                  <a href={ item.href } target="_blank" rel="noopener noreferrer" className={ sns.length-1 === idx ? 'padding':'' }>
                    <div className="icon-image" ><img src={ item.logo } alt="아이콘" /></div>
                    { item.text && <span>{ item.text }</span> }
                  </a>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </StyledFooter>
  )
}

export default Footer