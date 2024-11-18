import React from 'react';

function ChatUserInfo({ user }) {
    if (!user) return null;

    return (
        <div className="w-72 bg-gradient-to-b from-blue-50 to-blue-200 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl border-l border-gray-300 dark:border-gray-700 p-6 h-full transition-all ease-in-out duration-300 transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center tracking-widest uppercase">
                User Info
            </h2>
            <div className="flex flex-col items-center space-y-4 mb-6">
                <div className="relative w-20 h-20">
                    <img
                        src={user?.userDTOS[0]?.avatar}
                        alt="Avatar"
                        className="w-full h-full rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-700 transform transition-transform duration-500 hover:rotate-12 hover:scale-110"
                    />
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        {user?.userDTOS[0]?.fullNameUser}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Active now</p>
                </div>
            </div>
            <ul className="space-y-4 text-center">
                <li className="text-gray-900 dark:text-gray-200 font-medium cursor-pointer bg-white dark:bg-gray-700 py-2 px-4 rounded-full shadow-md transition-all duration-300 hover:bg-cyan-500 hover:text-blue-700">
                    Block User
                </li>
                <li className="text-gray-900 dark:text-gray-200 font-medium cursor-pointer bg-white dark:bg-gray-700 py-2 px-4 rounded-full shadow-md transition-all duration-300 hover:bg-cyan-500 hover:text-blue-700">
                    Share Contact
                </li>
                <li className="text-gray-900 dark:text-gray-200 font-medium cursor-pointer bg-white dark:bg-gray-700 py-2 px-4 rounded-full shadow-md transition-all duration-300 hover:bg-cyan-500 hover:text-blue-700">
                    Search in Chat
                </li>
            </ul>
        </div>
    );
}

export default ChatUserInfo;
