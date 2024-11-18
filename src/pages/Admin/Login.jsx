// Login.jsx
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (username === 'admin' && password === 'admin123') {
            onLogin(true); // Đăng nhập thành công
        } else {
            setError('Sai tên đăng nhập hoặc mật khẩu');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-4 p-2 bg-gray-900 rounded-md"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 p-2 bg-gray-900 rounded-md"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-md mt-4"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
