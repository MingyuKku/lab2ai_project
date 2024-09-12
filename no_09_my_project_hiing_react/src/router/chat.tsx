import React from "react";
import { RoutesType } from "./_index";

const DefaultLayout = React.lazy(() => import('layouts/DefaultLayout'));
const Chat = React.lazy(() => import('pages/auth/chat/Chat'));

export const chatRoutes:RoutesType[] = [
    // {
    //     path: '/chat',
    //     name: 'depth-layout',
    //     element: <DefaultLayout />,
    //     children: [
    //         {
    //             path: '/chat/:characterSe',
    //             name: 'chat-character-se',
    //             element: <Chat />,
    //         },
    //     ]
    // },
    {
        path: '/chat/:characterSe',
        name: 'chat-character-se',
        element: <Chat />,
    },
]