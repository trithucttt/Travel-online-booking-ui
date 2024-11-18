// LoggedInView.js
import React from 'react';
import ProfileMenuItem from './ProfileMenuItem ';
import { routeKey } from '../../pathName';

function LoggedInView({ userName, userId, avatarUrl }) {
    const checkUser = () => {
        const getRole = localStorage.getItem('role');
        if (getRole === 'BUSINESS') {
            return `${routeKey.profileUser.replace(':userId', userId)}`;
        } else {
            return `${routeKey.profile.replace(':userId', userId)}`;
        }
    };

    const handleLogOut = () => {
        localStorage.clear('role');
        localStorage.clear('token');
        localStorage.clear('userId');
        localStorage.clear('username');
    };
    return (
        <>
            <div className="px-4 py-3 flex items-center space-x-4">
                <img src={avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full" />
                <span className="font-medium text-gray-900">{userName}</span>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <ProfileMenuItem to={checkUser()}>Trang cá nhân</ProfileMenuItem>
            <div className="border-t border-gray-200 my-2"></div>
            <ProfileMenuItem to="/settings">Cài đặt</ProfileMenuItem>
            <ProfileMenuItem to="/help">Trợ giúp</ProfileMenuItem>
            <ProfileMenuItem to={routeKey.login} click={() => handleLogOut()}>
                Đăng xuất
            </ProfileMenuItem>
        </>
    );
}
export default LoggedInView;
