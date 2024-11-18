import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCheckDouble, faCircle } from '@fortawesome/free-solid-svg-icons';

function ChatList({ chats, selectedChat, onSelectChat }) {
    const [search, setSearch] = useState('');

    const filteredChats = chats.filter((chat) =>
        chat.userDTOS.some((user) => user.fullNameUser.toLowerCase().includes(search.toLowerCase())),
    );
    return (
        <div className="flex-1 flex flex-col">
            <div className="relative mb-4">
                <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
            </div>
            <ul className="space-y-2 overflow-y-auto flex-1 ">
                {filteredChats.map((chat) => (
                    <li
                        key={chat.chatRoomId}
                        className={`p-4 rounded-lg cursor-pointer flex items-center space-x-4 ${
                            selectedChat === chat.chatRoomId
                                ? 'bg-blue-100 dark:bg-gray-700'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => onSelectChat(chat.chatRoomId)}
                    >
                        <img
                            src={chat.userDTOS[0]?.avatar || 'default-avatar.png'} // Use first user's avatar or a default
                            alt="Avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold dark:text-white">
                                    {chat.userDTOS[0]?.fullNameUser} {/* Display first user's full name */}
                                </span>
                                <span
                                    className={`text-sm ${
                                        chat.isRead ? 'text-gray-400 dark:text-gray-500' : 'text-blue-500'
                                    }`}
                                >
                                    {chat.isRead ? (
                                        <FontAwesomeIcon icon={faCheckDouble} />
                                    ) : (
                                        <FontAwesomeIcon icon={faCircle} />
                                    )}
                                </span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChatList;
