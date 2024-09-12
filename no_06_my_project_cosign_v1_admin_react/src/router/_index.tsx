import React from "react";
import { RoutesType } from "./_types";
import { faqRoutes } from "./faq";
import { noticeRoutes } from "./notice";
import { qnaRoutes } from "./qna";
import { memberRoutes } from "./member";
import { popupRoutes } from "./popup";
import { pushRoutes } from "./push";
import { usersRoutes } from "./users";
import { versionRoutes } from "./version";


// lazy layout 컴포넌트
const LayoutSideGnb = React.lazy(() => import('layouts/Side-gnb'));


// lazy page 컴포넌트
const Home = React.lazy(() => import('pages/Home'));






const routes: RoutesType[] = [
    { 
        path: '/',
        name: 'home-login',
        element: <Home />,
    },
    { 
        path: '/',
        name: 'auth-layout',
        element: <LayoutSideGnb />,
        children: [
            ...faqRoutes,
            ...noticeRoutes,
            ...qnaRoutes,
            ...memberRoutes,
            ...popupRoutes,
            ...pushRoutes,
            ...usersRoutes,
            ...versionRoutes,
        ]
    },
]

export default routes;