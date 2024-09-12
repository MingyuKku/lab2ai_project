import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import store from "./redux/store";
import App from './App';
import './index.scss';

const rootDom = document.getElementById('lab2ai-root') as HTMLElement;
const root = ReactDOM.createRoot(rootDom);

root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <HelmetProvider>
    <BrowserRouter>
      <Provider store={ store }>
        <App />
      </Provider>
    </BrowserRouter>
  </HelmetProvider>
);