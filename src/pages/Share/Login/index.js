import React, { useState } from 'react';

import styles from './Login.module.scss';
import Validation from './Validation';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const validationErrors = Validation({ username, password });
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Username:', username);
            console.log('Password:', password);
            console.log('Remember me:', rememberMe);
            const sendApi = {
                username: username,
                password: password,
            };
            console.log('sendApi:', sendApi);
            try {
                const response = await axios.post('http://localhost:8086/api/auth/login', sendApi);
                console.log(response.data);
                const responseData = response.data;
                // console.log('responseData', responseData);
                const token = responseData.Data.token;
                const role = responseData.Data.role;
                console.log('token data', token);
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                toast.success('Login successfully');
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <>
            <div className={styles.buttonHeader}>
                <button className={`${styles.btn} ${styles.btnBack}`} onClick={() => navigate('/')}>
                    <FontAwesomeIcon icon={faBackward} /> Back
                </button>
                <button className={`${styles.btn} ${styles.btnSignUp}`} onClick={() => navigate('/signup')}>
                    Sign Up
                </button>
            </div>
            <div className={styles.loginContainer}>
                <div className={styles.loginTitle}>
                    <h1>Login to your account</h1>
                    <p>
                        Don't have an account yet?
                        <Link className={styles.renderSignUp} to={'/signup'}>
                            SignUp
                        </Link>
                    </p>
                </div>
                <div className={styles.loginForm}>
                    <form className={styles.formTm} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <Form.Control
                                autoFocus={true}
                                type="text"
                                placeholder="Username"
                                className={styles.inputField}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {errors.username && <div className={styles.error}>{errors.username}</div>}
                        </div>
                        <div className={styles.formGroup}>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                className={styles.inputField}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <div className={styles.error}>{errors.password}</div>}
                        </div>
                        <div className={styles.checkboxGroup}>
                            <div className={styles.checkboxContainer}>
                                <input
                                    type="checkbox"
                                    id="rememberCheckbox"
                                    className={styles.checkbox}
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <label className={styles.checkboxLabel}>Remember me</label>
                            </div>
                            <div>
                                <Link className={styles.forgotPassword}>Forgot your password?</Link>
                            </div>
                        </div>
                        <div className={styles.buttonGroup}>
                            <button type="submit" className={styles.loginButton}>
                                Login
                            </button>
                            <Link className={styles.loginWithLink}>Login with?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
