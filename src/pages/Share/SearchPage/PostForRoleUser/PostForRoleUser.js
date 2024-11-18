import React, { useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import swal from 'sweetalert';
import { formatDateTime } from '../../../../helper/formatDateTime';
import { useNavigate, useParams } from 'react-router-dom';
import { routeKey } from '../../../../Components/pathName';
import EditPostForRoleUser from './EditPost';

const PostForRoleUser = ({ postForRoleUser }) => {
    const navigate = useNavigate();
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [post, setPost] = useState(postForRoleUser);
    const [openPostIndexLightBox, setOpenPostIndexLightBox] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [editPost, setEditPost] = useState('');
    // const { userId } = useParams();
    const currentUserId = localStorage.getItem('userId') || '';
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openLightbox = (imageIndex, tourId) => {
        setCurrentImageIndex(imageIndex);
        setOpenPostIndexLightBox(tourId);
        setLightboxOpen(true);
    };

    const handleDeletePost = () => {
        swal({
            title: 'Bạn có chắc chắn muốn xóa bài viết này?',
            text: 'Sau khi xóa, bạn sẽ không thể khôi phục lại!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                // Thực hiện xóa bài viết tại đây (gọi API xóa hoặc thực hiện hành động xóa)
                swal('Bài viết đã được xóa!', {
                    icon: 'success',
                });
            }
        });
    };

    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    const closeEditPost = () => {
        setIsModalOpen(false);
        setEditPost(null);
    };

    const handleEditPost = (postId) => {
        setEditPost(postId);
        setIsModalOpen(true);
        setOpenDropdown(null);
    };

    return (
        <>
            {post && (
                <div
                    key={post.postId}
                    className="bg-white rounded-lg mt-10 shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-900 relative w-full"
                >
                    <div className="flex items-center">
                        <img
                            src={post.avatarUser}
                            alt={post.fullNameUser}
                            className="w-16 h-16 rounded-full border-2 border-gray-300 mr-4"
                        />
                        <div className="flex-grow">
                            <h2
                                className="text-2xl font-bold cursor-pointer"
                                onClick={() => navigate(`${routeKey.profile.replace(':userId', post.ownerPostId)}`)}
                            >
                                {post.fullNameUser}
                            </h2>
                            <p className="text-gray-600 text-sm">
                                {post.start_time && formatDateTime(post.start_time)}
                            </p>
                            <h3 className="text-xl font-semibold mt-1 cursor-pointer">
                                {post.title.length > 50 ? (
                                    <>
                                        {post.title.slice(0, 50)}...
                                        <span
                                            className="text-blue-500 cursor-pointer"
                                            onClick={() => navigate(`/post/${post.postId}`)}
                                        >
                                            xem thêm
                                        </span>
                                    </>
                                ) : (
                                    post.title
                                )}
                            </h3>
                        </div>
                        {/* Hiển thị nút chỉnh sửa và xóa nếu userId là chủ bài viết */}
                        {currentUserId === post.ownerPostId.toString() && (
                            <div className="absolute top-4 right-4">
                                <button className="focus:outline-none" onClick={() => toggleDropdown(post.postId)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-6 h-6 text-gray-900"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M8 16h8M8 8h8" />
                                    </svg>
                                </button>
                                {/* Dropdown */}
                                {openDropdown === post.postId && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                                        <button
                                            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                                            onClick={() => handleEditPost(post.postId)}
                                        >
                                            Chỉnh sửa
                                        </button>
                                        <button
                                            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                                            onClick={() => handleDeletePost(post.postId)}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex mt-2 p-2">
                        {post.imagePost?.slice(0, 4).map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`TourImage ${index + 1}`}
                                className="w-24 h-24 rounded-lg border-2 border-gray-300 mr-2 cursor-pointer"
                                onClick={() => {
                                    setCurrentImageIndex(index);
                                    openLightbox(index, post.postId);
                                }}
                            />
                        ))}
                        {post.imagePost?.length > 4 && (
                            <div
                                className="w-24 h-24 rounded-lg border-2 border-gray-300 flex items-center justify-center cursor-pointer"
                                onClick={() => {
                                    setCurrentImageIndex(4);
                                    openLightbox(4, post.postId);
                                }}
                            >
                                <span className="text-gray-600 text-2xl">+</span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-end my-1">
                        {Array.from({ length: 5 }, (_, index) => (
                            <svg
                                key={index}
                                className={`w-5 h-5 ${
                                    index < Math.round(post.rateAvg) ? 'text-yellow-500' : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 .587l3.668 7.431 8.168 1.185-5.898 5.73 1.391 8.116L12 18.896l-7.329 3.855 1.391-8.116-5.898-5.73 8.168-1.185z" />
                            </svg>
                        ))}
                        <span className="ml-2 text-gray-600">({post.rateAvg || 0})</span>
                    </div>
                </div>
            )}

            {lightboxOpen && (
                <Lightbox
                    mainSrc={post.imagePost[currentImageIndex]}
                    nextSrc={post.imagePost[(currentImageIndex + 1) % post.imagePost.length]}
                    prevSrc={post.imagePost[(currentImageIndex + post.imagePost.length - 1) % post.imagePost.length]}
                    onCloseRequest={() => setLightboxOpen(false)}
                    onMovePrevRequest={() =>
                        setCurrentImageIndex((currentImageIndex + post.imagePost.length - 1) % post.imagePost.length)
                    }
                    onMoveNextRequest={() => setCurrentImageIndex((currentImageIndex + 1) % post.imagePost.length)}
                />
            )}
            {isModalOpen && <EditPostForRoleUser postId={editPost} onClose={closeEditPost} />}
        </>
    );
};

export default PostForRoleUser;
