import { useLocaleContext } from "../context/LocaleJson";
import { isMobile } from "react-device-detect";

const Ceo = () => {

  const { text } = useLocaleContext();
  
  return (
    <div className="ceo-info">
      <h1>{ text?.company.ceo.title }</h1>
      <div className="ceo-content">
        <div className="ceo-image">
          <img src={ isMobile ? text?.company.ceo.moImage : text?.company.ceo.image } alt="ceo이미지" />
          <h3>{ text?.company.ceo.title } | { text?.company.ceo.name }</h3>
        </div>
        <div className="ceo-description">
          <h2>{ text?.company.ceo.name }</h2>
          <div className="ceo-education">
            { text?.company.ceo.education.map((edu,idx) => ( <p key={ idx }>{ edu }</p> )) }
          </div>
          <ul className="ceo-thesis">
            {
              text?.company.ceo.thesis.items.map((thesis,idx) => (
                <li key={ idx }>
                  <div className="tit">{ text?.company.ceo.thesis.title }</div>
                  <div className="text">
                    { thesis.map((p,i) => ( <p key={ i }>{ p }</p> )) }
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Ceo;