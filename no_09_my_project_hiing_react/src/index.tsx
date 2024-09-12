import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'types/global.d.ts';
import 'styles/index.css';
import store from '_redux/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import ErrorFallback from 'components/error/ErrorFallback';


const queryClient = new QueryClient();


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  // </React.StrictMode>
  // <QueryClientProvider>

  // </QueryClientProvider>

  <Provider store={ store }>
    <QueryClientProvider client={ queryClient }>
      <ErrorBoundary FallbackComponent={ ErrorFallback }>
        <BrowserRouter basename={ process.env.PUBLIC_URL }>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  </Provider>
);
