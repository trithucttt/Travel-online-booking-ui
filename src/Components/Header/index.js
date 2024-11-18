import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCommentDots, faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import NotificationsDropdown from '../Notification/index';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import LOGO from '../Acess/image/logo.jpg';
import ProfileMenu from './DropdownProfile/index';
import { routeKey } from '../pathName';

function Header({ toggleSidebar }) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [cartItems, setCartItems] = useState(3);
    const navigate = useNavigate();
    const userName = localStorage.getItem('username') || 'Đăng nhập để xem thông tin';
    const avatarUrl = 'https://i.pinimg.com/564x/39/d5/22/39d52280eb439f487c6553cd2710bbd2.jpg';
    const getRole = localStorage.getItem('role') || null;
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleClickChatApp = async () => {
        if (getRole === null) {
            const confirmed = await swal({
                title: 'Vui lòng đăng nhập trước khi tham gia trò chuyện?',
                text: 'Bạn có muốn đăng nhập để trò chuyện không!',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            });
            if (confirmed) {
                navigate(routeKey.login);
            }
        } else {
            navigate(routeKey.chat);
        }
    };

    const renderShoppingCart = () => {
        return getRole === null || getRole === 'USER';
    };

    const handleClickCart = async () => {
        if (getRole === null) {
            const confirmed = await swal({
                title: 'Vui lòng đăng nhập trước khi xem giỏ hàng?',
                text: 'Bạn có muốn đăng nhập để xem giỏ hàng không!',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            });
            if (confirmed) {
                navigate(routeKey.login);
            }
        } else {
            navigate(routeKey.cart);
        }
    };
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <img alt="LOGO" src={LOGO} className="h-10 w-10 object-cover mr-2 rounded-full" />
                        <span className="text-lg font-bold flex items-center text-gray-800">
                            WAKE
                            <span className="bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text">
                                &nbsp;T
                            </span>
                            RAVEL
                        </span>
                    </Link>
                </div>

                <div className="flex items-center space-x-6">
                    <button className="md:hidden" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={faBars} className="text-gray-600 text-2xl" />
                    </button>

                    {renderShoppingCart() && (
                        <button
                            onClick={() => handleClickCart()}
                            className="relative border rounded-full p-2 bg-gray-200 hover:bg-blue-500 transition transform hover:scale-105 shadow-lg"
                        >
                            <FontAwesomeIcon icon={faShoppingCart} className="text-gray-600 text-2xl" />
                            {cartItems > 0 && (
                                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                                    {cartItems}
                                </span>
                            )}
                        </button>
                    )}

                    <button
                        onClick={handleClickChatApp}
                        className="relative border rounded-full p-2 bg-gray-200 hover:bg-blue-500 transition transform hover:scale-105 shadow-lg"
                    >
                        <FontAwesomeIcon icon={faCommentDots} className="text-gray-600 text-2xl" />
                    </button>

                    <NotificationsDropdown />

                    <ProfileMenu
                        isDropdownOpen={isDropdownOpen}
                        toggleDropdown={toggleDropdown}
                        userName={userName}
                        avatarUrl={avatarUrl}
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;
