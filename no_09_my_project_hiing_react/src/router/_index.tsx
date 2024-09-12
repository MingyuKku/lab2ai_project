import React from "react";
import { Route } from "react-router-dom";
import { userRoutes } from "./user";
import { chatRoutes } from "./chat";
import { roomsRoutes } from "./rooms";
import { characterRoutes } from "./character";
import { policyRoutes } from "./policy";
import { profileRoutes } from "./profile";


// lazy 컴포넌트
const Auth = React.lazy(() => import('pages/auth/Auth'));
const Home = React.lazy(() => import('pages/auth/Home'));
const BottomGnbLayout = React.lazy(() => import('layouts/BottomGnbLayout'));
const DefaultLayout = React.lazy(() => import('layouts/DefaultLayout'));
const Particle = React.lazy(() => import('pages/Particle'));
const Spine = React.lazy(() => import('pages/Spine'));
const Test = React.lazy(() => import('pages/Test'));
const Download = React.lazy(() => import('pages/Download'));



export interface RoutesType {
    name: string;
    index?: boolean;
    path?: string;
    element?: JSX.Element;
    children?: RoutesType[];
    title?: string;
}


export const getRoute = (routes: RoutesType[]):JSX.Element[] => {
    return routes.map(route => {
        if (route.index) {
            return <Route
                index
                key={ route.name }
                path={ route.path }
                element={ route.element }
            />
            
        } else {
            return <Route
                key={ route.name }
                path={ route.path }
                element={ route.element }
            >
                { route?.children?.length && getRoute(route.children) }
            </Route>
        }
    })
}


const routes:RoutesType[] = [
    { 
        path: '/',
        name: 'auth',
        element: <Auth />,
        children: [
            {
                path: '',
                name: 'gnb-layout',
                element: <BottomGnbLayout />,
                children: [
                    {
                        index: true,
                        name: 'home',
                        element: <Home />
                    },
                    ...roomsRoutes,
                    ...profileRoutes,
                    
                ]
            },
            {
                path: '',
                name: 'default-layout',
                element: <DefaultLayout />,
                children: [
                    ...characterRoutes,
                    ...chatRoutes,
                ]
            }
            
            
        ],
    },
    {
        path: '/',
        name: 'default-layout',
        element: <DefaultLayout />,
        children: [
            ...policyRoutes,
            ...userRoutes,
        ]
    },
    {
        path: '/download',
        name: 'download',
        element: <Download />,
    },
    {
        path: '/particle',
        name: 'Particle',
        element: <Particle />,
    },
    {
        path: '/spine-test',
        name: 'spine',
        element: <Spine />,
    },
    {
        path: '',
        name: 'gnb-layout',
        element: <BottomGnbLayout />,
    },
    {
        path: '/test',
        name: 'test',
        element: <Test />,
    },
]

export default routes;