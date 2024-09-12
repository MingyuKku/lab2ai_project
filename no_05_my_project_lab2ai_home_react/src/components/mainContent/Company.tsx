import { lazy, Suspense } from 'react';
import { isMobile } from "react-device-detect";
import { useLocaleContext } from "@/components/context/LocaleJson";
import { StyledMainContent, StyledCompany } from "@/styled/mainContent/MainContentStyled";
const Ceo = lazy(() => import("./Ceo"));
const Talent = lazy(() => import("./Talent"));
const WorkLife = lazy(() => import("./WorkLife"));

export interface CeoType {
  title: string;
  name: string;
  image: string;
  moImage: string;
  education: string[];
  thesis: string[][];
}

export interface TalentType {
  title: string;
  contents: {
    icon: string;
    title: string;
    desc: string[];
  }[];
}

export interface WorkLifeType {
  title: string;
  subTitle: string;
  contents: {
    subTitle: string;
    list: string[];
  }[];
}

const Company = () => {

  const { text } = useLocaleContext();

  const companyVisual = {
    desktop: 'https://kr.object.ncloudstorage.com/cosign/lab2ai/lab2ai-company.png',
    mobile: 'https://kr.object.ncloudstorage.com/cosign/lab2ai/lab2ai-company-mo.png'
  }

  
  return (
    <StyledMainContent className="company-section-page">
      <StyledCompany>
        <div className="inner-container">
          <div className="section-title">
            <h1>Company</h1>
            <div className="sub-title">
              { text?.company.title.map((tit,idx) => (
                <h2 key={ idx } dangerouslySetInnerHTML={{__html: tit}}></h2>
              )) }
            </div>
          </div>
          <Suspense fallback={ <p>loading...</p> }>
            <Ceo />
            <Talent />
            <WorkLife />
          </Suspense>
        </div>
        <div className="company-image">
          <img src={ isMobile ? companyVisual.mobile : companyVisual.desktop } alt="컴퍼니 이미지" />
        </div>
      </StyledCompany>
    </StyledMainContent>
  )
}

export default Company;