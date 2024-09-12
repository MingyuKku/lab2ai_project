import React from "react";
import { RoutesType } from "./_index";

const SignIn = React.lazy(() => import('pages/user/SignIn'));
const SignUp = React.lazy(() => import('pages/user/SignUp'));

export const userRoutes:RoutesType[] = [
    {
        path: 'user/signIn',
        name: 'user-sign-in',
        element: <SignIn />
    },
    {
        path: 'user/signUp',
        name: 'user-sign-up',
        element: <SignUp />
    },
]