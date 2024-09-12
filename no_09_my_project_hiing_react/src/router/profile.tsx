import React from "react";
import { RoutesType } from "./_index";

const Profile = React.lazy(() => import('pages/auth/profile/Profile'));

export const profileRoutes:RoutesType[] = [
    {
        path: '/profile',
        name: 'user-profile',
        title: '프로필',
        element: <Profile />
    },
]