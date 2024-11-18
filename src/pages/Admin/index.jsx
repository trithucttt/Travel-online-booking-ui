import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import Login from './Login';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (status) => {
        setIsLoggedIn(status);
    };

    return (
        <div>
            {isLoggedIn ? <AdminDashboard onLogout={() => setIsLoggedIn(false)} /> : <Login onLogin={handleLogin} />}
        </div>
    );
};

export default Admin;
