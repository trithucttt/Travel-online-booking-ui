import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoggedOutView = ({ menuItem }) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="px-2 py-2 text-center ">
            <p>Vui lòng đăng nhập để xem {menuItem}.</p>
            <div className="mt-4 flex justify-between">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleLogin}>
                    Login
                </button>
                <button
                    className="bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600"
                    onClick={handleRegister}
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default LoggedOutView;
