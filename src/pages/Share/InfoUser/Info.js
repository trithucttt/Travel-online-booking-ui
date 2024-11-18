import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPen } from '@fortawesome/free-solid-svg-icons';

import styles from './Info.module.scss';
import validateInfo from './validateInfo';
import apiService from '../../../Components/ApiService';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';

const Info = ({ infoUser, checkUser }) => {
    const [editClick, setEditClick] = useState(false);
    const [errors, setErrors] = useState({});
    const [avatar, setAvatar] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const token = localStorage.getItem('token');
    const fileInputRef = useRef(null);
    const [curUser, setCurUser] = useState([]);
    const [friends, setFriends] = useState([]);
    const { userId } = useParams();
    const currentUserId = localStorage.getItem('userId') || '';
    const [editInfo, setEditInfo] = useState({
        username: infoUser?.username,
        firstName: infoUser?.firstName,
        lastName: infoUser?.lastName,
        email: infoUser?.email,
        address: infoUser?.address,
    });

    const fetchFriends = async () => {
        console.log('lay userId tu profile', currentUserId);

        try {
            const response = await apiService.request('get', `auth/friends/${parseInt(currentUserId)}`);
            setFriends(response);
        } catch (error) {
            swal('Lỗi lấy danh sách bạn bè', 'Có lỗi xảy ra khi lấy danh sách bạn bè' + error, 'error');
        }
    };
    useEffect(() => {
        setEditInfo({
            username: infoUser?.username,
            firstName: infoUser?.firstName,
            lastName: infoUser?.lastName,
            email: infoUser?.email,
            address: infoUser?.address,
        });
        if (token !== null) {
            const parstToken = jwtDecode(token);
            setCurUser(parstToken.sub);
        }
        fetchFriends();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [infoUser]);

    const handleChangeInfo = (e) => {
        const { name, value } = e.target;
        setEditInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        const errors = validateInfo(editInfo);
        if (Object.keys(errors).length === 0) {
            console.log('No errors. Save the data:', editInfo);
            setErrors({});
        } else {
            setErrors(errors);
            console.log('Validation errors:', errors);
        }
    };

    const handleEdit = () => {
        if (editClick === false) {
            setEditClick(true);
        }
    };

    const handleCancel = () => {
        setEditClick(!editClick);
        setEditInfo({
            username: infoUser?.username,
            firstName: infoUser.firstName,
            lastName: infoUser.lastName,
            email: infoUser.email,
            address: infoUser.address,
        });
    };
    const handleSave = async () => {
        const errors = validateInfo(editInfo);
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        if (Object.keys(errors).length === 0) {
            console.log('No errors. Save the data:', editInfo);
            setErrors({});
            const data = await apiService.request('post', 'auth/profile/update', editInfo, headers);
            toast(data);
            if (data != null) {
                const infoUserUpdate = await apiService.request('get', 'auth/profile', null, headers);
                setEditInfo(infoUserUpdate);
                setEditClick(!editClick);
            }
        } else {
            setErrors(errors);
            console.log('Validation errors:', errors);
        }
    };
    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            // Tạo một URL cho file mới để hiển thị
            setSelectedAvatar(e.target.files[0]);
            const newImageURL = URL.createObjectURL(e.target.files[0]);
            setAvatar(newImageURL);
        }
    };
    const handleSaveAvatar = async () => {
        console.log(selectedAvatar);
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const formData = new FormData();
        formData.append('avatarUser', selectedAvatar);
        const data = await apiService.request('post', 'auth/change/avatar', formData, headers);
        if (data.responseCode === '200') {
            swal('Success', data.message, 'success');
            setAvatar('');
            setSelectedAvatar('');
            const infoUserUpdate = await apiService.request('get', 'auth/profile', null, headers);
            setEditInfo(infoUserUpdate);
            setEditClick(!editClick);
        } else {
            swal('Failed', data.message, 'warning');
        }
    };
    const isFriend = () => {
        return friends.some((friend) => friend.userId === parseInt(userId));
    };
    return (
        <>
            <div className={styles.infoContent}>
                <div className={styles.infoGroup}>
                    <div className={styles.businessInfo}>
                        <label>Tên đăng nhập: </label>
                        <p className={`${styles.inputInfoUser} ${styles.inputUserName}`}>{editInfo?.username}</p>
                    </div>
                    {!editClick && (
                        <>
                            <div className={styles.businessInfo}>
                                <label>Họ: </label>
                                <p className={`${styles.inputInfoUser} ${styles.inputFullName}`}>{editInfo.lastName}</p>
                            </div>
                            <div className={styles.businessInfo}>
                                <label>Tên: </label>
                                <p className={`${styles.inputInfoUser} ${styles.inputFullName}`}>
                                    {editInfo.firstName}
                                </p>
                            </div>
                            <div className={styles.businessInfo}>
                                <label>Email: </label>
                                <p className={`${styles.inputInfoUser} ${styles.inputEmail}`}>{editInfo.email}</p>
                            </div>
                            <div className={styles.businessInfo}>
                                <label>Địa chỉ: </label>
                                <p className={`${styles.inputInfoUser} ${styles.inputAddress}`}>{editInfo.address}</p>
                            </div>
                        </>
                    )}
                    {editClick && (
                        <>
                            <div className={styles.businessInfo}>
                                <label>Họ: </label>
                                <input
                                    autoFocus={editClick}
                                    disabled={!editClick}
                                    className={`${styles.inputInfoUser} ${styles.inputFullName}`}
                                    type="text"
                                    name="lastName"
                                    value={editInfo?.lastName}
                                    onChange={handleChangeInfo}
                                />
                            </div>
                            {errors.lastName && <div className={styles.error}>{errors.lastName}</div>}
                            <div className={styles.businessInfo}>
                                <label>Tên: </label>
                                <input
                                    disabled={!editClick}
                                    className={`${styles.inputInfoUser} ${styles.inputFullName}`}
                                    type="text"
                                    name="firstName"
                                    value={editInfo?.firstName}
                                    onChange={handleChangeInfo}
                                />
                            </div>
                            {errors.firstName && <div className={styles.error}>{errors.firstName}</div>}
                            <div className={styles.businessInfo}>
                                <label>Email: </label>
                                <input
                                    disabled={!editClick}
                                    className={`${styles.inputInfoUser} ${styles.inputEmail}`}
                                    type="text"
                                    name="email"
                                    value={editInfo?.email}
                                    onChange={handleChangeInfo}
                                />
                            </div>
                            {errors.email && <div className={styles.error}>{errors.email}</div>}

                            <div className={styles.businessInfo}>
                                <label>Địa chỉ: </label>
                                <input
                                    disabled={!editClick}
                                    className={`${styles.inputInfoUser} ${styles.inputAddress}`}
                                    type="text"
                                    name="address"
                                    value={editInfo?.address}
                                    onChange={handleChangeInfo}
                                />
                            </div>
                            {errors.address && <div className={styles.error}>{errors.address}</div>}
                        </>
                    )}

                    {infoUser.username === curUser && (
                        <div className={styles.buttonGroup}>
                            {!editClick && (
                                <button
                                    className={`${styles.btn} ${styles.editBtn}`}
                                    disabled={editClick}
                                    onClick={handleEdit}
                                >
                                    <FontAwesomeIcon icon={faPen} /> Chỉnh sửa
                                </button>
                            )}

                            {editClick && (
                                <button className={`${styles.btn} ${styles.editBtn}`} onClick={handleSave}>
                                    Lưu
                                </button>
                            )}
                            {editClick && (
                                <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={handleCancel}>
                                    Hủy bỏ
                                </button>
                            )}
                        </div>
                    )}
                    {!checkUser && (
                        <button className={styles.friendButton}>
                            <FontAwesomeIcon icon={faCheckCircle} className={styles.friendButtonIcon} />
                            {isFriend() ? 'Đã là bạn bè' : 'Kết bạn'}
                        </button>
                    )}
                </div>
                <div className={styles.imageGroup}>
                    <img
                        alt="avatar"
                        src={avatar && avatar ? avatar : infoUser.avatarUser}
                        className={styles.imageUser}
                    />
                    <input type="file" onChange={handleAvatarChange} style={{ display: 'none' }} ref={fileInputRef} />
                    {checkUser && (
                        <button className={styles.changeImgBnt} onClick={() => fileInputRef.current.click()}>
                            Đổi ảnh đại diện
                        </button>
                    )}
                    {avatar && (
                        <button className={styles.changeImgBnt} onClick={handleSaveAvatar}>
                            Lưu
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Info;
