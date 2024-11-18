import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronDown } from '@fortawesome/free-solid-svg-icons';

function ProfileMenu({ isDropdownOpen, toggleDropdown, userName, avatarUrl }) {
    return (
        <Menu
            as="div"
            className="relative border border-slate-600 rounded-full size-10 item-center p-2 bg-gray-200 hover:bg-gray-300"
        >
            <MenuButton className="flex items-center space-x-2 focus:outline-none" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faUser} className="text-gray-600 text-2xl" />
            </MenuButton>
            <Transition
                show={isDropdownOpen}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems
                    static
                    className="absolute z-50 right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none"
                >
                    <div className="px-4 py-3 flex items-center space-x-4">
                        <img src={avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full" />
                        <span className="font-medium text-gray-900">{userName}</span>
                    </div>
                    <div className="border-t border-gray-200 my-2"></div>
                    <MenuItem>
                        {({ active }) => (
                            <a
                                href="/profile"
                                className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                            >
                                View Profile
                            </a>
                        )}
                    </MenuItem>
                    <div className="border-t border-gray-200 my-2"></div>
                    <MenuItem>
                        {({ active }) => (
                            <a
                                href="/settings"
                                className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                            >
                                Settings
                            </a>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {({ active }) => (
                            <a
                                href="/help"
                                className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                            >
                                Help
                            </a>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {({ active }) => (
                            <a
                                href="/register"
                                className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                            >
                                Register
                            </a>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {({ active }) => (
                            <a
                                href="/logout"
                                className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                            >
                                Logout
                            </a>
                        )}
                    </MenuItem>
                </MenuItems>
            </Transition>
            <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute bottom-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-black-400 bg-gray-300 rounded-full"
            ></FontAwesomeIcon>
        </Menu>
    );
}

export default ProfileMenu;
