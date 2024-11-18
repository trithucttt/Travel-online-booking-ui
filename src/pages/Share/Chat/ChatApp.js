import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faMoon, faSun, faUsers } from '@fortawesome/free-solid-svg-icons';
import ChatList from './ChatList';
import ChatUserInfo from './ChatUserInfo';
import SettingsSidebar from './SettingsSidebar';
import FriendChats from './FriendChats';
import apiService from '../../../Components/ApiService';
import MessageInput from './MessageInput';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import withLayout from '../../../Components/Layout/withLayout';

function ChatApp() {
    const [darkMode, setDarkMode] = useState(false);
    const [selectedChat, setSelectedChat] = useState(1);
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [image, setImage] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [showFriends, setShowFriends] = useState(false);
    const [showProfileUser, setShowProfileUser] = useState(false);
    const stompClient = useRef(null);
    const userId = localStorage.getItem('userId') || 1;
    const fetchChatRooms = async (userId) => {
        try {
            const response = await apiService.request('get', `chat/chatroom/${userId}`);

            setChats(response);
            console.log(response);
        } catch (error) {
            console.error('Error fetching chat rooms:', error);
        }
    };

    const fetchMessages = async (chatRoomId) => {
        try {
            const response = await apiService.request('get', `chat/messages/${chatRoomId}`);
            setMessages(response);
            console.log(response);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetchChatRooms(userId);
        }

        const subscribeToChat = (chatRoomId) => {
            stompClient.current.subscribe(`/topic/chat/${chatRoomId}`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages((prevMessages) => {
                    // Kiểm tra xem tin nhắn đã tồn tại trong danh sách chưa
                    const messageExists = prevMessages.some((msg) => msg.id === receivedMessage.id);
                    if (!messageExists) {
                        return [...prevMessages, receivedMessage];
                    }
                    return prevMessages; // Không thêm lại nếu đã tồn tại
                });
            });
        };

        // khởi tạo kết nối với websocket
        const socket = new SockJS('http://localhost:8086/ws');
        stompClient.current = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('Connected to WebSocket');
                subscribeToChat(selectedChat);
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        stompClient.current.activate();

        return () => {
            if (stompClient.current) {
                stompClient.current.deactivate();
            }
        };
    }, [selectedChat]);

    const handleSendMessage = async () => {
        if (newMessage.trim() || image) {
            const messageData = {
                chatRoomId: selectedChat,
                senderId: localStorage.getItem('userId'),
                content: newMessage,
                // imageUrl: image,
            };

            try {
                // Gửi message thông qua WebSocket
                stompClient.current.publish({
                    destination: `/app/chat.sendMessage`,
                    body: JSON.stringify(messageData),
                });

                setNewMessage('');
                setImage(null);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const filteredMessages = messages.filter((message) => message.chatRoomId === selectedChat);
    const chatUser = chats.find((chat) => chat.chatRoomId === selectedChat);
    const currentUser = {
        name: 'Tri Thuc',
        avatar: 'https://i.pinimg.com/564x/39/d5/22/39d52280eb439f487c6553cd2710bbd2.jpg',
    };

    const handleSelectChat = (id) => {
        setChats(chats.map((chat) => (chat.chatRoomId === id ? { ...chat, isRead: true } : chat)));
        setSelectedChat(id);
        fetchMessages(id);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
            {/* Sidebar */}
            <div className="w-96 bg-white dark:bg-gray-900 p-4 flex flex-col border-r border-gray-300 dark:border-gray-700 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <img
                        src={currentUser.avatar}
                        alt="Avatar"
                        className="w-12 h-12 rounded-full cursor-pointer border-2 border-blue-500 hover:scale-105 transition transform duration-300"
                    />
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon
                            icon={faUsers}
                            className="text-2xl cursor-pointer dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 transition duration-300"
                            onClick={() => setShowFriends(!showFriends)}
                        />
                        <FontAwesomeIcon
                            icon={darkMode ? faSun : faMoon}
                            className="text-2xl cursor-pointer dark:text-gray-400 hover:text-yellow-400 dark:hover:text-yellow-200 transition duration-300"
                            onClick={() => setDarkMode(!darkMode)}
                        />
                        <FontAwesomeIcon
                            icon={faCog}
                            className="text-2xl cursor-pointer dark:text-gray-400 hover:text-green-500 dark:hover:text-green-300 transition duration-300"
                            onClick={() => setShowSettings(!showSettings)}
                        />
                    </div>
                </div>
                {!showSettings && !showFriends && (
                    <ChatList chats={chats} selectedChat={selectedChat} onSelectChat={handleSelectChat} />
                )}
                {showFriends && <FriendChats userId={userId} />}
                {showSettings && <SettingsSidebar darkMode={darkMode} setDarkMode={setDarkMode} />}
            </div>

            <div className="flex flex-col flex-1 bg-gray-100 dark:bg-gray-800">
                {/* Header */}
                <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-4 flex justify-between items-center rounded-b-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl">
                    <div className="text-lg font-extrabold">
                        Chat with {chatUser?.userDTOS[0]?.fullNameUser || 'Select a chat'}
                    </div>
                    <div className="flex items-center space-x-4">
                        <img
                            src={chatUser?.userDTOS[0]?.avatar || currentUser.avatar}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full border-2 border-white shadow-md transform hover:scale-110 transition duration-300 cursor-pointer"
                            onClick={() => setShowProfileUser(!showProfileUser)}
                        />
                    </div>
                </header>

                {/* chat area */}
                <div className="flex-1 p-4 overflow-y-auto dark:bg-gray-700 space-y-4">
                    {filteredMessages.map((message) => {
                        const isCurrentUser = message.senderId === parseInt(localStorage.getItem('userId'));
                        return (
                            <div
                                key={message.id}
                                className={`flex ${
                                    isCurrentUser ? 'justify-end' : 'justify-start'
                                } transition-all duration-300`}
                            >
                                <div
                                    className={`max-w-xs p-4 rounded-lg shadow-lg transition-opacity duration-300 transform ${
                                        isCurrentUser
                                            ? 'bg-blue-500 text-white opacity-100 scale-100 hover:scale-105'
                                            : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 opacity-100 scale-100 hover:scale-105'
                                    }`}
                                >
                                    <div className="font-semibold">
                                        {isCurrentUser ? 'You' : `${message.senderName}`}
                                    </div>
                                    <div>{message.content}</div>
                                    <div className="text-xs text-gray-500 mt-2">
                                        {new Date(message.timestamp).toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Input Area */}
                <MessageInput
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    handleSendMessage={handleSendMessage}
                    setImage={setImage}
                />
            </div>

            {/* Chat User Info */}
            {showProfileUser && <ChatUserInfo user={chatUser} darkMode={darkMode} />}
        </div>
    );
}

export default withLayout(ChatApp);
