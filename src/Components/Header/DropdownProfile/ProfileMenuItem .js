// ProfileMenuItem.js
import React from 'react';
import { MenuItem } from '@headlessui/react';
import { Link } from 'react-router-dom';

const ProfileMenuItem = ({ to, children, click }) => (
    <MenuItem>
        {({ active }) => (
            <Link
                to={to}
                onClick={click}
                className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
            >
                {children}
            </Link>
        )}
    </MenuItem>
);

export default ProfileMenuItem;
