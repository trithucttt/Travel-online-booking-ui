import React, { useState } from 'react';

import styles from './SignUp.module.scss';
// import Validation from './Validation';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();
    const [register, setRegister] = useState({
        username: '',
        email: '',
        password: '',
        conformPass: '',
    });
    const [errors] = useState({});

    // const validateForm = () => {
    //     // const validationErrors = Validation({ username, password });
    //     // setErrors(validationErrors);
    //     // return Object.keys(validationErrors).length === 0;
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Register Info:', register);
        const sendApi = {
            username: register.username,
            email: register.email,
            password: register.password,
        };

        // console.log(sendApi);
        try {
            const response = await axios.post('http://localhost:8086/api/auth/register', sendApi);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className={styles.buttonHeader}>
                <button className={`${styles.btn} ${styles.btnBack}`} onClick={() => navigate('/')}>
                    <FontAwesomeIcon icon={faBackward} /> Back
                </button>
                <button className={`${styles.btn} ${styles.btnSignUp}`} onClick={() => navigate('/login')}>
                    Login
                </button>
            </div>
            <div className={styles.signupContainer}>
                <div className={styles.signupTitle}>
                    <h1>Register a new account</h1>
                    <p>
                        Do you already have an account?
                        <Link className={styles.renderSignUp} to={'/login'}>
                            Login
                        </Link>
                    </p>
                </div>
                <div className={styles.signupForm}>
                    <form className={styles.formTm} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <Form.Control
                                autoFocus={true}
                                type="text"
                                placeholder="Username"
                                className={styles.inputField}
                                value={register.username}
                                onChange={(e) => setRegister({ ...register, username: e.target.value })}
                            />
                            {errors.username && <div className={styles.error}>{errors.username}</div>}
                        </div>
                        <div className={styles.formGroup}>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                className={styles.inputField}
                                value={register.email}
                                onChange={(e) => setRegister({ ...register, email: e.target.value })}
                            />
                            {errors.email && <div className={styles.error}>{errors.password}</div>}
                        </div>
                        <div className={styles.formGroup}>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                className={styles.inputField}
                                value={register.password}
                                onChange={(e) => setRegister({ ...register, password: e.target.value })}
                            />
                            {errors.password && <div className={styles.error}>{errors.password}</div>}
                        </div>
                        <div className={styles.formGroup}>
                            <Form.Control
                                type="password"
                                placeholder="Conform Password"
                                className={styles.inputField}
                                value={register.conformPass}
                                onChange={(e) => setRegister({ ...register, conformPass: e.target.value })}
                            />
                            {errors.conformPass && <div className={styles.error}>{errors.password}</div>}
                        </div>

                        <div className={styles.buttonGroup}>
                            <button type="submit" className={styles.signupButton}>
                                Signup
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;
