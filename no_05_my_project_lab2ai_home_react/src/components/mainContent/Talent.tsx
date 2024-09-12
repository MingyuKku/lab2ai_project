import { useLocaleContext } from "../context/LocaleJson";

const Talent = () => {
  const { text } = useLocaleContext();

  return (
    <div className="ideal-talent-info">
      <h1>{ text?.company.idealTalent.title }</h1>
      <ul className="ideal-talent-content">
        {
          text?.company.idealTalent.contents.map((content,idx) => (
            <li key={ idx }>
              <div className="icon-image"><img src={ content.icon } alt="인재상 이미지" /></div>
              <h2>{ content.label }</h2>
              { content.desc.map((p,i) => ( <p key={ i }>{ p }</p> )) }
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Talent