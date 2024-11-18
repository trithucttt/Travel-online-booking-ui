import React from 'react';

import Header from '../Header/index';
const onlyHeader = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <main className="pt-2">{children}</main>
        </div>
    );
};

export default onlyHeader;
