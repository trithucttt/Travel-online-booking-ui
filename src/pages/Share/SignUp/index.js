import React, { useState } from 'react';
import styles from './SignUp.module.scss';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import validateFields from './ValidateSignUp';
import apiService from '../../../Components/ApiService';
import swal from 'sweetalert';
import { routeKey } from '../../../Components/pathName';

const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [register, setRegister] = useState({
        lastName: '',
        firstName: '',
        username: '',
        email: '',
        password: '',
        confirmPass: '',
        role: '',
    });
    const [errors, setErrors] = useState({});
    const [feeMessage, setFeeMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const listError = validateFields(register);
        if (Object.keys(listError).length === 0) {
            const data = await apiService.request('post', 'auth/register', register);
            if (data.responseCode === '200') {
                swal('Success', data.message, 'success');
                setRegister({
                    lastName: '',
                    firstName: '',
                    username: '',
                    email: '',
                    password: '',
                    confirmPass: '',
                    role: '',
                });
            } else {
                swal('Error', data.message, 'error');
            }
        } else {
            setErrors(listError);
        }
    };

    const role = [
        { label: 'Khách hàng', value: 'USER' },
        { label: 'Doanh nghiệp', value: 'BUSINESS' },
    ];

    const handleRoleChange = (selectedOption) => {
        setRegister({
            ...register,
            role: selectedOption.value,
        });

        if (selectedOption.value === 'BUSINESS') {
            swal('Chú ý', 'Bạn sẽ bị tính phí nếu chọn tài khoản doanh nghiệp.', 'warning');
        } else {
            setFeeMessage('');
        }
    };

    return (
        <>
            <div className={styles.buttonHeader}>
                <button className="w-28 h-1/5 rounded-md bg-black text-white" onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faBackward} /> Trở lại
                </button>
                <button className="w-28 h-1/5 rounded-md bg-black text-white" onClick={() => navigate(routeKey.login)}>
                    Đăng nhập
                </button>
            </div>
            <div className="w-full mt-2">
                <div className="text-center mb-5">
                    <h1 className="font-bold">Đăng ký tài khoản</h1>
                    <p>
                        Bạn đã có tài khoản?
                        <Link className="text-cyan-300" to={routeKey.login}>
                            Đăng nhập
                        </Link>
                    </p>
                </div>
                <div className="w-1/2 m-auto">
                    <form className="text-center" onSubmit={handleSubmit}>
                        <div className="flex w-full">
                            <div className="m-1.5 w-1/2">
                                <Form.Control
                                    autoFocus={true}
                                    type="text"
                                    placeholder="Họ"
                                    className="w-full"
                                    value={register.lastName}
                                    onChange={(e) => setRegister({ ...register, lastName: e.target.value })}
                                />
                                {errors.lastName && <div className={styles.error}>{errors.lastName}</div>}
                            </div>
                            <div className="m-1.5 w-1/2">
                                <Form.Control
                                    type="text"
                                    placeholder="Tên"
                                    className="w-full"
                                    value={register.firstName}
                                    onChange={(e) => setRegister({ ...register, firstName: e.target.value })}
                                />
                                {errors.firstName && <div className={styles.error}>{errors.firstName}</div>}
                            </div>
                        </div>

                        <div className="m-1.5">
                            <Form.Control
                                type="text"
                                placeholder="Tên đăng nhập"
                                className="w-full"
                                value={register.username}
                                onChange={(e) => setRegister({ ...register, username: e.target.value })}
                            />
                            {errors.username && <div className={styles.error}>{errors.username}</div>}
                        </div>
                        <div className="m-1.5">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                className="w-full"
                                value={register.email}
                                onChange={(e) => setRegister({ ...register, email: e.target.value })}
                            />
                            {errors.email && <div className={styles.error}>{errors.password}</div>}
                        </div>
                        <div className="m-1.5">
                            <div className={styles.passwordContainer}>
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Mật khẩu"
                                    className={styles.inputField}
                                    value={register.password}
                                    onChange={(e) => setRegister({ ...register, password: e.target.value })}
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    className={styles.eyeIcon}
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            </div>
                            {errors.password && <div className={styles.error}>{errors.password}</div>}
                        </div>
                        <div className="m-1.5">
                            <div className={styles.passwordContainer}>
                                <Form.Control
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Xác nhận lại mật khẩu"
                                    className="w-full"
                                    value={register.confirmPass}
                                    onChange={(e) => setRegister({ ...register, confirmPass: e.target.value })}
                                />
                                <FontAwesomeIcon
                                    icon={showConfirmPassword ? faEyeSlash : faEye}
                                    className={styles.eyeIcon}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                />
                            </div>

                            {errors.confirmPass && <div className={styles.error}>{errors.confirmPass}</div>}
                        </div>
                        <div className="m-1.5">
                            <Select
                                onChange={handleRoleChange}
                                options={role}
                                placeholder="Chọn loại tài khoản"
                                value={role.find((option) => option.value === register.role)}
                            />
                            {errors.role && <div className={styles.error}>{errors.role}</div>}
                            {feeMessage && <div className={styles.feeMessage}>{feeMessage}</div>}
                        </div>
                        <div className="pt-5">
                            <button
                                type="submit"
                                className=" w-full rounded-md bg-cyan-300 font-bold h-8 text-center m-1.5 border-sky-400 text-black hover:bg-cyan-600"
                            >
                                Đăng ký
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;
