import { Route, Navigate, useNavigate, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import { selectUser } from '../store/userSlice';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = useSelector(selectUser);
    const navigate = useNavigate();

    if (!isAuthenticated) {
        swal({
            icon: 'error',
            title: 'Error...',
            text: 'Login Before Visit page',
        }).then((confirmed) => {
            if (confirmed) {
                navigate('/login', { replace: true });
            }
        });
    }

    // Trả về Route với element là Element
    return (
        <Routes>
            <Route {...rest} element={<Element />} />
        </Routes>
    );
};

export default PrivateRoute;
