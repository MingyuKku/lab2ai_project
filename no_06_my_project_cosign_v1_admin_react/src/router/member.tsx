import React from "react";
import { RoutesType } from "./_types";


const Member = React.lazy(() => import('pages/auth/member/Member'));
const MemberDetail = React.lazy(() => import('pages/auth/member/Detail'));
// const QnaAnswerRegist = React.lazy(() => import('pages/auth/qna/Answer-regist'));
const MemberUpdate = React.lazy(() => import('pages/auth/member/Update'));


export const memberRoutes: RoutesType[] = [
    {
        path: '/member',
        name: 'member',
        element: <Member />,
    },
    {
        path: '/member/:id',
        name: 'member-detail',
        element: <MemberDetail />,
    },
    {
        path: '/member/:id/update',
        name: 'member-update',
        element: <MemberUpdate />
    }
]