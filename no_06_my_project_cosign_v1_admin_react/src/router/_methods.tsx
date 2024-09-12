import { Route } from "react-router-dom"
import { RoutesType } from "./_types"


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