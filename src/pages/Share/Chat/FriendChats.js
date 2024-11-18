import React, { useEffect, useState } from 'react';
import apiService from '../../../Components/ApiService';

function FriendChat() {
    const userId = localStorage.getItem('userId') || null;
    const [friends, setFriends] = useState([]);
    console.log(userId);
    useEffect(() => {
        const getFriends = async () => {
            try {
                const data = await apiService.request('get', `auth/friends/${userId}`);
                console.log('friend is ', data);
                setFriends(data);
            } catch (error) {
                console.log(error);
            }
        };
        getFriends();
    }, [userId]);

    const handleStartChat = async (friendId) => {
        try {
            const data = await apiService.request('post', 'chat/chatroom', {
                userId1: userId,
                userId: friendId,
            });
        } catch (error) {}
    };

    return (
        <div className="flex flex-col space-y-2">
            {friends.map((friend) => (
                <div
                    key={friend.userId}
                    className="flex items-center justify-between space-x-3 p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <div className="flex items-center space-x-3">
                        <img src={friend.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                        <div className="text-gray-800 dark:text-gray-200">{friend.fullNameUser}</div>
                    </div>
                    <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                        onClick={() => handleStartChat(friend.userId)}
                    >
                        Start Chat
                    </button>
                </div>
            ))}
        </div>
    );
}

export default FriendChat;
