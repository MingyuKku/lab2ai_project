import React from "react";
import { RoutesType } from "./_types";


const Faq = React.lazy(() => import('pages/auth/faq/Faq'));
const FaqDetail = React.lazy(() => import('pages/auth/faq/Detail'));
const FaqRegist = React.lazy(() => import('pages/auth/faq/Regist'));
const FaqUpdate = React.lazy(() => import('pages/auth/faq/Update'));


export const faqRoutes: RoutesType[] = [
    {
        path: '/faq',
        name: 'faq',
        element: <Faq />,
    },
    {
        path: '/faq/:id',
        name: 'faq-detail',
        element: <FaqDetail />
    },
    {
        path: '/faq/regist',
        name: 'faq-regist',
        element: <FaqRegist />
    },
    {
        path: '/faq/:id/update',
        name: 'faq-update',
        element: <FaqUpdate />
    }
]