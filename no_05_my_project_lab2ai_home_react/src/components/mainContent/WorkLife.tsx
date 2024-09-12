import { useLocaleContext } from "../context/LocaleJson";

const WorkLife = () => {

  const { text } = useLocaleContext();

  return (
    <div className="work-life-info">
      <h1>{ text?.company.workLife.title }</h1>
      <h2>{ text?.company.workLife.subTitle }</h2>
      <div className="work-life-content">
        {
          text?.company.workLife.contents.map((content,idx) => (
            <div key={ idx }>
              <h2>{ content.label }</h2>
              <ul>
                { content.items.map((list,i) => ( <li key={ i }>{ list }</li> )) }
              </ul>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default WorkLife