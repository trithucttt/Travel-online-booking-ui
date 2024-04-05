import { Link, useNavigate } from 'react-router-dom';
import { routeKey } from '../pathName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

function Header({ title, subtitle, logo, logoAlt, bgColor, textColor }) {
    const [pageDropdownOpen, setPageDropdownOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    const handlePageDropdown = () => {
        if (userDropdownOpen === true) {
            setPageDropdownOpen(!pageDropdownOpen);
            setUserDropdownOpen(false);
        }
        setPageDropdownOpen(!pageDropdownOpen);
    };

    const handleUserDropdown = () => {
        if (pageDropdownOpen === true) {
            setUserDropdownOpen(!userDropdownOpen);
            setPageDropdownOpen(false);
        }
        setUserDropdownOpen(!userDropdownOpen);
    };
    const handleClickProfile = () => {
        if (role === 'USER') {
            navigate(`${routeKey.profileUser}`);
        }
        if (role === 'BUSINESS') {
            navigate(`${routeKey.profileOther}`);
        }
        if (role === null) {
            alert('Login or Sign up before view Profile');
            navigate(routeKey.login);
        }
    };
    return (
        <header
            className={`flex items-center justify-between bg-cover bg-center h-16 px-4 py-2 ${bgColor} text-white`}
            // style={{ backgroundImage: `url(${logo})` }}
        >
            <div className="flex items-center">
                <Link to="/" className="flex items-center">
                    <img src={logo} alt={logoAlt} className="h-8 w-8 mr-2" />
                    <h1 className={`text-xl font-bold ${textColor}`}>{title}</h1>
                </Link>
                <p className={`ml-4 text-lg ${textColor}`}>{subtitle}</p>
            </div>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link to={routeKey.home} className={`hover:underline ${textColor}`}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <div className="relative">
                            <button
                                onClick={handlePageDropdown}
                                className={`hover:underline ${textColor} focus:outline-none`}
                            >
                                Page
                            </button>
                            {pageDropdownOpen && (
                                <ul
                                    className="absolute mt-2 left-0 space-y-2 bg-black text-white-800 p-2 rounded shadow"
                                    style={{ zIndex: 10 }}
                                >
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
                                </ul>
                            )}
                        </div>
                    </li>
                    <li>
                        <div className="relative">
                            <button
                                onClick={handleUserDropdown}
                                className={`hover:underline ${textColor} focus:outline-none`}
                            >
                                <FontAwesomeIcon icon={faUser} />
                            </button>
                            {userDropdownOpen && (
                                <ul
                                    className="absolute mt-2 left-0 -ml-12 space-y-2 bg-black text-white-800 p-2 rounded shadow"
                                    style={{ zIndex: 10 }}
                                >
                                    {/* Add user-related links here */}
                                    <li>
                                        <button onClick={handleClickProfile} className="flex">
                                            Profile
                                        </button>
                                    </li>
                                    <li>
                                        <Link to={routeKey.settings} className="block">
                                            Settings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={routeKey.logout} className="block">
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

Header.defaultProps = {
    title: 'Travel World',
    subtitle: 'Explore the Future',
    logo: 'https://i.pinimg.com/564x/f2/ea/82/f2ea82db501b3d7429be68ac2a7957cf.jpg',
    logoAlt: 'Travel world Logo',
    bgColor: 'bg-gray-900',
    textColor: 'text-white',
};

export default Header;
