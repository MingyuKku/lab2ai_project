import React from "react";
import { RoutesType } from "./_types";


const Users = React.lazy(() => import('pages/auth/users/Users'));
// const PopupUpdate = React.lazy(() => import('pages/auth/popup/Update'));


export const usersRoutes: RoutesType[] = [
    {
        path: '/users',
        name: 'puuserssh',
        element: <Users />,
    },
    // {
    //     path: '/push/regist',
    //     name: 'push-regist',
    //     element: <PushRegist />,
    // },
    // {
    //     path: '/popup/:id/update',
    //     name: 'popup-update',
    //     element: <PopupUpdate />
    // }
]