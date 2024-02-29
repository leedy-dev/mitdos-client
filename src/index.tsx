import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import * as serviceWorker from './serviceWorker';
import 'nprogress/nprogress.css';
import { store } from "src/app/store";
import App from './App';
import { createRoot } from "react-dom/client";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HelmetProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </HelmetProvider>
        </Provider>
    </React.StrictMode>
);

serviceWorker.unregister();
