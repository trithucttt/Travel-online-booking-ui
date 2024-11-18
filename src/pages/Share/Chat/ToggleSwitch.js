import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function ToggleSwitch({ isOn, handleToggle }) {
    return (
        <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faMoon} className="text-xl" />
            <div
                className={`w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                    isOn ? 'bg-blue-500' : ''
                }`}
                onClick={handleToggle}
            >
                <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
                        isOn ? 'translate-x-8' : ''
                    }`}
                />
            </div>
            <FontAwesomeIcon icon={faSun} className="text-xl" />
        </div>
    );
}

export default ToggleSwitch;
