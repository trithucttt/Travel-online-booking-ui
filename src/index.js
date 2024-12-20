import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'rc-slider/assets/index.css';
import GlobalStyles from './Components/GlobalStyles';
import { ToastContainer } from 'react-toastify';
import 'react-image-lightbox/style.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ToastContainer />
        <BrowserRouter>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </BrowserRouter>
    </Provider>,
    // <React.StrictMode>
    //   <App />
    // </React.StrictMode>
);
