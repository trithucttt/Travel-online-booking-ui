import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import apiService from '../../../Components/ApiService';
import axios from 'axios';
import Info from '../../Share/InfoUser/Info';
import withHeader from '../../../Components/Layout/withHeader';
import PostOwner from '../Add/Post/PostOwner';
import Tour from '../Add/Tour';
import AddPost from '../Add/Post';
import Add from '../Add/Tour/AddTour';
import TableDestination from '../Add/Destination/DestinationOwner';
import AddDestination from '../Add/Destination';
import { useParams } from 'react-router-dom';

function Profile() {
    const [activeItem, setActiveItem] = useState(1);
    const [activeSubItem, setActiveSubItem] = useState(null);
    const [infoUser, setInfoUser] = useState([]);
    const token = localStorage.getItem('token');
    const userRole = 'admin';
    const { userId } = useParams();
    const handleClickItem = (itemId) => {
        if (activeItem === itemId) {
            setActiveItem(null);
        } else {
            setActiveItem(itemId);
        }
        setActiveSubItem(null); // Reset active sub-item
    };

    const handleClickSubItem = (subItemId, e) => {
        setActiveSubItem(subItemId);
        e.stopPropagation(); // Ngăn chặn sự kiện "nổi bọt" lên các phần tử cha
    };
    const filteredSidebarItems = sidebarItems.filter((item) => {
        if (item.id === 2 && userRole !== 'admin') {
            return false;
        }
        return true;
    });

    const fetchUserData = async () => {
        try {
            let response;
            if (userId !== null && userId !== undefined) {
                // Fetching user data by ID
                response = await apiService.request('get', `auth/profile/${userId}`);
            } else {
                // Fetching user data by token
                response = await axios.get('http://localhost:8086/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                response = response.data;
            }

            console.log(response);
            const { userId: postsDto } = response;
            setInfoUser(response);
            // if (postsDto) setOwnerPost(postsDto);
            // if (toursDto) setOwnerTour(toursDto);

            console.log(postsDto ? postsDto : 'No posts data');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);
    const getMenuComponent = (itemId, subItemId) => {
        if (subItemId) {
            switch (subItemId) {
                case '2-1':
                    return <AddPost />;
                case '3-1':
                    return <Add />;
                case '4-1':
                    return <AddDestination />;
                default:
                    return null;
            }
        } else {
            switch (itemId) {
                case 1:
                    return <Info infoUser={infoUser} />;
                case 2:
                    return <PostOwner userId={userId && userId ? userId : infoUser.userId} />;
                case 3:
                    return <Tour ownerId={userId && userId ? userId : infoUser.userId} />;
                case 4:
                    return <TableDestination />;
                default:
                    return null;
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarAvatar}>
                    <img
                        src="https://i.pinimg.com/564x/77/3d/e8/773de85e694e8f88ed08ff5509ae4355.jpg"
                        alt="avatar"
                        className={styles.avatarImage}
                    />
                </div>
                {filteredSidebarItems.map((item) => (
                    <div key={item.id} className={styles.menuItems}>
                        <div className={styles.menuItemsTag}>
                            <div
                                onClick={() => handleClickItem(item.id)}
                                className={activeItem === item.id ? styles.menuActive : styles.menuTitle}
                            >
                                {item.title}
                            </div>
                            {item.submenu && (
                                <FontAwesomeIcon
                                    onClick={() => handleClickItem(item.id)}
                                    className={activeItem === item.id ? styles.iconSubActive : styles.iconSub}
                                    icon={activeItem === item.id ? faCaretDown : faCaretLeft}
                                />
                            )}
                        </div>
                        <div
                            className={`${item.submenu && activeItem === item.id ? `${styles.activeSubMenu} ` : ''}${
                                styles.submenu
                            }`}
                        >
                            {item.submenu?.map((subitem) => (
                                <div
                                    key={subitem.id}
                                    onClick={(e) => handleClickSubItem(subitem.id, e)}
                                    className={activeSubItem === subitem.id ? styles.activeSubItem : styles.subItems}
                                >
                                    {subitem.title}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.content}>{getMenuComponent(activeItem, activeSubItem)}</div>
        </div>
    );
}

export default withHeader(Profile);
const sidebarItems = [
    {
        id: 1,
        title: 'Profile',
        state: 'PROFILE',
        submenu: [
            { id: '1-1', title: 'Change Password' },
            { id: '1-2', title: 'History Order' },
        ],
    },
    {
        id: 2,
        title: 'Post',
        state: 'POST',
        submenu: [
            { id: '2-1', title: 'Create new post' },
            { id: '2-2', title: 'SubItem 2.2' },
        ],
    },
    {
        id: 3,
        title: 'Tour',
        state: 'TOUR',
        submenu: [
            { id: '3-1', title: 'Create new tour' },
            { id: '3-2', title: 'SubItem 2.2' },
            { id: '3-3', title: 'SubItem 2.3' },
        ],
    },
    {
        id: 4,
        title: 'Destination',
        state: 'DESTINATION',
        submenu: [
            { id: '4-1', title: 'Create new destination' },
            { id: '4-2', title: 'SubItem 2.2' },
            { id: '4-3', title: 'SubItem 2.3' },
        ],
    },
    {
        id: 5,
        title: 'Report',
        state: 'REPORT',
        submenu: null,
    },
];
