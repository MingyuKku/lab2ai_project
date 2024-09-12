import React from "react";
import { StyledApp } from "../styled/StyledApp";
import { useSelector } from 'react-redux';
import { RootState } from "@/redux/combineReducer";

import LoadingCurtainBlock from "@/components/common/LoadingCurtainBlock";
import Header from "../components/common/Header";
import FallbackVisual from '../components/common/FallbackVisual';
import useLocaleNavigate from '../hooks/useLocaleNavigate';


const Main = React.lazy(() => import('../components/mainContent/MainIndex'));
const Footer = React.lazy(() => import('../components/common/Footer'));


const Home = () => {
    useLocaleNavigate();
    const { isVideoLoading } = useSelector((state:RootState) => state.commonReducer);

    return (
        <StyledApp>
            { !isVideoLoading && <LoadingCurtainBlock /> }
            <Header />
            <React.Suspense fallback={ <FallbackVisual /> }>
                <Main />
                <Footer />
            </React.Suspense>
        </StyledApp>
    )
}

export default Home