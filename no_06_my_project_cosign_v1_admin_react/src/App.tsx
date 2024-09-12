import React from 'react';
import { Routes } from 'react-router-dom';
import { getRoute } from 'router/_methods';
import cosignAllRoutes from 'router/_index';
import RouteLoad from 'components/common/fallback/Route-load';


const App = () => {
    return (
        <div>
            <React.Suspense fallback={ <RouteLoad /> }>
                <Routes>
                    { getRoute(cosignAllRoutes) }
                </Routes>
            </React.Suspense>
        </div>
    )
}

export default App;
