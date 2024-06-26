import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './header.module.scss';
import useClickOutSide from './useClickOutSide';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faBars, faCartShopping, faClose } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { routeKey } from '../pathName';
import { Tooltip } from 'react-tooltip';
import { useEffect, useState } from 'react';
import apiService from '../ApiService';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/userSlice';
function Header() {
    const { showDropdown, setShowDropdown, dropdownRef } = useClickOutSide();
    const [checkCurrentUser, setCheckCurrentUser] = useState(false);
    const [imageUser, setImageUser] = useState('');
    const token = localStorage.getItem('token') || null;
    const role = localStorage.getItem('role') || null;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticate = useSelector((state) => state.user.isAuthenticated);
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    useEffect(() => {
        const fetchAvatarUser = async () => {
            if (token != null) {
                setCheckCurrentUser(true);
                const data = await apiService.request('get', 'auth/image', null, headers);
                setImageUser(data);
                console.log(data);
            }
            if (token == null) setCheckCurrentUser(false);
        };
        fetchAvatarUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const checkRole = () => {
        if (role === 'BUSINESS') {
            return false;
        } else {
            return true;
        }
    };
    const handleLogOut = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setTimeout(() => {
            navigate(routeKey.login);
        }, 1000);
    };
    const handleClickCart = () => {
        console.log('isAuthenticate', isAuthenticate);
        if (isAuthenticate) {
            navigate(routeKey.cart);
        } else {
            swal({
                icon: 'error',
                title: 'Error...',
                text: 'Login Before Visit page',
                buttons: true,
            }).then((confirmed) => {
                if (confirmed) {
                    navigate(routeKey.login);
                } else {
                    swal('Cancelled', 'Cancel ', 'info');
                }
            });
        }
    };
    return (
        <>
            <header className={styles.container}>
                <div>
                    <img
                        className={styles.logo}
                        src="https://intphcm.com/data/upload/logo-the-thao-dep.jpg"
                        alt="travel"
                        onClick={() => navigate(routeKey.home)}
                        data-tooltip-id="open-home"
                        data-tooltip-place="top"
                        data-tooltip-content="Navigate homePage"
                    />
                    <Tooltip id="open-home" />
                </div>
                <div className={styles.menu}>
                    <div>
                        {checkCurrentUser && checkCurrentUser ? (
                            <img
                                alt="avatar user"
                                data-tooltip-id="open-profile"
                                data-tooltip-place="top"
                                data-tooltip-content="Profile"
                                src={imageUser}
                                className={styles.avatarUser}
                                onClick={() => navigate(routeKey.profileOwner)}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faUserCircle}
                                data-tooltip-id="open-profile"
                                data-tooltip-place="top"
                                data-tooltip-content="Profile"
                                className={styles.iconUser}
                                onClick={() => {
                                    swal({
                                        title: 'Login now',
                                        text: 'Login after view your Profile',
                                        icon: 'warning',
                                        buttons: true,
                                    }).then((willDelete) => {
                                        if (willDelete) {
                                            navigate(routeKey.login);
                                        } else {
                                            swal('Cancelled', 'Cancel ', 'info');
                                        }
                                    });
                                }}
                            />
                        )}

                        <Tooltip id="open-profile" />
                    </div>
                    <div>
                        {checkRole(role) && (
                            <>
                                <FontAwesomeIcon
                                    icon={faCartShopping}
                                    data-tooltip-id="open-profile"
                                    data-tooltip-place="top"
                                    data-tooltip-content="Cart"
                                    className={styles.cart}
                                    onClick={handleClickCart}
                                />
                                <Tooltip id="open-cart" />
                            </>
                        )}
                    </div>
                    <button onClick={() => setShowDropdown(!showDropdown)} ref={dropdownRef} className={styles.btnMenu}>
                        <FontAwesomeIcon
                            icon={faBars}
                            className={styles.iconMenuBar}
                            data-tooltip-id="open-menu"
                            data-tooltip-place="top"
                            data-tooltip-content="Open menu"
                        />
                        <Tooltip id="open-menu" />
                    </button>
                </div>
                <div className={`${styles.listMenu} ${showDropdown ? styles.active : ''}`}>
                    <div>
                        <FontAwesomeIcon
                            icon={faClose}
                            className={styles.iconClose}
                            data-tooltip-id="close-menu"
                            data-tooltip-place="top"
                            data-tooltip-content="Close "
                        />
                        <Tooltip id="close-menu" />
                    </div>
                    <ul>
                        <li>
                            <Link to={routeKey.login} className="block">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to={routeKey.signup} className="block">
                                Signup
                            </Link>
                        </li>

                        <li>
                            <Link to="/" className="block">
                                About
                            </Link>
                        </li>
                        <li>
                            <div onClick={handleLogOut} className="block cursor-pointer">
                                Logout
                            </div>
                        </li>
                    </ul>
                </div>

                <div className={`${styles.overlay} ${showDropdown ? styles.overlayActive : ''}`}></div>
            </header>
        </>
    );
}

export default Header;
