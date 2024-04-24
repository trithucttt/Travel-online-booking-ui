import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Share/Home';
import Login from '../pages/Share/Login';
import Post from '../pages/Share/ListPost';
import DetailPost from '../pages/Share/DetailPost';
import SignUp from '../pages/Share/SignUp';
import ProductDetails from '../pages/Share/DetailPost/DetailTours';
import { routeKey } from '../Components/pathName';

import Cart from '../pages/User/Cart';
import Profile from '../pages/Business/Profile';
import Payment from '../pages/User/Payment';
import { useSelector } from 'react-redux';

function Routing() {
    // eslint-disable-next-line no-unused-vars
    const isAuthenticate = useSelector((state) => state.user.isAuthenticated);
    return (
        <Routes>
            <Route path={routeKey.home} exact element={<Home />} />
            <Route path={routeKey.login} exact element={<Login />} />
            <Route path={routeKey.ListPost} exact element={<Post />} />
            <Route path={routeKey.detailPost} element={<DetailPost />} />
            <Route path={routeKey.signup} element={<SignUp />} />
            <Route path={routeKey.detailTour} element={<ProductDetails />} />
            <Route path={routeKey.profileUser} element={<Profile />} />
            <Route path={routeKey.profileOwner} element={<Profile />} />
            <Route path={routeKey.cart} element={<Cart />} />
            <Route path={routeKey.payment} element={<Payment />} />
        </Routes>
    );
}
export default Routing;
