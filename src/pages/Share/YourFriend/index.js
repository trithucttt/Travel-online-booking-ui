// FriendsListPage.js
import React, { useState } from 'react';

const friendsData = [
    { id: 1, name: 'Nguyễn Văn A', avatar: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Trần Thị B', avatar: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Lê Văn C', avatar: 'https://via.placeholder.com/150' },
    // Thêm bạn bè khác ở đây nếu cần
];

function FriendsListPage() {
    const [friends, setFriends] = useState(friendsData);
    const [filter, setFilter] = useState('');

    const handleAddFriend = () => {
        const newFriend = { id: friends.length + 1, name: 'Nguyễn Thị D', avatar: 'https://via.placeholder.com/150' };
        setFriends([...friends, newFriend]);
    };

    const handleRemoveFriend = (id) => {
        setFriends(friends.filter((friend) => friend.id !== id));
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredFriends = friends.filter((friend) => friend.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
            <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Danh Sách Bạn Bè</h1>
            <input
                type="text"
                placeholder="Tìm kiếm bạn bè..."
                value={filter}
                onChange={handleFilterChange}
                className="w-full p-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ul>
                {filteredFriends.map((friend) => (
                    <li key={friend.id} className="flex items-center justify-between mb-4 p-4 border-b border-gray-200">
                        <div className="flex items-center">
                            <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full mr-4" />
                            <span className="text-lg font-semibold text-gray-700">{friend.name}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => handleRemoveFriend(friend.id)}
                                className="text-red-500 hover:text-red-700 font-semibold"
                            >
                                Xóa bạn bè
                            </button>
                            <button
                                onClick={() => alert(`Xem trang cá nhân của ${friend.name}`)}
                                className="text-blue-500 hover:text-blue-700 font-semibold"
                            >
                                Xem trang cá nhân
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button
                onClick={handleAddFriend}
                className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
                Thêm bạn bè
            </button>
        </div>
    );
}

export default FriendsListPage;
