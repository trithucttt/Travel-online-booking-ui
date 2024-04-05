import React from 'react';
import Layout from './index';

const withLayout = (WrappedComponent) => {
    return (props) => (
        <Layout>
            <WrappedComponent {...props} />
        </Layout>
    );
};

export default withLayout;
