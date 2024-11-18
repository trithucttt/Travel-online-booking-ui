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
import ForgotPass from '../pages/Share/ForgotPass';
// import Chat from '../pages/Share/Chat';
import ProfileUser from '../pages/User/ProfileForRoleUser';
import SearchPage from '../pages/Share/SearchPage';
import ChatApp from '../pages/Share/Chat/ChatApp';
import Feedback from '../pages/Share/FeedBack';
import PrivacyPolicy from '../pages/Share/PrivacyPolicy';
import HelpPage from '../pages/Share/HelpPage';
import FriendsListPage from '../pages/Share/YourFriend';
import Admin from '../pages/Admin';

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
            <Route path={routeKey.profile} element={<ProfileUser />} />
            <Route path={routeKey.profileUser} element={<Profile />} />
            <Route path={routeKey.cart} element={<Cart />} />
            <Route path={routeKey.payment} element={<Payment />} />
            <Route path={routeKey.forgotPass} element={<ForgotPass />} />
            {/* <Route path={'/chat'} element={<Chat />} /> */}
            <Route path={routeKey.searchPage} element={<SearchPage />} />
            <Route path={routeKey.chat} element={<ChatApp />} />
            <Route path={routeKey.feedBack} element={<Feedback />} />
            <Route path={routeKey.policy} element={<PrivacyPolicy />} />
            <Route path={routeKey.help} element={<HelpPage />} />
            <Route path={routeKey.friend} element={<FriendsListPage />} />
            <Route path="page/admin" element={<Admin />} />
        </Routes>
    );
}
export default Routing;
