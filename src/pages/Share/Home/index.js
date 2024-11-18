import React, { useEffect, useState } from 'react';
import withLayout from '../../../Components/Layout/withLayout';
import Search from '../Search';
import Post from '../ListPost';
import Banner from './Banner';
import Sidebar from '../../../Components/Layout/sideBar';
import FriendsList from '../FriendList';
import apiService from '../../../Components/ApiService';

function Home({ isSidebarVisible, toggleSidebar }) {
    const [posts, setPosts] = useState([]);
    const [searchPost, setSearchPost] = useState('');
    localStorage.removeItem('listCartItems');
    const searchAndPagination = async () => {
        try {
            const data = await apiService.request(
                'get',
                'post/search',
                null,
                {},
                {
                    title: '',
                    size: 5,
                    currentPage: 1,
                },
            );
            setPosts(data.data);
            // console.log(data.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        searchAndPagination();
    }, []);

    const handleSearchPost = () => {
        searchAndPagination();
    };
    return (
        <div className="flex flex-col md:flex-row h-screen">
            <Sidebar
                isVisible={isSidebarVisible}
                toggleSidebar={toggleSidebar}
                className="w-full md:w-1/6 shadow-slate-300"
            />
            <div className="flex flex-col w-full md:w-4/6 overflow-y-auto no-scrollbar">
                <div className="relative">
                    <Banner />
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg">
                        <Search onSearch={setSearchPost} />
                    </div>
                </div>
                <div className="p-4 mt-36">
                    <Post posts={posts} />
                </div>
            </div>
            <FriendsList className="hidden md:block w-full md:w-1/6 z-30" />
        </div>
    );
}

export default withLayout(Home);
