import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserFriends,
    faFileAlt,
    faPlane,
    faComments,
    faInfoCircle,
    faChevronUp,
    faChevronDown,
    faUnlock,
    faCircleInfo,
    faCommentSlash,
    faGear,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { routeKey } from '../pathName';

const Sidebar = ({ isVisible, toggleSidebar }) => {
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();

    const primaryItems = [
        { name: 'Bạn bè', icon: faUserFriends, id: 1 },
        { name: 'Bài viết', icon: faFileAlt, id: 2 },
        { name: 'Chuyến đi', icon: faPlane, id: 3 },
        { name: 'Trò chuyện', icon: faComments, id: 4 },
        { name: 'Về chúng tôi', icon: faInfoCircle, id: 5 },
    ];

    const moreItems = [
        { name: 'Cài đặt', icon: faGear, id: 6 },
        { name: 'Quyền riêng tư', icon: faUnlock, id: 7 },
        { name: 'Trợ giúp', icon: faCircleInfo, id: 8 },
        { name: 'Phản hồi', icon: faCommentSlash, id: 9 },
    ];

    const toggleMoreItems = () => {
        setShowMore(!showMore);
    };

    const handleRenderPage = (item) => {
        // console.log(item);
        switch (item) {
            case (item = 1):
                navigate(routeKey.friend);
                break;
            case (item = 2):
                navigate(routeKey.searchPage);
                break;
            case (item = 4):
                navigate(routeKey.chat);
                break;
            case (item = 7):
                navigate(routeKey.policy);
                break;
            case (item = 8):
                navigate(routeKey.help);
                break;
            case (item = 9):
                navigate(routeKey.feedBack);
                break;
            default:
                navigate(routeKey.home);
        }
    };

    return (
        <div
            className={`fixed md:relative z-40 bg-gray-800 text-white p-4 transition-transform duration-300 ${
                isVisible ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            } ${isVisible ? 'w-full h-full md:w-auto md:h-auto' : ''}`}
        >
            <button className="md:hidden absolute top-2 right-2 text-white" onClick={toggleSidebar}>
                X
            </button>
            <ul>
                {primaryItems.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => handleRenderPage(item.id)}
                        className="flex items-center py-2 px-4 mb-2 rounded-lg hover:bg-gray-600 transition-all duration-300 cursor-pointer"
                    >
                        <FontAwesomeIcon icon={item.icon} className="text-blue-400 mr-3" />
                        <span className="text-white">{item.name}</span>
                    </li>
                ))}
                <li
                    className="select-none flex items-center py-2 px-4 mb-2 rounded-lg hover:bg-gray-600 transition-all duration-300 cursor-pointer"
                    onClick={toggleMoreItems}
                >
                    <FontAwesomeIcon icon={showMore ? faChevronUp : faChevronDown} className="text-blue-400 mr-3" />
                    <span className="text-white">{showMore ? 'Thu nhỏ' : 'Mở rộng'}</span>
                </li>
                {showMore &&
                    moreItems.map((item, index) => (
                        <li
                            onClick={() => handleRenderPage(item.id)}
                            key={index}
                            className="select-none flex items-center py-2 px-4 mb-2 rounded-lg hover:bg-gray-600 transition-all duration-300 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={item.icon} className="text-blue-400 mr-3" />
                            <span className="text-white">{item.name}</span>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Sidebar;
