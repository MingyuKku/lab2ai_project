import React from "react";
import { RoutesType } from "./_index";

const DefaultLayout = React.lazy(() => import('layouts/DefaultLayout'));
const Char = React.lazy(() => import('pages/auth/character/Char'));
const Profile = React.lazy(() => import('pages/auth/character/Profile'));
const ProfileImages = React.lazy(() => import('pages/auth/character/ProfileImages'));
const ProfileHistory = React.lazy(() => import('pages/auth/character/ProfileHistory'));
const ComicStrip = React.lazy(() => import('pages/auth/character/ComicStrip'));

export const characterRoutes:RoutesType[] = [
    // {
    //     path: '/character',
    //     name: 'depth-layout',
    //     element: <DefaultLayout />,
    //     children: [
    //         {
    //             path: '/character/:characterSe',
    //             name: 'character-se',
    //             element: <Char />
    //         },
    //         {
    //             path: '/character/:characterSe/profile',
    //             name: 'character-se-profile',
    //             element: <Profile />
    //         },
    //         {
    //             path: '/character/:characterSe/profile/images',
    //             name: 'character-se-profile-images',
    //             element: <ProfileImages />
    //         },
    //         {
    //             path: '/character/:characterSe/profile/history',
    //             name: 'character-se-profile-history',
    //             element: <ProfileHistory />
    //         },
    //         {
    //             path: '/character/:characterSe/comic_strip',
    //             name: 'character-se-comic-strip',
    //             element: <ComicStrip />
    //         },
    //     ]
    // },
    {
        path: '/character/:characterSe',
        name: 'character-se',
        element: <Char />
    },
    {
        path: '/character/:characterSe/profile',
        name: 'character-se-profile',
        element: <Profile />
    },
    {
        path: '/character/:characterSe/profile/images',
        name: 'character-se-profile-images',
        element: <ProfileImages />
    },
    {
        path: '/character/:characterSe/profile/history',
        name: 'character-se-profile-history',
        element: <ProfileHistory />
    },
    {
        path: '/character/:characterSe/comic_strip',
        name: 'character-se-comic-strip',
        element: <ComicStrip />
    },
]