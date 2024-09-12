import React from "react";
import { RoutesType } from "./_index";

const DefaultLayout = React.lazy(() => import('layouts/DefaultLayout'));
const Rooms = React.lazy(() => import('pages/auth/Rooms'));

export const roomsRoutes:RoutesType[] = [
    // {
    //     path: '/rooms',
    //     name: 'basic-layout',
    //     element: <DefaultLayout />,
    //     title: '채팅',
    //     children: [
    //         {
    //             path: '',
    //             name: 'chat-rooms',
    //             element: <Rooms />,
    //             title: '채팅',
    //         },
    //     ]
    // },
    {
        path: '/rooms',
        name: 'chat-rooms',
        element: <Rooms />,
        title: '채팅',
    },
]