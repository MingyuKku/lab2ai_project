import React from "react";
import { RoutesType } from "./_index";

const PrivacyPolicy = React.lazy(() => import('pages/policy/PrivacyPolicy'));
const ServiceTerms = React.lazy(() => import('pages/policy/ServiceTerms'));
const DeleteAccount = React.lazy(() => import('pages/policy/DeleteAccount'));

export const policyRoutes:RoutesType[] = [
    {
        path: '/privacy_policy',
        name: 'privacy-policy',
        element: <PrivacyPolicy />,
    },
    {
        path: '/service_terms',
        name: 'service-terms',
        element: <ServiceTerms />,
    },
    {
        path: '/delete_account',
        name: 'delete-account',
        element: <DeleteAccount />,
    },
]