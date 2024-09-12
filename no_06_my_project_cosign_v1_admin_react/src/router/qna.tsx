import React from "react";
import { RoutesType } from "./_types";


const Qna = React.lazy(() => import('pages/auth/qna/Qna'));
const QnaDetail = React.lazy(() => import('pages/auth/qna/Detail'));
const QnaAnswerRegist = React.lazy(() => import('pages/auth/qna/Answer-regist'));


export const qnaRoutes: RoutesType[] = [
    {
        path: '/qna',
        name: 'qna',
        element: <Qna />,
    },
    {
        path: '/qna/:id',
        name: 'qna-detail',
        element: <QnaDetail />,
        children: [
            {
                path: 'regist',
                name: 'qna-answer-regist',
                element: <QnaAnswerRegist />
            }
        ]
    },
]