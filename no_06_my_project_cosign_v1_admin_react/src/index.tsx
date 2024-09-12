import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/store';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import 'styles/tailwind.css';
import 'types/global.d.ts'
import App from './App';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
    document.getElementById('cosign-root') as HTMLElement
);
root.render(
    // <React.StrictMode>
        <Provider store={ store }>
            <QueryClientProvider client={ queryClient }>
                <BrowserRouter basename={ process.env.PUBLIC_URL }>
                    <App />
                </BrowserRouter>
            </QueryClientProvider>
        </Provider>
    // </React.StrictMode>
);