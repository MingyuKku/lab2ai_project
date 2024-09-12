import { useCallback, useState } from "react";
import { useLocaleContext } from "@/components/context/LocaleJson";
import { StyledMobileMedia } from "@/styled/mainContent/mobile/MainContentStyled"

const Media = () => {

  const { text } = useLocaleContext();

  const [ viewMediaList, setViewMediaList ] = useState(text?.media.items.slice(0,5));

  const viewMore = useCallback(() => {
    setViewMediaList(viewMediaList!.concat(text!.media.items.slice(5)));
  }, []);

  return (
    <StyledMobileMedia>
      <div className="section-title">
        <h1>Media</h1>
      </div>
      <ul className="media-list">
        {
          viewMediaList && viewMediaList.map((list,idx) => (
            <li key={ idx }>
              <a href={ list.href } target="_blank" rel="noreferrer">
                <p>{ list.date }</p>
                <h2>{ list.text }</h2>
              </a>
            </li>
          ))
        }
      </ul>
      { viewMediaList && viewMediaList.length !== text?.media.items.length &&
        <div className="more-wrap">
          <div className="more" onClick={ viewMore }>
            <span>더보기</span>
            <img src="https://kr.object.ncloudstorage.com/cosign/lab2ai/icon/i-down.png" alt="down" width="auto" height="auto" />
          </div>
        </div>
      }
    </StyledMobileMedia>
  )
}

export default Media