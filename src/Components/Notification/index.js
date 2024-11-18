import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';

import NotificationDetail from './NotificationDetail ';
import LoggedOutView from '../LoggedOutView';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import apiService from '../ApiService';

function NotificationsDropdown() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const stompClient = useRef(null);
    const userId = localStorage.getItem('userId') || '';
    const getRole = localStorage.getItem('role') || null;
    const isLoggedIn = getRole === 'BUSINESS' || getRole === 'USER';

    const getNotification = async () => {
        try {
            const data = await apiService.request('get', `notifications/get/${userId}`);
            // console.log(data);
            setNotifications(data);
        } catch (error) {
            console.log(error);
        }
    };

    // WebSocket setup
    useEffect(() => {
        // get notification
        getNotification();

        const socket = new SockJS('http://localhost:8086/ws'); // Replace with your WebSocket URL
        stompClient.current = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('Connected to WebSocket');
                stompClient.current.subscribe('/queue/' + userId + '/notifications', (message) => {
                    const notification = JSON.parse(message.body);
                    // console.log('NOTIFICATION', notification);
                    setNotifications((prev) => [notification, ...prev]);
                });
            },
            onStompError: (frame) => {
                // console.error('STOMP Error:', frame);
            },
            onDisconnect: () => {
                // console.log('Disconnected from WebSocket');
            },
        });

        stompClient.current.activate();

        return () => {
            if (stompClient.current) {
                stompClient.current.deactivate();
            }
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleNotificationClick = async (notification) => {
        setIsLoading(true);
        try {
            await apiService.request('put', `notifications/read/${notification.id}`);

            setNotifications(notifications.map((n) => (n.id === notification.id ? { ...n, read: true } : n)));
            setSelectedNotification(notification);
        } catch (error) {
            console.log('Error updating notification status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMarkAllAsRead = async () => {
        setIsLoading(true);
        try {
            await Promise.all(
                notifications.map(async (notification) => {
                    if (!notification.read) {
                        await apiService.request('put', `notifications/read/${notification.id}`);
                    }
                }),
            );

            setNotifications(notifications.map((n) => ({ ...n, read: true })));
        } catch (error) {
            console.log('Error marking all notifications as read:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="relative">
            <button
                className="relative border border-slate-600 rounded-full size-10 item-center p-2 bg-gray-200 hover:bg-gray-300"
                onClick={toggleDropdown}
            >
                <FontAwesomeIcon icon={faBell} className="text-gray-600 text-2xl" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        {unreadCount}
                    </span>
                )}
            </button>
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg max-h-60 overflow-y-auto z-50 rounded-lg">
                    {isLoggedIn ? (
                        <>
                            {/*  Thông báo loading cho phần check thông báo */}
                            {isLoading ? (
                                <div className="text-center py-4">Đang xử lý...</div>
                            ) : (
                                <ul>
                                    {notifications.map((notification) => (
                                        <li
                                            key={notification.id}
                                            className="px-4 py-2 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleNotificationClick(notification)}
                                        >
                                            <span>{notification.message}</span>
                                            <FontAwesomeIcon
                                                icon={notification.read ? faCheckCircle : faCircle}
                                                className={notification.read ? 'text-green-500' : 'text-red-500'}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <button
                                className="w-full text-center py-2 bg-blue-500 text-white hover:bg-blue-600"
                                onClick={handleMarkAllAsRead}
                            >
                                Đọc tất cả
                            </button>
                        </>
                    ) : (
                        <LoggedOutView menuItem={'Thông báo'} />
                    )}
                </div>
            )}
            <NotificationDetail notification={selectedNotification} onClose={() => setSelectedNotification(null)} />
        </div>
    );
}

export default NotificationsDropdown;
