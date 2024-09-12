import React from "react";
import { StyledGnb } from "@/styled/common/CommonStyled"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/combineReducer";

const GlobalSvg = React.lazy(() => import('../../icon/Global'));
const LocaleDropDown = React.lazy(() => import('../../components/common/LocaleDropDown'));

export const naviList:string[] = [
  'ABOUT',
  'SERVICE',
  'PORTFOLIO',
  'HISTORY',
  'MEDIA',
  'COMPANY',
]

const GnbNavi = () => {

  const { 
    intersectDomElements,
    activeIntersect,
  } = useSelector((state:RootState) => state.intersectReducer);

  const [ localeSelectFlag, setLocaleSelectFlag ] = React.useState<boolean>(false);


  const onClickHeaderGnb = (navi: string) => {
    const element = intersectDomElements.find(el => el.name === navi)

    if (element?.el) {
      element.el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    } else {
      window.scrollTo({top: 0});
    }
  }
  
  return (
    <StyledGnb className="header-gnb">
      { naviList.map(navi => (
        <li key={ navi } className={ activeIntersect.name === navi ? 'active':'' }>
          <h1 onClick={ () => onClickHeaderGnb(navi) }>{ navi }</h1>
          <span className="navi-bar gradient-bg"></span>
        </li>
      )) }
      <li className="locale-icon">
        <GlobalSvg onClick={ () => setLocaleSelectFlag(!localeSelectFlag) } />
        {localeSelectFlag && (
          <React.Suspense fallback={ <div></div> }>
            <LocaleDropDown
              setFlagState={ setLocaleSelectFlag }
            />
          </React.Suspense>
        )}
      </li>
    </StyledGnb>
  )
}

export default GnbNavi