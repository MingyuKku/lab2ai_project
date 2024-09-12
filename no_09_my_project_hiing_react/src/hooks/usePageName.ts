import React from "react";
import { useLocation } from "react-router-dom";
import routes, { RoutesType } from 'router/_index';

export const usePageName = () => {
    const { pathname } = useLocation();
    const [ pageName, setPageName ] = React.useState('');

    
    React.useEffect(() => {
        const allRoutes:RoutesType[] = [];

        function flattenRoutes(arr: RoutesType[]) {
            arr.forEach(item => {
                if (item.children) {
                    flattenRoutes(item.children);
                } else {
                    allRoutes.push(item);
                }
            })
        }
        flattenRoutes(routes);

        const findRoute = allRoutes.find((route) => route.path === pathname);
        if (findRoute && findRoute.title) {
            setPageName(findRoute.title);
        }
        
    }, [])

    return pageName;
}