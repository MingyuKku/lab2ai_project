import { useLocaleContext } from "@/components/context/LocaleJson";
import { StyledMainContent, StyledAbout } from "@/styled/mainContent/MainContentStyled";


const About = ({ isMobile }:{isMobile: boolean;}) => {

  const { text } = useLocaleContext();

  
  return (
    <StyledMainContent className="about-section-page">
      <div className="about-page-bg"><img src={`${process.env.REACT_APP_IMAGE_URL}about-bg.png`} alt="about-bg" /></div>
      <StyledAbout>
        <div className="inner-container">
          <div className="section-title"><h1>About</h1></div>
          <div className="gradient-text what">
            { text?.about.title.map((subTit,idx) => (
              <h2 key={ idx }>{ subTit }</h2>
            )) }
          </div>
          <ul className="about-items">
            {
              text?.about.items.map((item,idx) => (
                <li key={ idx }>
                  <h3>{ item.title }<span className="gradient-bg line"></span></h3>
                  {
                    isMobile
                    ? (
                      item.mobile.map((desc,i) => (
                        <p key={ i }>{ desc }</p>
                      ))
                    )
                    : (
                      item.deskTop.map((desc,i) => (
                        <p key={ i }>{ desc }</p>
                      ))
                    )
                  }
                </li>
              ))
            }
          </ul>
        </div>
      </StyledAbout>
    </StyledMainContent>
  )
}

export default About;