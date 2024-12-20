import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import { routeKey } from '../../../Components/pathName';
import PostItem from './PostItem';
import PostForRoleUser from '../SearchPage/PostForRoleUser/PostForRoleUser';
function Post({ posts }) {
    // const [showAllImages, setShowAllImages] = useState(false); sử dụng hiển thị all ảnh trên post khi nhấn +
    // const [posts, setPosts] = useState([]);
    const [boxImages, setBoxImages] = useState(false);
    const [currentPostIndex, setCurrentPostIndex] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    const handleDetail = (id) => {
        // alert(id);
        navigate(`${routeKey.detailPost.replace(':id', id)}`);
    };

    const handleRenderOwnerPost = (userId) => {
        // alert(userId);
        navigate(`${routeKey.profileUser.replace(':userId', userId)}`);
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

    /**-------------------------pagination-------------- */
    // const [postPerPage, setPostPage] = useState(1);
    // const totalPage = Math.ceil(posts.length / postPerPage);
    // const indexOfLastPost = currentPage * postPerPage;
    // const indexOfFirstsPost = indexOfLastPost - postPerPage;

    return (
        <>
            {/* <div className={styles.paginationItem}>
                <div className={styles.paginationControl}>
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPage={pagination.totalPage}
                        onPageChange={onChangePage}
                    />
                </div>
                <div className={styles.paginationSize}>
                    <select onChange={(e) => handleChangeTotalPage(e.target.value)}>
                        <option value="3">3</option>
                        <option value="6">6</option>
                        <option value="9">9</option>
                        <option value="12">12</option>
                        <option value="24">24</option>
                    </select>
                </div>
                <div className={styles.sortPost}>
                    <select onChange={(e) => handleSortPost(e.target.value)}>
                        <option value="Default">Default</option>
                        <option value="Price">Price</option>
                        <option value="Name">Name</option>
                    </select>
                </div>
            </div> */}
            <div>
                {posts?.map((item, postIndex) =>
                    item.isBusiness ? (
                        <PostItem
                            item={item}
                            key={item.postId}
                            postIndex={postIndex}
                            formatDateTime={formatDateTime}
                            handleDetail={handleDetail}
                            handleImageClick={handleImageClick}
                            handleRenderOwnerPost={handleRenderOwnerPost}
                        />
                    ) : (
                        <PostForRoleUser postForRoleUser={item} key={item.postId} />
                    ),
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
                    // <Lightbox
                    //     mainSrc={`http://localhost:8086/api/post/${posts[currentPostIndex].imagePost[currentImageIndex]}/image`}
                    //     nextSrc={`http://localhost:8086/api/post/${
                    //         posts[currentPostIndex].imagePost[
                    //             (currentImageIndex + 1) % posts[currentPostIndex].imagePost.length
                    //         ]
                    //     }/image`}
                    //     prevSrc={`http://localhost:8086/api/post/${
                    //         posts[currentPostIndex].imagePost[
                    //             (currentImageIndex + posts[currentPostIndex].imagePost.length - 1) %
                    //                 posts[currentPostIndex].imagePost.length
                    //         ]
                    //     }/image`}
                    //     onCloseRequest={() => setBoxImages(false)}
                    //     onMovePrevRequest={() =>
                    //         setCurrentImageIndex(
                    //             (currentImageIndex + posts[currentPostIndex].imagePost.length - 1) %
                    //                 posts[currentPostIndex].imagePost.length,
                    //         )
                    //     }
                    //     onMoveNextRequest={() =>
                    //         setCurrentImageIndex((currentImageIndex + 1) % posts[currentPostIndex].imagePost.length)
                    //     }
                    // />
                )}
            </div>
        </>
    );
}
export default Post;
