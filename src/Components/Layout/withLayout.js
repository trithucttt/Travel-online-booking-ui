import React from 'react';
import Layout from './index';

const withLayout = (WrappedComponent) => {
    return (props) => {
        const [isSidebarVisible, setSidebarVisible] = React.useState(false);

        const toggleSidebar = () => {
            setSidebarVisible(!isSidebarVisible);
        };

        return (
            <Layout toggleSidebar={toggleSidebar}>
                <WrappedComponent {...props} isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
            </Layout>
        );
    };
};

export default withLayout;
