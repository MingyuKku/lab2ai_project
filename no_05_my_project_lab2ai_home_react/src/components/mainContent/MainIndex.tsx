import { lazy, memo, useEffect, useRef } from "react";
import VisualVideo from "./VisualVideo";
import { isMobile, isTablet } from 'react-device-detect';
import { useDispatch } from "react-redux";
import { setIntersectDomElement, setIntersecting } from "@/redux/intersect/actions";
const About = lazy(() => import('./About'));
const Service = lazy(() => import('./Service'));
const Portfolio = lazy(() => import('./Portfolio'));
const History = lazy(() => import('./History'));
const MobileHistory = lazy(() => import('./mobile/History'));
const Media = lazy(() => import('./Media'));
const MobileMedia = lazy(() => import('./mobile/Media'));
const Video = lazy(() => import('./Video'));
const Company = lazy(() => import('./Company'));


const MainIndex = () => {

  const aboutRef = useRef<HTMLDivElement | null>(null);
  const serviceRef = useRef<HTMLDivElement | null>(null);
  const portfolioRef = useRef<HTMLDivElement | null>(null);
  const historyRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const companyRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {

    let observer: IntersectionObserver | null = null;
    const options = {
      root: null,
      threshold: 0,
      rootMargin: '-50% 0px'
    }
    const sectionRefArray:{name: string; el: HTMLElement}[] = [];

    async function initIntersectElements() {
      
      sectionRefArray.push({name: 'ABOUT', el: aboutRef.current as HTMLDivElement});
      sectionRefArray.push({name: 'SERVICE', el: serviceRef.current as HTMLDivElement});
      sectionRefArray.push({name: 'PORTFOLIO', el: portfolioRef.current as HTMLDivElement});
      sectionRefArray.push({name: 'HISTORY', el: historyRef.current as HTMLDivElement});
      sectionRefArray.push({name: 'MEDIA', el: mediaRef.current as HTMLDivElement});
      sectionRefArray.push({name: 'COMPANY', el: companyRef.current as HTMLDivElement});

      dispatch(setIntersectDomElement(sectionRefArray));
    }

    async function createIntersect() {
      await initIntersectElements();

      observer = new IntersectionObserver(handleIntersect, options);

      function handleIntersect(entries: IntersectionObserverEntry[]):void  {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            dispatch(setIntersecting({name: entry.target.id, el: entry.target as HTMLElement}));
          } else {

            if ( // 맨 처음 ABOUT 섹션에서 윗 방향으로 화면을 벗어날 경우
              entry.target.id === 'ABOUT' &&
              entry.boundingClientRect.top > 0
            ) {
              dispatch(setIntersecting({name: '', el: null}));
            }
          }
        })
      }

      sectionRefArray.forEach(element => {
        observer?.observe(element.el);
      })
    }

    createIntersect();

    return(() => observer?.disconnect()); 

  }, [])

  return (
    <>
      <VisualVideo />
      <div ref={ aboutRef } id="ABOUT"><About isMobile={ isMobile } /></div>
      <div ref={ serviceRef } id="SERVICE"><Service isMobile={ isMobile } /></div>
      <div ref={ portfolioRef } id="PORTFOLIO"><Portfolio isMobile={ isMobile } /></div>
      <div ref={ historyRef } id="HISTORY">{ !isMobile ? <History /> : <MobileHistory /> }</div>
      <div ref={ mediaRef } id="MEDIA">{ (!isMobile && !isTablet) ? <Media /> : <MobileMedia /> }</div>
      <Video />
      <div ref={ companyRef } id="COMPANY"><Company /></div>
    </>
  )
}

export default memo(MainIndex);