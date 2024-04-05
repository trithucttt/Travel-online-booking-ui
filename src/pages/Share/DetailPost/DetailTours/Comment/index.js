// Comment.js
import React, { useEffect, useState } from 'react';
import styles from './Comment.module.scss';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { formatTimeDifference } from '../../../../../helper/formatTimeDifference';
import SockJS from 'sockjs-client';

function Comment({ commentList, postId, tourId }) {
    const getToDay = () => {
        const today = new Date();
        // Format the date-time to YYYY-MM-DDTHH:mm
        const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
        return localDate.toISOString().slice(0, 16); // Slicing to get YYYY-MM-DDTHH:mm
    };
    console.log('comment get post id', postId);
    console.log('comment get tour id', tourId);
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
    const [commentValue, setCommentValue] = useState('');
    const [comment, setComment] = useState([]);
    const [ws, setWs] = useState(null);
    useEffect(() => {
        setComment(commentList);
    }, [commentList]);
    useEffect(() => {
        const socket = new SockJS('http://localhost:8086/ws');
        setWs(socket);
        return () => {
            socket.close();
        };
    }, []);
    useEffect(() => {
        if (!ws) return;
        ws.onmessage = (e) => {
            const commentData = JSON.parse(e.data);
            setComment([...comment, commentData]);
        };
        return () => {
            ws.onmessage = null;
        };
    }, [ws, comment]);

    const handlePostComment = () => {
        console.log(commentValue);
        setCommentValue('');
        const newComment = {
            image: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp',
            username: 'New User',
            publicAt: 'Shared publicly' + formatDateTime(getToDay()),
            content: commentValue,
        };
        setComment([...comment, newComment]);
    };
    return (
        // <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className={styles.container} style={{ maxWidth: '1000px' }}>
            <div className={styles.commentCard} style={{ backgroundColor: '#f8f9fa' }}>
                <div className={styles.addCommentHeader}>
                    <img
                        className={styles.imageUser}
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                        alt="avatar"
                    />
                    <div className={styles.addCommentInfo}>
                        <h6 className="fw-bold text-primary mb-1">Jacky Chain</h6>
                        <p className="text-muted small mb-0">Shared publicly - Jan 2020 </p>
                    </div>
                </div>
                <div className={styles.addCommentGroup}>
                    {/* <label>Add new comment</label> */}
                    <textarea
                        value={commentValue}
                        className={styles.inputComment}
                        // onChange={(e) => handleChangeComment(e.target.value)}
                        onChange={(e) => setCommentValue(e.target.value)}
                    />
                </div>
                <div className={styles.commentBtn}>
                    <button className={`${styles.btnSubmit} ${styles.btn}`} onClick={handlePostComment}>
                        Add
                    </button>
                    <button className={`${styles.btnCancel} ${styles.btn}`}>Cancel</button>
                </div>
            </div>
            <div className="justify-content-center">
                {comment &&
                    comment.map((item, index) => (
                        <div md="12" lg="10" xl="8" className={styles.commentCard} key={index}>
                            <div>
                                <div>
                                    <div className="d-flex flex-start align-items-center">
                                        <Image
                                            className="rounded-circle shadow-1-strong me-3"
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                                            alt="avatar"
                                            width="30"
                                            height="30"
                                        />
                                        <div>
                                            <h6 className="fw-bold text-primary mb-1">{item.userComment}</h6>
                                            <p className="text-muted small mb-0">
                                                {formatTimeDifference(item.startTime)}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-4 pb-2">{item.content}</p>
                                    <div className={styles.footerCommentCard}>
                                        <a href="#!" className="d-flex align-items-center me-3">
                                            <FontAwesomeIcon icon={faThumbsUp} />
                                            <p className="mb-0">Like</p>
                                        </a>
                                        <a href="#!" className="d-flex align-items-center me-3">
                                            <FontAwesomeIcon icon={faCommentDots} />
                                            <p className="mb-0">Comment</p>
                                        </a>
                                        <a href="#!" className="d-flex align-items-center me-3">
                                            <FontAwesomeIcon icon={faShare} />
                                            <p className="mb-0">Share</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
        // </section>
    );
}

export default Comment;
