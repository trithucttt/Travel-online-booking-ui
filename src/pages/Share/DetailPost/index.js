import React, { useEffect, useRef, useState } from 'react';
import styles from './DetailPost.module.scss';

import withHeader from '../../../Components/Layout/withHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faPlane, faStar, faTag } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useParams } from 'react-router-dom';
import apiService from '../../../Components/ApiService';
import axios from 'axios';
import Tours from './Tours';
import ReactImageTooltip from 'react-image-tooltip';

function DetailPost() {
    const location = useLocation();
    const exploreMoreRef = useRef(null);
    const [scrollDown, setScrollDown] = useState(false);
    const [detailData, setDetailData] = useState([]);
    const { id } = useParams();
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

    const fetchDetailPost = async () => {
        try {
            const postId = parseInt(id, 10);
            console.log(typeof postId);
            // const data = await apiService.request('get', `post/detail/${postId}`);
            const response = await axios.get(`http://localhost:8086/api/post/detail/${postId}`);
            console.log(response.data);
            setDetailData(response.data);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        fetchDetailPost();
    }, []);
    return (
        <div className={styles.postDetail}>
            <div className={styles.detailHeader}>
                <div className={styles.headerContent}>
                    <div className={styles.ownerPost}>
                        <div className={styles.imageOwnerPost}>
                            <ReactImageTooltip
                                image="https://i.pinimg.com/564x/1a/84/35/1a8435b262f70dc441a52bf15a9c620d.jpg"
                                effect="solid"
                                place="left"
                            >
                                <img
                                    className={styles.imageUser}
                                    src="https://i.pinimg.com/564x/1a/84/35/1a8435b262f70dc441a52bf15a9c620d.jpg"
                                    alt="userAvatar"
                                />
                            </ReactImageTooltip>
                        </div>
                        <div className={styles.NameOwnerPost}>
                            <h3>{detailData.fullNameUser}</h3>
                        </div>
                    </div>
                    <div className={styles.titleContent}>
                        <h1> {detailData.title}</h1>
                        <div className={styles.tagDiscount}>
                            <FontAwesomeIcon icon={faTag} />
                            {0.02 * 100 + '%'} SALE END OF
                            {/* {format(detailData.end_time, 'dd MMM, yyyy')} */}
                        </div>
                    </div>
                    <div className={styles.contentItems}>
                        <div className={styles.divBorder}>
                            <div className={styles.totalTour}>
                                <FontAwesomeIcon icon={faPlane} />
                                {/* <h2> {detailData.tourDtoList.length}</h2> */}
                                <p>Tours</p>
                            </div>
                        </div>
                        <div className={styles.divBorder}>
                            <div className={styles.avgRating}>
                                <FontAwesomeIcon icon={faStar} />
                                <h2> {detailData.rate}</h2>
                                <p>Start</p>
                            </div>
                        </div>
                        <div className={styles.divBorder}>
                            <div className={styles.totalComment}>
                                <FontAwesomeIcon icon={faComment} />
                                <h2>{Math.floor(Math.random() * 900) + 100}</h2>
                                <p>Comment</p>
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
                        Explore More
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
                <Tours tourDtoList={detailData.tourDtoList} postId={id} />
            </div>
            <div ref={exploreMoreRef} id="exploreMore" className={styles.detailFooter}>
                {/* <SliderTours tourDtoList={detailData.tourDtoList} images={detailData.imagePost} /> */}
            </div>
        </div>
    );
}

export default withHeader(DetailPost);
