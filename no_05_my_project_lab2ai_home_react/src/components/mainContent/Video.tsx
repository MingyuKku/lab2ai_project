import { StyledMainContent, StyledVideo } from "@/styled/mainContent/MainContentStyled";
import { useLocaleContext } from "@/components/context/LocaleJson";
import Youtube, { YouTubeProps } from 'react-youtube';

const Video = () => {

  const { text } = useLocaleContext();

  const opts:YouTubeProps['opts'] = {
    width: '100%',
    height: '100%',
  }

  return (
    <StyledMainContent className="video-section-page">
      <StyledVideo>
        <div className="inner-container">
          <div className="section-title">
            <h1>Video</h1>
          </div>
          <div className="youtube-content">
            {
              text?.youtube.map((video,idx) => (
                <div key={ idx } className="item-wrap">
                  <div className="iframe-wrap">
                    <Youtube
                      videoId={ video.id }
                      opts={ opts }
                    />
                  </div>
                  <h2>{ video.label }</h2>
                </div>
              ))
            }
          </div>
        </div>
      </StyledVideo>
    </StyledMainContent>
  )
}

export default Video;