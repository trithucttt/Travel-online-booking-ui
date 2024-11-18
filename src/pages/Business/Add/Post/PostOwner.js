import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faLocationDot, faSearch, faStar, faTag } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import { VND } from '../../../../helper/index';
import Lightbox from 'react-image-lightbox';
import styles from './ListPost.module.scss';
import AddPost from './index';
import { routeKey } from '../../../../Components/pathName';
import apiService from '../../../../Components/ApiService';
import EditPostPopup from './EditPostPopup';
import { LoadingPopup } from '../../../../Components/Loading/LoadingPopup';
function PostOwner({ userId, checkUser }) {
    const [boxImages, setBoxImages] = useState(false);
    const [currentPostIndex, setCurrentPostIndex] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [addPost] = useState(true);
    const [posts, setPosts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(null);
    // console.log('post get userId', userId);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [editTitlePost, setEditTitlePost] = useState('');
    const [loading, setLoading] = useState(false);
    const fetchPostOwner = async () => {
        const data = await apiService.request('get', `post/${userId}`);
        setPosts(data);
    };
    useEffect(() => {
        fetchPostOwner();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const navigate = useNavigate();
    const handleDetail = (id) => {
        navigate(`/post/detail/${id}`);
    };

    const handleRenderOwnerPost = (userId) => {
        alert(userId);
        navigate(`${routeKey.profileOther.replace(':userId', userId)}`);
    };

    const handleImageClick = (postIndex, imageIndex) => {
        setCurrentPostIndex(postIndex);
        setCurrentImageIndex(imageIndex);
        setBoxImages(true);
    };
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        return new Intl.DateTimeFormat('vi-VN', options).format(date).replace(/\./g, '/');
    };

    const handleSearchPost = () => {};

    const toggleDropdown = (index) => {
        setDropdownVisible(dropdownVisible === index ? null : index);
    };

    const handleEditPost = (postId, title) => {
        setSelectedPost(postId);
        setEditTitlePost(title);
        setIsEditPopupOpen(true);
    };

    const handleDeletePost = async (postId) => {
        const confirmed = await swal({
            title: 'Bạn có chắc muốn xóa?',
            text: 'Khi xóa, Bạn sẽ không thể phục hồi lại!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        });

        if (confirmed) {
            setLoading(true);
            try {
                const response = await apiService.request('put', `business/post/delete/${postId}`);

                if (response.responseCode === '200') {
                    // Xóa thành công, cập nhật danh sách bài đăng
                    swal('Thành công!', 'Bài đăng đã được xóa.', 'success');
                } else {
                    // Xóa thất bại
                    swal('Error!', 'Xóa bài đăng thất bại.', 'error');
                }
            } catch (error) {
                // console.error('Failed to delete post:', error);
                swal('Lỗi!', 'Xóa bài đăng thất bại.', 'error');
            } finally {
                setLoading(false);
                fetchPostOwner();
            }
        }
    };

    const handleSave = async (updatePost) => {
        // alert('Click save!');
        console.log(updatePost);
        setLoading(true);
        try {
            const data = await apiService.request('post', 'business/post/edit', updatePost);
            if (data.responseCode === '200') {
                swal('Success', data.message, 'success');
            } else if (data.responseCode === '201' || data.responseCode === '204') {
                swal('Warning', data.message, 'warning');
            } else {
                swal('Error', data.message, 'error');
            }
        } catch (error) {
            swal('Error', 'Có lỗi khi chỉnh sửa bài đăng', 'error');
        } finally {
            setLoading(false);
            fetchPostOwner();
        }
    };
    return (
        <>
            <div className="flex items-center justify-center my-4">
                <input
                    className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
                    value={searchValue}
                    placeholder="Search"
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button
                    onClick={handleSearchPost}
                    className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            {addPost && addPost ? (
                <div>
                    {posts &&
                        posts.map((item, postIndex) => (
                            <div className={styles.framePost} key={item.postId}>
                                <div className={styles.postHeader}>
                                    <div className={styles.imageOwnerPost}>
                                        <img className={styles.imageUser} src={item.avatarUser} alt="userAvatar" />
                                    </div>
                                    <div
                                        className={styles.NameOwnerPost}
                                        onClick={() => handleRenderOwnerPost(item.ownerPostId)}
                                    >
                                        <h4>{item.fullNameUser}</h4>
                                        <p>{formatDateTime(item.start_time)}</p>
                                    </div>
                                    {/* nút menu cho dropdown */}
                                    {checkUser && (
                                        <div className={styles.dropdown}>
                                            <button onClick={toggleDropdown}>
                                                <FontAwesomeIcon icon={faEllipsis} />
                                            </button>
                                            {dropdownVisible && (
                                                <div className={styles.dropdownContent}>
                                                    <button onClick={() => handleEditPost(item.postId, item.title)}>
                                                        Chỉnh sửa
                                                    </button>
                                                    <button onClick={() => handleDeletePost(item.postId)}>Xóa</button>
                                                    {/* <button>aaaaa</button> */}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className={styles.postBody}>
                                    <div className={styles.postImage}>
                                        {item.imagePost.slice(0, 3).map((image, imageIndex) => (
                                            <img
                                                key={imageIndex}
                                                // src={`http://localhost:8086/api/post/${image}/image`}
                                                src={image}
                                                alt="post-Images"
                                                className={styles.itemImage}
                                                onClick={() => handleImageClick(postIndex, imageIndex)}
                                            />
                                        ))}
                                        {item.imagePost.length > 3 && (
                                            <div
                                                className={styles.showAllButton}
                                                onClick={() => handleImageClick(postIndex, 3)}
                                            >
                                                +{item.imagePost.length - 3}
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.postInfo} onClick={() => handleDetail(item.postId)}>
                                        <div className={styles.baseInfo}>
                                            <h2 className={styles.titlePost}>{item.title}</h2>
                                            <div>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        className={styles.rating}
                                                        key={star}
                                                        // onClick={() => handleRatingChange(star)}
                                                        style={{
                                                            cursor: 'pointer',
                                                            color: star <= item.rate ? 'gold' : 'gray',
                                                        }}
                                                    >
                                                        {/* &#9733; */}
                                                        <FontAwesomeIcon icon={faStar} />
                                                    </span>
                                                ))}
                                            </div>
                                            <div className={styles.tagDiscount}>
                                                <FontAwesomeIcon icon={faTag} />
                                                {0.25 * 100 + '%'} SALE END OF {format(new Date(), 'dd MMM, yyyy')}
                                            </div>
                                            <p className={styles.addressInfo}>
                                                <FontAwesomeIcon icon={faLocationDot} />
                                                VIET NAM
                                            </p>
                                        </div>
                                        <div className={styles.destinationPost}>
                                            <p>Include tour: </p>
                                            <ul>
                                                {item.tourDtoList.map((des, index) => (
                                                    <li key={index}>{des.titleTour}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className={styles.tagDiscount}>
                                            <FontAwesomeIcon icon={faTag} />
                                            {0.25 * 100 + '%'} SALE END OF {format(new Date(), 'dd MMM, yyyy')}
                                        </div>
                                    </div>
                                    <div className={styles.postRating} onClick={() => handleDetail(item.id)}>
                                        <div className={styles.baseRating}>
                                            <div>
                                                <div>Excellent</div>
                                                <div>450 reviews</div>
                                            </div>
                                            {/* <div>{item.ratingAvg}</div> */}
                                        </div>
                                        <div className={styles.discount}>
                                            {item.discount && item.discount !== 0 && (
                                                <div className={styles.labelDiscount}>{2.5 * 100}% OFF TODAY</div>
                                            )}
                                            <p className={styles.currentPrice}>{VND.format(item.price)}</p>
                                            <p className={styles.priceDiscoun}>
                                                {VND.format(item.price - (item.price * 25) / 100)}
                                            </p>
                                            <p className={styles.serviceDiscount}>+ FEE CANCELLATION</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    {isEditPopupOpen && selectedPost && (
                        <EditPostPopup
                            isOpen={isEditPopupOpen}
                            closeModal={() => setIsEditPopupOpen(false)}
                            postId={selectedPost}
                            titlePost={editTitlePost}
                            handleSave={handleSave}
                        />
                    )}

                    {boxImages && currentPostIndex !== null && (
                        <Lightbox
                            mainSrc={posts[currentPostIndex].imagePost[currentImageIndex]}
                            nextSrc={
                                posts[currentPostIndex].imagePost[
                                    (currentImageIndex + 1) % posts[currentPostIndex].imagePost.length
                                ]
                            }
                            prevSrc={
                                posts[currentPostIndex].imagePost[
                                    (currentImageIndex + posts[currentPostIndex].imagePost.length - 1) %
                                        posts[currentPostIndex].imagePost.length
                                ]
                            }
                            onCloseRequest={() => setBoxImages(false)}
                            onMovePrevRequest={() =>
                                setCurrentImageIndex(
                                    (currentImageIndex + posts[currentPostIndex].imagePost.length - 1) %
                                        posts[currentPostIndex].imagePost.length,
                                )
                            }
                            onMoveNextRequest={() =>
                                setCurrentImageIndex((currentImageIndex + 1) % posts[currentPostIndex].imagePost.length)
                            }
                        />
                    )}
                </div>
            ) : (
                <AddPost />
            )}
            <LoadingPopup isLoading={loading} />
        </>
    );
}
export default PostOwner;
