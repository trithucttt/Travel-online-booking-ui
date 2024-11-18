import React, { useState } from 'react';
import styles from './Login.module.scss';
import Validation from './Validation';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../store/userSlice';
import { jwtDecode } from 'jwt-decode';
import { routeKey } from '../../../Components/pathName';
import apiService from '../../../Components/ApiService';
import swal from 'sweetalert';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const validateForm = () => {
        const validationErrors = Validation({ username, password });
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const sendApi = {
                username: username,
                password: password,
            };
            console.log('sendApi:', sendApi);
            const response = await apiService.request('post', 'auth/new/login', sendApi);
            if (response.responseCode === '200') {
                const token = response.data.token;
                const role = response.data.role;
                const parsToken = jwtDecode(token);
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                localStorage.setItem('userId', parsToken.userId);
                localStorage.setItem('username', username);
                dispatch(loginSuccess(parsToken.sub));
                toast.success(response.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    zIndex: 999999,
                });
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                swal('Ops!!!', response.message, 'error');
            }
        }
    };

    return (
        <>
            <div className={styles.buttonHeader}>
                <button className={`${styles.btn} ${styles.btnBack}`} onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faBackward} /> Trở về
                </button>
                <button className={`${styles.btn} ${styles.btnSignUp}`} onClick={() => navigate(routeKey.signup)}>
                    Đăng ký
                </button>
            </div>
            <div className={styles.loginContainer}>
                <div className={styles.loginTitle}>
                    <h1>Đăng nhập tài khoản vào hệ thống</h1>
                    <p>
                        Bạn chưa có tài khoản?
                        <Link className={styles.renderSignUp} to={routeKey.signup}>
                            Đăng lý
                        </Link>
                    </p>
                </div>
                <div className={styles.loginForm}>
                    <form className={styles.formTm} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <Form.Control
                                autoFocus={true}
                                type="text"
                                placeholder="Tên đăng nhập"
                                className={styles.inputField}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {errors.username && <div className={styles.error}>{errors.username}</div>}
                        </div>
                        <div className={styles.formGroup}>
                            <div className={styles.passwordContainer}>
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Mật khẩu"
                                    className={styles.inputField}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    className={styles.eyeIcon}
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            </div>
                            {errors.password && <div className={styles.error}>{errors.password}</div>}
                        </div>
                        <div className={styles.checkboxGroup}>
                            <div className={styles.checkboxContainer}>
                                {/* <input
                                    type="checkbox"
                                    id="rememberCheckbox"
                                    className={styles.checkbox}
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <label className={styles.checkboxLabel}>Nhớ tôi</label> */}
                            </div>
                            <div>
                                <Link to={routeKey.forgotPass} className={styles.forgotPassword}>
                                    Quên mật khẩu?
                                </Link>
                            </div>
                        </div>
                        <div className={styles.buttonGroup}>
                            <button type="submit" className={styles.loginButton}>
                                Đăng nhập
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
