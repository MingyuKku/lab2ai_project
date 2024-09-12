import React from "react";
import { RoutesType } from "./_types";


const Notice = React.lazy(() => import('pages/auth/notice/Notice'));
const NoticeDetail = React.lazy(() => import('pages/auth/notice/Detail'));
const NoticeRegist = React.lazy(() => import('pages/auth/notice/Regist'));
const NoticeUpdate = React.lazy(() => import('pages/auth/notice/Update'));


export const noticeRoutes: RoutesType[] = [
    {
        path: '/notice',
        name: 'notice',
        element: <Notice />,
    },
    {
        path: '/notice/:id',
        name: 'notice-detail',
        element: <NoticeDetail />
    },
    {
        path: '/notice/regist',
        name: 'notice-regist',
        element: <NoticeRegist />
    },
    {
        path: '/notice/:id/update',
        name: 'notice-update',
        element: <NoticeUpdate />
    }
]