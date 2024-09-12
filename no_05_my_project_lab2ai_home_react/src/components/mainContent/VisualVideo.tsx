import { useRef, useEffect, useCallback } from "react";
import { StyledVisualVideo } from "@/styled/mainContent/MainContentStyled";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/redux/combineReducer";
import { headerActive, headerUnActive } from "@/redux/header/actions";
import { videoLoadComplete } from "@/redux/common/actions";
import { CSSTransition } from 'react-transition-group';

import LoadingCurtainBlock from "../common/LoadingCurtainBlock";
import VisualText from "./VisualText";

const VisualVideo = () => {

  const visualVideoRef = useRef<HTMLDivElement | null>(null);
  const { height } = useSelector((state:RootState) => state.headerReducer);
  const { isVideoLoading } = useSelector((state:RootState) => state.commonReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    function scrollEvent() {
      const domScrollTop:number = document.documentElement.scrollTop;
      const videoHeight = visualVideoRef.current?.offsetHeight;
      
      if (videoHeight !== undefined) {
        if (domScrollTop >= videoHeight - height) {
          dispatch(headerActive());
        } else {
          dispatch(headerUnActive());
        }
      }
    }

    window.addEventListener('scroll', scrollEvent);

    return(() => window.removeEventListener('scroll', scrollEvent))
  }, [])

  const onCanPlayThrough = useCallback(() => {
    dispatch(videoLoadComplete());
  }, [])

  return (
    <StyledVisualVideo ref={ visualVideoRef }>
      <video
        loop 
        muted 
        autoPlay 
        playsInline
        poster="/images/video-thumbnail.jpg"
        onCanPlayThrough={ !isVideoLoading ? onCanPlayThrough : undefined }
      >
        <source src="/images/visual-video.mp4" type="video/mp4" />
      </video>
      <CSSTransition
        in={ !isVideoLoading }
        timeout={ { exit: 2500 } }
        classNames="slideUp"
      >
        <LoadingCurtainBlock />
      </CSSTransition>
      <VisualText />
    </StyledVisualVideo>
  )
}

export default VisualVideo