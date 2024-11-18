// ProfileMenu.js
import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import LoggedOutView from '../../LoggedOutView';
import LoggedInView from './LoggedInView';

const ProfileMenu = ({ isDropdownOpen, toggleDropdown, userName, avatarUrl }) => {
    const getRole = localStorage.getItem('role') || null;
    const isLoggedIn = getRole === 'BUSINESS' || getRole === 'USER';
    const userId = localStorage.getItem('userId') || null;

    return (
        <Menu
            as="div"
            className="relative border border-slate-600 rounded-full size-10 item-center p-2 bg-gray-200 hover:bg-gray-300"
        >
            <MenuButton className="flex items-center space-x-2 focus:outline-none" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faUser} className="text-gray-600 text-2xl" />
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className="absolute bottom-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-black-400 bg-gray-300 rounded-full"
                />
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
                    {isLoggedIn ? (
                        <LoggedInView userName={userName} userId={userId} avatarUrl={avatarUrl} />
                    ) : (
                        <LoggedOutView menuItem={'Trang cá nhân'} />
                    )}
                </MenuItems>
            </Transition>
        </Menu>
    );
};

export default ProfileMenu;
