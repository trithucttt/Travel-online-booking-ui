import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Share/Home';
import Login from '../pages/Share/Login';
import Post from '../pages/Share/ListPost';
import DetailPost from '../pages/Share/DetailPost';
import BusinessPage from '../pages/Business/BusinessPage';
import SignUp from '../pages/Share/SignUp';
import ProductDetails from '../pages/Share/DetailPost/DetailTours';
import { routeKey } from '../Components/pathName';
import ProfileUser from '../pages/User/Profile';
import Cart from '../pages/User/Cart';
import Profile from '../pages/Business/Profile';

function Routing() {
    return (
        <Routes>
            <Route path={routeKey.home} exact element={<Home />} />
            <Route path={routeKey.login} exact element={<Login />} />
            <Route path={routeKey.ListPost} exact element={<Post />} />
            <Route path={routeKey.detailPost} element={<DetailPost />} />
            {/* <Route path="/pageOwnerPost/:id" element={<DetailPost />} /> */}
            <Route path={routeKey.profileOther} element={<BusinessPage />} />
            <Route path={routeKey.signup} element={<SignUp />} />
            <Route path={routeKey.detailTour} element={<ProductDetails />} />
            <Route path={routeKey.profileUser} element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    );
}
export default Routing;
