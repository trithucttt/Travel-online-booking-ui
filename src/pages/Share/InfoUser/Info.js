import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import styles from './Info.module.scss';
import validateInfo from './validateInfo';
import apiService from '../../../Components/ApiService';
import { toast } from 'react-toastify';

const Info = ({ infoUser }) => {
    const [editClick, setEditClick] = useState(false);
    const [errors, setErrors] = useState({});
    const [editInfo, setEditInfo] = useState({
        username: infoUser?.username,
        firstName: infoUser?.firstName,
        lastName: infoUser?.lastName,
        email: infoUser?.email,
        address: infoUser?.address,
    });

    useEffect(() => {
        setEditInfo({
            username: infoUser?.username,
            firstName: infoUser?.firstName,
            lastName: infoUser?.lastName,
            email: infoUser?.email,
            address: infoUser?.address,
        });
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

    return (
        <>
            <div className={styles.infoContent}>
                <div className={styles.infoGroup}>
                    <div className={styles.businessInfo}>
                        <label>User Name: </label>
                        <p className={`${styles.inputInfoUser} ${styles.inputUserName}`}>{editInfo?.username}</p>
                    </div>
                    {!editClick && (
                        <>
                            <div className={styles.businessInfo}>
                                <label>Last Name: </label>
                                <p className={`${styles.inputInfoUser} ${styles.inputFullName}`}>{editInfo.lastName}</p>
                            </div>
                            <div className={styles.businessInfo}>
                                <label>First Name: </label>
                                <p className={`${styles.inputInfoUser} ${styles.inputFullName}`}>
                                    {editInfo.firstName}
                                </p>
                            </div>
                            <div className={styles.businessInfo}>
                                <label>Email: </label>
                                <p className={`${styles.inputInfoUser} ${styles.inputEmail}`}>{editInfo.email}</p>
                            </div>
                            <div className={styles.businessInfo}>
                                <label>Address: </label>
                                <p className={`${styles.inputInfoUser} ${styles.inputAddress}`}>{editInfo.address}</p>
                            </div>
                        </>
                    )}
                    {editClick && (
                        <>
                            <div className={styles.businessInfo}>
                                <label>Last Name: </label>
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
                                <label>First Name: </label>
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
                                <label>Address: </label>
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

                    <div className={styles.buttonGroup}>
                        {!editClick && (
                            <button
                                className={`${styles.btn} ${styles.editBtn}`}
                                disabled={editClick}
                                onClick={handleEdit}
                            >
                                <FontAwesomeIcon icon={faPen} /> Edit
                            </button>
                        )}
                        {editClick && (
                            <button className={`${styles.btn} ${styles.editBtn}`} onClick={handleSave}>
                                Save
                            </button>
                        )}
                        {editClick && (
                            <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={handleCancel}>
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
                <div className={styles.imageGroup}>
                    <img
                        alt="avatar"
                        src="https://i.pinimg.com/564x/77/3d/e8/773de85e694e8f88ed08ff5509ae4355.jpg"
                        className={styles.imageUser}
                    />
                    <button className={styles.changeImgBnt}>Change image</button>
                </div>
            </div>
        </>
    );
};

export default Info;
