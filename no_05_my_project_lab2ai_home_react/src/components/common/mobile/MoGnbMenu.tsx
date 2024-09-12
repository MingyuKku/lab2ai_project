import React from 'react';
import { StyledMoGnbMenu } from "@/styled/common/mobile/CommonStyled";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/combineReducer';
import { naviList } from "../GnbNavi";


const MoGnbMenu = ({ isGnbMenu, setIsGnbMenu }:{isGnbMenu: boolean; setIsGnbMenu: React.Dispatch<React.SetStateAction<boolean>>}) => {

  const { 
    intersectDomElements,
  } = useSelector((state:RootState) => state.intersectReducer);

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
    
    setIsGnbMenu(false);
  }

  return isGnbMenu ? (
    <StyledMoGnbMenu>
      <ul>
        {
          naviList.map(navi => (
            <li key={ navi } onClick={ () => onClickHeaderGnb(navi) }>
              <span>{ navi }</span>
            </li>
          ))
        }
      </ul>
    </StyledMoGnbMenu>
  ) : (<></>)
}

export default React.memo(MoGnbMenu);