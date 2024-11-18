import React, { useState } from 'react';

import styles from './ForgotPass.module.scss';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

import { routeKey } from '../../../Components/pathName';
import apiService from '../../../Components/ApiService';
import swal from 'sweetalert';
const ForgotPass = () => {
    const navigate = useNavigate();
    const [forGotPass, setForGotPass] = useState({
        email: '',
        otpCode: '',
    });
    const [errors, setErrors] = useState({
        emailValid: '',
        otpCodeValid: '',
    });
    const [controlButton, setControlButton] = useState(false);
    const handleConfirmMail = async () => {
        if (!forGotPass.email) {
            setErrors({ ...errors, emailValid: 'Email is required.' });
        } else if (!/\S+@\S+\.\S+/.test(forGotPass.email)) {
            setErrors({ ...errors, emailValid: 'Email address is invalid.' });
        } else {
            setErrors({ ...errors, emailValid: '' });
            const data = await apiService.request('get', 'auth/forgot/checkMail', null, null, {
                email: forGotPass.email,
            });
            if (data.responseCode === '200') {
                swal('Success', data.message, 'success');
                console.log(forGotPass);
                setControlButton(true);
            } else {
                swal('Error', data.message, 'error');
            }
        }
    };
    const handleSubmit = async (e) => {
        if (!forGotPass.otpCode) {
            setErrors({ ...errors, otpCodeValid: 'Otp Code is required.' });
        } else {
            setErrors({ ...errors, emailValid: '' });
            const data = await apiService.request('get', 'auth/forgot/checkCode', null, null, {
                email: forGotPass.email,
                otpCode: forGotPass.otpCode,
            });
            if (data.responseCode === '200') {
                swal('Success', data.message, 'success');
                setTimeout(() => {
                    navigate(routeKey.login);
                }, 400);
            } else {
                swal('Error', data.message, 'error');
            }
        }
    };
    return (
        <>
            <div className={styles.buttonHeader}>
                <button className={`${styles.btn} ${styles.btnBack}`} onClick={() => navigate(routeKey.login)}>
                    <FontAwesomeIcon icon={faBackward} /> Hủy
                </button>
            </div>
            <div className={styles.loginContainer}>
                <div className={styles.loginTitle}>
                    <h1>Quên mật khẩu</h1>
                </div>
                <div className={styles.loginForm}>
                    <div className={styles.formTm}>
                        <div className={styles.formGroup}>
                            <Form.Control
                                autoFocus={true}
                                disabled={controlButton}
                                type="email"
                                placeholder="Nhập địa chỉ mail của bạn"
                                className={styles.inputField}
                                value={forGotPass.email}
                                onChange={(e) => setForGotPass({ ...forGotPass, email: e.target.value })}
                            />
                            {errors.emailValid && <div className={styles.error}>{errors.emailValid}</div>}
                        </div>
                        {controlButton && (
                            <div className={styles.formGroup}>
                                <Form.Control
                                    type="text"
                                    placeholder="Mã OTP"
                                    className={styles.inputField}
                                    value={forGotPass.otpCode}
                                    onChange={(e) => setForGotPass({ ...forGotPass, otpCode: e.target.value })}
                                />
                                {errors.otpCodeValid && <div className={styles.error}>{errors.otpCodeValid}</div>}
                            </div>
                        )}

                        <div className={styles.buttonGroup}>
                            {!controlButton && (
                                <button onClick={handleConfirmMail} className={styles.loginButton}>
                                    Xác nhận
                                </button>
                            )}
                            {controlButton && (
                                <button onClick={handleSubmit} className={styles.loginButton}>
                                    Gửi
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPass;
