import React, { useEffect, useState } from 'react';
import apiService from '../ApiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const NotificationDetail = ({ notification, onClose }) => {
    const [notificationDetails, setNotificationDetails] = useState(null);

    useEffect(() => {
        const fetchNotificationDetails = async () => {
            if (notification && notification.relateChatMessageId) {
                try {
                    const data = await apiService.request('get', `messages/${notification.relateChatMessageId}`);
                    setNotificationDetails(data);
                } catch (error) {
                    console.error('Error fetching notification details:', error);
                }
            }
        };

        fetchNotificationDetails();
    }, [notification]);

    if (!notification) return null;

    return (
        <div className="z-50 fixed  inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white max-w-lg w-full p-8 rounded-lg shadow-lg transform transition-all duration-300">
                <div className="text-right">
                    <button className="text-gray-400 hover:text-red-600" onClick={onClose}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{notification.message}</h2>
                {notificationDetails ? (
                    <div className="text-gray-600">
                        <p>
                            <strong>Tin nhắn từ: </strong> {notificationDetails.senderName}
                        </p>
                        <p>
                            <strong>Được gửi lúc: </strong> {new Date(notificationDetails.timestamp).toLocaleString()}
                        </p>
                        <p>
                            <strong>Nội dung: </strong> {notificationDetails.content}
                        </p>
                    </div>
                ) : (
                    <div className="text-center text-gray-500">Loading details...</div>
                )}
                <button
                    className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default NotificationDetail;
