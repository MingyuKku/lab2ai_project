import React from "react";
import { RoutesType } from "./_types";


const Version = React.lazy(() => import('pages/auth/version/Version'));
const VersionRegist = React.lazy(() => import('pages/auth/version/Regist'));
const VersionUpdate = React.lazy(() => import('pages/auth/version/Update'));


export const versionRoutes: RoutesType[] = [
    {
        path: '/version',
        name: 'version',
        element: <Version />,
    },
    {
        path: '/version/regist',
        name: 'version-regist',
        element: <VersionRegist />,
    },
    {
        path: '/version/:id/update',
        name: 'version-update',
        element: <VersionUpdate />
    }
]