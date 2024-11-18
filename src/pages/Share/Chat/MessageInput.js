import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faImage } from '@fortawesome/free-solid-svg-icons';

function MessageInput({ newMessage, setNewMessage, handleSendMessage, setImage }) {
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
        <div className="bg-white dark:bg-gray-900 p-4 flex items-center border-t border-gray-300 dark:border-gray-700 shadow-md rounded-lg space-x-4">
            <input
                type="text"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200 transition duration-300"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <input type="file" className="hidden" id="upload" accept="image/*" onChange={handleImageUpload} />
            <label
                htmlFor="upload"
                className="p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 transform hover:scale-105 cursor-pointer"
            >
                <FontAwesomeIcon icon={faImage} className="text-lg" />
            </label>
            <button
                className="p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 transform hover:scale-105"
                onClick={handleSendMessage}
            >
                <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
            </button>
        </div>
    );
}

export default MessageInput;
