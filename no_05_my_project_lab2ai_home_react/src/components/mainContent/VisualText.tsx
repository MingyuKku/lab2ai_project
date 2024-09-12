import { useLocaleContext } from "@/components/context/LocaleJson";

const VisualText = () => {

  const { text } = useLocaleContext();

  const visualText:{
    title: string[];
    describe: string[];
  } = {
    title: [
      text?.visual.title1 ?? '',
      text?.visual.title2 ?? '',
    ],
    describe: [
      text?.visual.descripton1 ?? '',
      text?.visual.descripton2 ?? '',
      text?.visual.descripton3 ?? '',
    ]
  }
  
  return (
    <div className="visual-text">
      <div className="inner-container">
        <div className="text-content">
          <div className="title">
            { 
              visualText.title.map((title,idx) => (
                <h1 key={ idx }>{ title }</h1>
              ))
            }
          </div>
          <div className="describe">
            { 
              visualText.describe.map((desc,idx) => (
                <p key={ idx }>{ desc }</p>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisualText;