import React, { useEffect, useRef, useState } from 'react';
import styles from './DetailPost.module.scss';

import withHeader from '../../../Components/Layout/withHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faPlane, faStar, faTag } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Tours from './Tours';
import RatingPopup from '../SearchPage/RatingItems';
import CommentPopup from './CommentForPost';
import apiService from '../../../Components/ApiService';

function DetailPost() {
    const location = useLocation();
    const exploreMoreRef = useRef(null);
    const [scrollDown, setScrollDown] = useState(false);
    const [detailData, setDetailData] = useState([]);
    const [ratingModalIsOpen, setRatingModalIsOpen] = useState(false);
    const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const postId = parseInt(id, 10);
    useEffect(() => {
        // const handleScroll = () => {
        //     setScrollDown(window.scrollY > 0);
        // };
        // window.addEventListener('scroll', handleScroll);
        // return () => {
        //     window.removeEventListener('scroll', handleScroll);
        // };
    }, []);
    useEffect(() => {
        // if (location.hash === '#exploreMore' && exploreMoreRef.current) {
        //     exploreMoreRef.current.scrollIntoView({ behavior: 'smooth' });
        // }
    }, [location.hash, scrollDown]);

    const fetchComment = async () => {
        try {
            const data = await apiService.request('get', `comment/list/${postId}`);
            setComments(data);
            // console.log('Fetch comment', data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDetailPost = async () => {
        try {
            const postId = parseInt(id, 10);
            console.log(typeof postId);
            // const data = await apiService.request('get', `post/detail/${postId}`);
            const response = await axios.get(`http://localhost:8086/api/post/detail/${postId}`);
            // console.log(response.data);
            setDetailData(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchDetailPost();
        fetchComment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openRatingModal = () => {
        setRatingModalIsOpen(true);
    };

    const closeRatingModal = () => {
        setRatingModalIsOpen(false);
    };

    const handleRate = (newRating) => {
        // console.log('New Rating:', newRating);
        closeRatingModal();
    };

    const countCommentsAndReplies = (comments) => {
        return comments.reduce((total, comment) => {
            const replyCount = comment.replies ? countCommentsAndReplies(comment.replies) : 0;
            return total + 1 + replyCount; // +1 là comment hiện tại
        }, 0);
    };

    const totalCommentsAndReplies = countCommentsAndReplies(comments);
    return (
        <div className={styles.postDetail}>
            <div className={styles.detailHeader}>
                <div className={styles.headerContent}>
                    <div className={styles.ownerPost}>
                        <div className={styles.imageOwnerPost}>
                            {/* <ReactImageTooltip src={detailData.avatarUser} effect="solid" place="left"> */}
                            <img
                                className={styles.imageUser}
                                src={detailData.avatarUser}
                                // src="https://i.pinimg.com/564x/1a/84/35/1a8435b262f70dc441a52bf15a9c620d.jpg"
                                alt="userAvatar"
                            />
                            {/* </ReactImageTooltip> */}
                        </div>
                        <div className={styles.NameOwnerPost}>
                            <h3>{detailData.fullNameUser}</h3>
                        </div>
                    </div>
                    <div className={styles.titleContent}>
                        <h1> {detailData.title}</h1>
                        <div className={styles.tagDiscount}>
                            <FontAwesomeIcon icon={faTag} />
                            {0.02 * 100 + '%'} Giảm giá hot
                            {/* {format(detailData.end_time, 'dd MMM, yyyy')} */}
                        </div>
                    </div>
                    <div className={styles.contentItems}>
                        <div className={styles.divBorder}>
                            <div className={styles.totalTour}>
                                <FontAwesomeIcon icon={faPlane} />
                                {detailData?.tourDtoList && <h2> {detailData?.tourDtoList.length}</h2>}
                                <p>Chuyến đi</p>
                            </div>
                        </div>
                        <div className={styles.divBorder}>
                            <div className={styles.avgRating} onClick={openRatingModal}>
                                <FontAwesomeIcon icon={faStar} />
                                <h2> 4.5</h2>
                                <p>Đánh giá</p>
                            </div>
                        </div>
                        <div className={styles.divBorder}>
                            <div className={styles.totalComment} onClick={() => setIsCommentPopupOpen(true)}>
                                <FontAwesomeIcon icon={faComment} />
                                {/* <h2>{totalCommentsAndReplies}</h2> */}
                                <h2>1000</h2>
                                <p>Bình luận</p>
                            </div>
                        </div>
                    </div>
                    <button
                        className={styles.btnExplore}
                        onClick={() => {
                            // navigate('#exploreMore');
                            setScrollDown(!scrollDown);
                        }}
                    >
                        Nhiều hơn
                    </button>
                </div>
                {/* <div className={styles.headerImages}>
                    <div className={styles.imageRow}>
                        {detailData.imagePost.slice(0, 5).map((item, indexImage) => (
                            <div className={`${styles.imageCol}`} key={indexImage}>
                                <img
                                    // className={`${styles.imagePost} ${
                                    //     indexImage % 2 === 0 ? styles.smallImage : styles.largeImage
                                    // }`}
                                    data-wow-delay="0.1s"
                                    src={`http://localhost:8086/api/post/${item}/image`}
                                    alt="item"
                                />
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
            <div className={styles.detailBody}>
                <Tours tours={detailData.tourDtoList} />
            </div>
            <div ref={exploreMoreRef} id="exploreMore" className={styles.detailFooter}>
                {/* <SliderTours tourDtoList={detailData.tourDtoList} images={detailData.imagePost} /> */}
            </div>
            <CommentPopup
                postId={postId}
                isOpen={isCommentPopupOpen}
                commentPost={comments}
                onClose={() => setIsCommentPopupOpen(false)}
            />
            <RatingPopup isOpen={ratingModalIsOpen} onClose={closeRatingModal} onRate={handleRate} />
        </div>
    );
}

export default withHeader(DetailPost);
