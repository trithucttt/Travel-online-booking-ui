import React, { useEffect, useState } from 'react';
import apiService from '../../../Components/ApiService';

function FriendsList() {
    const [friends, setFriends] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const userId = localStorage.getItem('userId') || '';
    const token = localStorage.getItem('token') || null;
    useEffect(() => {
        if (!token) {
            setIsLoggedIn(false);
            return;
        }

        const getFriends = async () => {
            try {
                const data = await apiService.request('get', `auth/friends/${userId}`);
                setFriends(data);
            } catch (error) {
                console.log(error);
            }
        };
        getFriends();
    }, [userId, token]);

    if (!isLoggedIn) {
        return (
            <div className="p-4 text-center">
                <p className="text-gray-600">Vui lòng đăng nhập để xem danh sách bạn bè.</p>
            </div>
        );
    }

    return (
        <div className="hidden md:block w-1/6 p-4">
            <h2 className="text-lg font-semibold mb-4">Bạn bè </h2>
            {friends.length === 0 ? (
                <p className="text-gray-600">Không có bạn bè nào đang hoạt động.</p>
            ) : (
                <ul>
                    {friends.map((friend, index) => (
                        <li
                            key={index}
                            className="flex items-center py-2 px-4 mb-2 bg-white rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer"
                        >
                            <div className="relative w-10 h-10">
                                <img className="w-10 h-10 rounded-full" src={friend.avatar} alt={friend.fullNameUser} />
                                {friend.online && (
                                    <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                                )}
                            </div>
                            <span className="ml-4 text-black">{friend.fullNameUser}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default FriendsList;
