import React from "react";
import { Helmet } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import LocaleJson from "./components/context/LocaleJson";
import Home from "./pages/Home";
import { useGetLocale } from "./hooks/useGetLocale";

const App = () => {

  const locale = useGetLocale();

  return (
    <>
      <Helmet>
        <title>{ locale === 'ko' ? '랩투아이' : 'Lab2AI' }</title>
        <meta property="og:title" content={ locale === 'ko' ? '랩투아이' : 'Lab2AI' } />
        <meta name="description" content={
          locale === 'ko'
          ? '디지털자산의 AI 기반 시세 예측을 제공하는 코싸인(COSIGN) 서비스와, 자연어 처리 및 자동 리포트를 생성하는 AI 전문 기업입니다.'
          : 'Lab2AI utilizes AI to collect and analyze digital asset market data, offering easily readable information through prompt engineering technology'
        } />
        <meta property="og:description" content={
          locale === 'ko'
          ? '디지털자산의 AI 기반 시세 예측을 제공하는 코싸인(COSIGN) 서비스와, 자연어 처리 및 자동 리포트를 생성하는 AI 전문 기업입니다.'
          : 'Lab2AI utilizes AI to collect and analyze digital asset market data, offering easily readable information through prompt engineering technology'
        } />
      </Helmet>
      <LocaleJson>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/:locale" element={<Home />} />
          </Route>
        </Routes>
      </LocaleJson>
    </>
  )
}

export default App;
