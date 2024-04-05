import React, { useEffect, useId, useMemo, useState } from 'react';
import withHeader from '../../../Components/Layout/withHeader';
import styles from './BusinessPage.module.scss';
import Info from '../../Share/InfoUser/Info';
import Tour from '../Add/Tour';
import AddDestination from '../Add/Destination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import PostOwner from '../Add/Post/PostOwner';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import apiService from '../../../Components/ApiService';
function BusinessPage() {
    /*-----------------------------------------------------------------------------------*/
    const DisplayState = {
        NONE: 'NONE',
        POST: 'POST',
        REPORT: 'REPORT',
        ADD_POST: 'ADD_POST',
        TOUR: 'ADD_TOUR',
        DESTINATION: 'ADD_DESTINATION',
    };
    const [display, setDisplay] = useState(DisplayState.NONE);
    const [showDropdown, setShowDropdown] = useState(false);
    const [infoUser, setInfoUser] = useState([]);
    const token = localStorage.getItem('token');
    const [ownerId, setOwnerId] = useState(null);
    const [ownerPost, setOwnerPost] = useState(null);
    const [ownerTour, setOwnerTour] = useState(null);
    const { userId } = useParams();
    console.log('userId', userId);
    /* ----------------------------- handler -------------------------------------------------*/
    const toggleDropdown = () => setShowDropdown(!showDropdown);
    const handleDisplayChange = useMemo(() => {
        return (newDisplay) => {
            setDisplay(newDisplay);
        };
    }, []);
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
            const { userId: ownerIdFetch, postsDto, toursDto } = response;
            setInfoUser(response);
            if (postsDto) setOwnerPost(postsDto); //  set khi postsDto tồn tại
            if (toursDto) setOwnerTour(toursDto);
            setOwnerId(ownerIdFetch);
            console.log(postsDto ? postsDto : 'No posts data');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleChangeInfo = (value) => {
        console.log(value);
    };
    /*------------------------------------------------------------------------------*/
    return (
        <div className={styles.container}>
            <Info infoUser={infoUser} onChangeInfo={handleChangeInfo} />
            <div className={styles.bodyPage}>
                <div className={styles.dropdown}>
                    <button className={styles.controlPage} onClick={toggleDropdown}>
                        <FontAwesomeIcon icon={faCirclePlus} />
                    </button>
                    {showDropdown && (
                        <div className={styles.dropdownContent}>
                            <button onClick={() => handleDisplayChange(DisplayState.POST)}> Post</button>
                            <button onClick={() => handleDisplayChange(DisplayState.TOUR)}> Tour</button>
                            <button onClick={() => handleDisplayChange(DisplayState.DESTINATION)}>Destination</button>
                        </div>
                    )}
                </div>
                <div className={styles.pageItem}>
                    {display === DisplayState.POST && <PostOwner userId={ownerId} ownerPost={ownerPost} />}
                    {/* {display === DisplayState.ADD_POST && <AddPost ownerId={ownerId} />} */}
                    {display === DisplayState.TOUR && (
                        <>
                            <Tour ownerId={ownerId} ownerTour={ownerTour} />
                        </>
                    )}
                    {display === DisplayState.DESTINATION && (
                        <>
                            <div className={styles.listPost}>Add destination page</div>
                            <AddDestination ownerId={ownerId} />
                        </>
                    )}
                    {display === DisplayState.REPORT && <div className={styles.listPost}>Repost your owner</div>}
                </div>
            </div>
        </div>
    );
}

export default withHeader(BusinessPage);
