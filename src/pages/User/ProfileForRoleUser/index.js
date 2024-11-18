import React, { useEffect, useState } from 'react';
import Posts from '../UserPost';
import OrderHistory from '../HistoryOrder';
import ChangePassword from '../ChangePass';
import EditProfileModal from '../EditInfoModals';
import withHeader from '../../../Components/Layout/withHeader';
import apiService from '../../../Components/ApiService';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';
import PostForRoleUser from '../../Share/SearchPage/PostForRoleUser/PostForRoleUser';

function ProfileUser() {
    const [activeTab, setActiveTab] = useState('posts');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem('token') || null;
    const [user, setUser] = useState({});
    const { userId } = useParams();
    const [friends, setFriends] = useState([]);
    const currentUserId = localStorage.getItem('userId') || '';

    const fetchFriends = async () => {
        try {
            const response = await apiService.request('get', `auth/friends/${currentUserId}`);
            setFriends(response);
        } catch (error) {
            swal('Lỗi lấy danh sách bạn bè', 'Có lỗi xảy ra khi lấy danh sách bạn bè' + error, 'error');
        }
    };

    const fetchInfoUser = async () => {
        try {
            const response = await apiService.request('get', `auth/profile/${userId}`);
            setUser(response);
        } catch (error) {
            swal('Lỗi lấy thông tin người dùng', 'Có lỗi xảy ra khi lấy thông tin' + error, 'erroe');
        }
    };

    const fetchPostOwner = async () => {
        try {
            const data = await apiService.request('get', `post/${userId}`);
            setPosts(data);
        } catch (error) {}
    };

    const isFriend = () => {
        return friends.some((friend) => friend.userId === parseInt(userId));
    };

    useEffect(() => {
        fetchInfoUser();
        fetchPostOwner();
        fetchFriends();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 'posts':
                return posts?.map((item) => <PostForRoleUser postForRoleUser={item} key={item.postId} />);
            case 'orderHistory':
                return <OrderHistory />;
            case 'changePassword':
                return <ChangePassword />;
            default:
                return null;
        }
    };

    const handleEditProfile = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveProfile = (updatedUser) => {
        setUser(updatedUser);
        setIsEditModalOpen(false);
        // Call API to save the user info
        // fetch('/api/saveUser', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(updatedUser),
        // });
    };

    return (
        <div className="container mx-auto h-screen w-full p-4">
            <div className="grid grid-cols-3 gap-4">
                {/* Left column with avatar */}
                <div className="col-span-1 flex flex-col items-center">
                    <img alt="avatar" src={user.avatarUser} className="h-80 w-80 object-cover rounded-full" />
                </div>

                {/* Right column with user information */}
                <div className="col-span-2 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-2">
                        {user.firstName} {user.lastName}
                    </h1>
                    <p className="text-xl mb-2">{user.email}</p>
                    <p className="text-xl mb-2">{user.address}</p>
                    <div className="flex space-x-4">
                        <button onClick={handleEditProfile} className="px-4 py-2 bg-blue-500 text-white rounded">
                            Chỉnh sửa
                        </button>
                        {token && parseInt(currentUserId) !== parseInt(userId) && (
                            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded">
                                {isFriend() ? 'Đã là bạn bè' : 'Kết bạn'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-10 border-b border-gray-300">
                <ul className="flex space-x-8 justify-center">
                    <li
                        className={`pb-2 cursor-pointer select-none ${
                            activeTab === 'posts' ? 'border-b-2 border-blue-500' : ''
                        }`}
                        onClick={() => setActiveTab('posts')}
                    >
                        Bài đăng
                    </li>
                    <li
                        className={`pb-2 cursor-pointer select-none ${
                            activeTab === 'orderHistory' ? 'border-b-2 border-blue-500' : ''
                        }`}
                        onClick={() => setActiveTab('orderHistory')}
                    >
                        Lịch sử đặt vé
                    </li>
                    <li
                        className={`pb-2 cursor-pointer select-none ${
                            activeTab === 'changePassword' ? 'border-b-2 border-blue-500' : ''
                        }`}
                        onClick={() => setActiveTab('changePassword')}
                    >
                        Đổi mật khẩu
                    </li>
                </ul>
            </div>

            {/* Content under tabs */}
            <div className="mt-6">{renderContent()}</div>
            {isEditModalOpen && <EditProfileModal user={user} onClose={handleCloseModal} onSave={handleSaveProfile} />}
        </div>
    );
}

export default withHeader(ProfileUser);
