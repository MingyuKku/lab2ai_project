import React from "react";
import { RoutesType } from "./_types";


// const Push = React.lazy(() => import('pages/auth/push/Push'));
const PushRegist = React.lazy(() => import('pages/auth/push/Regist'));
// const PopupUpdate = React.lazy(() => import('pages/auth/popup/Update'));


export const pushRoutes: RoutesType[] = [
    // {
    //     path: '/push',
    //     name: 'push',
    //     element: <Push />,
    // },
    {
        path: '/push/regist',
        name: 'push-regist',
        element: <PushRegist />,
    },
    // {
    //     path: '/popup/:id/update',
    //     name: 'popup-update',
    //     element: <PopupUpdate />
    // }
]