import React, { useState } from 'react';

import styles from './ChangePass.module.scss';
import Validation from './Validation';

const ChangePass = () => {
    // eslint-disable-next-line no-unused-vars
    const [changePass, setChangePass] = useState({
        oldPass: '',
        newPass: '',
        confirmPass: '',
    });
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

    const handleSubmit = () => {
        const errors = Validation(changePass);
        if (Object.keys(errors).length === 0) {
            console.log('No errors. Save the data:', changePass);
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
                    <h1>Change your password</h1>
                </div>
                <div className={styles.changePass}>
                    <div className={styles.formGroup}>
                        <input
                            autoFocus={true}
                            type="password"
                            placeholder="Old password"
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
                            placeholder="New password"
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
                            placeholder="Confirm new password"
                            className={styles.inputField}
                            value={changePass.confirmPass}
                            name="confirmPass"
                            onChange={handleChangeValue}
                        />
                        {error.confirmPass && <div className={styles.error}>{error.confirmPass}</div>}
                    </div>
                    <div className={styles.buttonGroup}>
                        <button onClick={handleSubmit} className={styles.loginButton}>
                            ConFirm
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePass;
