import React from 'react';
import ToggleSwitch from './ToggleSwitch';

function SettingsSidebar({ darkMode, setDarkMode }) {
    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold dark:text-gray-200">Settings</h2>
            <div className="dark:text-gray-200">Option 1</div>
            <div className="dark:text-gray-200">Option 2</div>
            <div className="dark:text-gray-200">Option 3</div>
            <div className="flex items-center space-x-2">
                <ToggleSwitch isOn={darkMode} handleToggle={() => setDarkMode(!darkMode)} />
            </div>
        </div>
    );
}

export default SettingsSidebar;
