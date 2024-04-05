import React from 'react';

import Footer from '../Footer/index';
import Header from '../Header/index';
const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
