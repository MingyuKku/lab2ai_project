import React from "react";
import { RoutesType } from "./_types";


const Popup = React.lazy(() => import('pages/auth/popup/Popup'));
const PopuprRegist = React.lazy(() => import('pages/auth/popup/Regist'));
const PopupUpdate = React.lazy(() => import('pages/auth/popup/Update'));


export const popupRoutes: RoutesType[] = [
    {
        path: '/popup',
        name: 'popup',
        element: <Popup />,
    },
    {
        path: '/popup/regist',
        name: 'popup-regist',
        element: <PopuprRegist />,
    },
    {
        path: '/popup/:id/update',
        name: 'popup-update',
        element: <PopupUpdate />
    }
]