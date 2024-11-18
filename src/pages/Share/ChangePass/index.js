import React, { useState } from 'react';

import styles from './ChangePass.module.scss';
import Validation from './Validation';
import apiService from '../../../Components/ApiService';
import swal from 'sweetalert';

const ChangePass = () => {
    // eslint-disable-next-line no-unused-vars
    const [changePass, setChangePass] = useState({
        oldPass: '',
        newPass: '',
        confirmPass: '',
    });
    const token = localStorage.getItem('token') || null;
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const [error, setError] = useState({});

    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        setChangePass((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        // const errors = validateInfo(editInfo);
        // if (Object.keys(errors).length === 0) {
        //     console.log('No errors. Save the data:', editInfo);
        //     setErrors({});
        // } else {
        //     setErrors(errors);
        //     console.log('Validation errors:', errors);
        // }
    };

    const handleSubmit = async () => {
        const errors = Validation(changePass);
        if (Object.keys(errors).length === 0) {
            console.log('No errors. Save the data:', changePass);
            const data = await apiService.request('post', 'auth/changePass', changePass, headers);
            if (data.responseCode === '200') {
                swal('Success!!', data.message, 'success');
                setChangePass({
                    oldPass: '',
                    newPass: '',
                    confirmPass: '',
                });
            } else {
                swal('Ops!!', data.message, 'warning');
            }
            setError({});
        } else {
            setError(errors);
            console.log('Validation errors:', errors);
        }
    };
    return (
        <>
            <div className={styles.changePassContainer}>
                <div className={styles.loginTitle}>
                    <h1>Đổi mật khẩu mới</h1>
                </div>
                <div className={styles.changePass}>
                    <div className={styles.formGroup}>
                        <input
                            autoFocus={true}
                            type="password"
                            placeholder="Mật khẩu trước đó"
                            className={styles.inputField}
                            value={changePass.oldPass}
                            name="oldPass"
                            onChange={handleChangeValue}
                        />
                        {error.oldPass && <div className={styles.error}>{error.oldPass}</div>}
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            autoFocus={true}
                            type="password"
                            placeholder="Mật khẩu mới"
                            className={styles.inputField}
                            value={changePass.newPass}
                            name="newPass"
                            onChange={handleChangeValue}
                        />
                        {error.newPass && <div className={styles.error}>{error.newPass}</div>}
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="password"
                            placeholder="Xác nhận lại mật khẩu mới"
                            className={styles.inputField}
                            value={changePass.confirmPass}
                            name="confirmPass"
                            onChange={handleChangeValue}
                        />
                        {error.confirmPass && <div className={styles.error}>{error.confirmPass}</div>}
                    </div>
                    <div className={styles.buttonGroup}>
                        <button onClick={handleSubmit} className={styles.loginButton}>
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePass;
