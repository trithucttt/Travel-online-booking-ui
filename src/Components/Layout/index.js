import React from 'react';

import Footer from '../Footer/index';
import Header from '../Header/index';
const Layout = ({ children, toggleSidebar }) => {
    return (
        <div className="layout">
            <Header toggleSidebar={toggleSidebar} />
            <main className="pt-2">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
