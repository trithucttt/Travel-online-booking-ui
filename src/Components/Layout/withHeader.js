import React from 'react';
import HeaderLayout from './HeaderLayout';

const withHeader = (WrappedComponent) => {
    return (props) => (
        <HeaderLayout>
            <WrappedComponent {...props} />
        </HeaderLayout>
    );
};

export default withHeader;
