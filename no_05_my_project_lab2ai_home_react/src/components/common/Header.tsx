import React from "react";
import MoHeader from '@/components/common/mobile/Header';
import { StyledHeader } from "@/styled/common/CommonStyled";
import { useSelector } from 'react-redux';
import { RootState } from "@/redux/combineReducer";
import GnbNavi from "./GnbNavi";
import useResizeObserver from "@/hooks/useResizeObserver";
import { useGetLocale } from "@/hooks/useGetLocale";



const Header = () => {
  const { isActive } = useSelector((state:RootState) => state.headerReducer);

  const browserWidth = useResizeObserver();
  const locale = useGetLocale();

  return browserWidth > 1024 ? (
    <StyledHeader className={ isActive ? 'active': '' }>
      <div className="inner-container">
        <div className="left-content">
          <a href="/" className="bi">
            <img
              className={ isActive ? 'active':'' }
              src={ 
                isActive 
                ? locale === 'ko' ? `${process.env.REACT_APP_IMAGE_URL}common/lab2ai-ko-bi-dark.png` : `${process.env.REACT_APP_IMAGE_URL}common/lab2ai-en-bi-dark.png`
                : locale === 'ko' ? `${process.env.REACT_APP_IMAGE_URL}common/lab2ai-ko-bi.png`: `${process.env.REACT_APP_IMAGE_URL}common/lab2ai-en-bi.png`
              } 
              alt="bi로고" 
              width="auto" height="auto"
            />
          </a>
        </div>
        <div className="right-content">
          <GnbNavi />
        </div>
      </div>
    </StyledHeader>
  ) : <MoHeader />
}

export default React.memo(Header);