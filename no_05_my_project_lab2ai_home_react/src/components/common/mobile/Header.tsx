import React from "react";
import { StyledHeader } from "@/styled/common/mobile/CommonStyled"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/combineReducer";
import { useGetLocale } from "@/hooks/useGetLocale";
const MoGnbMenu = React.lazy(() => import("./MoGnbMenu"));
const GlobalSvg = React.lazy(() => import('../../../icon/Global'));
const LocaleDropDown = React.lazy(() => import('../../../components/common/LocaleDropDown'));

const Header = () => {

  const locale = useGetLocale();
  const { isActive } = useSelector((state:RootState) => state.headerReducer);
  const [ isGnbMenu, setIsGnbMenu ] = React.useState<boolean>(false);
  const [ localeSelectFlag, setLocaleSelectFlag ] = React.useState<boolean>(false);

  const onClickGnbMenuIcon = () => {
    setIsGnbMenu(!isGnbMenu);
  }

  return (
    <StyledHeader className={ isGnbMenu ? 'active' : isActive ? 'active': '' }>
      <div className="content-wrap">
        <div className="left-content">
          <a href="/" className="bi">
            <img 
              className={ isGnbMenu ? 'active' : isActive ? 'active':'' }
              src={ 
                isGnbMenu
                ? locale === 'ko' ? `${process.env.REACT_APP_IMAGE_URL}common/lab2ai-ko-bi-dark.png` : `${process.env.REACT_APP_IMAGE_URL}common/lab2ai-en-bi-dark.png`
                : isActive
                ? locale === 'ko' ? `${process.env.REACT_APP_IMAGE_URL}common/lab2ai-ko-bi-dark.png` : `${process.env.REACT_APP_IMAGE_URL}common/lab2ai-en-bi-dark.png`
                : locale === 'ko' ? `${process.env.REACT_APP_IMAGE_URL}common/lab2ai-ko-bi.png` : `${process.env.REACT_APP_IMAGE_URL}common/lab2ai-en-bi.png`
              } 
              alt="bi" 
              width="auto" height="auto"
            />
          </a>
        </div>
        <div className="right-content">
          <div className="global-icon">
            <GlobalSvg onClick={ () => setLocaleSelectFlag(!localeSelectFlag) } />
            {localeSelectFlag && (
              <React.Suspense fallback={ <div></div> }>
                <LocaleDropDown
                  setFlagState={ setLocaleSelectFlag }
                />
              </React.Suspense>
            )}
          </div>
          <div className="menu-icon" onClick={ onClickGnbMenuIcon }>
            { isGnbMenu
              ? <img src={ `${process.env.REACT_APP_IMAGE_URL}icon/i-close.png` } alt="닫기" />
              : <img 
                src={ isActive ? `${process.env.REACT_APP_IMAGE_URL}icon/i-menu-dark.png` : `${process.env.REACT_APP_IMAGE_URL}icon/i-menu.png` } 
                alt="햄버거메뉴"
                width="auto" height="auto"
              />
            }
            
          </div>
        </div>
      </div>
      <MoGnbMenu 
        isGnbMenu={ isGnbMenu }
        setIsGnbMenu={ setIsGnbMenu }
      />
    </StyledHeader>
  )
}

export default Header;