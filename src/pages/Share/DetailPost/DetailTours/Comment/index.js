import React, { useEffect, useRef, useState } from 'react';
import styles from './Comment.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faStar } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import apiService from '../../../../../Components/ApiService';
import { Tooltip } from 'react-tooltip';
import { jwtDecode } from 'jwt-decode';
import Lightbox from 'react-image-lightbox';
import swal from 'sweetalert';
import { TailSpin } from 'react-loader-spinner';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../../store/userSlice';
// import { formatTimeDifference } from '../../../../../helper/formatTimeDifference';
function Comment({ commentList, postId, tourId }) {
    // const getToDay = () => {
    //     const today = new Date();
    //     const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    //     return localDate.toISOString().slice(0, 16);
    // };
    //  console.log(bookId);

    // const formatDateTime = (dateTimeString) => {
    //     const date = new Date(dateTimeString);
    //     const options = {
    //         year: 'numeric',
    //         month: '2-digit',
    //         day: '2-digit',
    //         hour: '2-digit',
    //         minute: '2-digit',
    //         second: '2-digit',
    //         hour12: false,
    //     };
    //     return new Intl.DateTimeFormat('vi-VN', options).format(date).replace(/\./g, '/');
    // };
    const [rating, setRating] = useState(1);
    const [commentValue, setCommentValue] = useState('');
    const [comment, setComment] = useState([]);
    const [editingCommentIndex, setEditingCommentIndex] = useState(-1);
    const [editingCommentValue, setEditingCommentValue] = useState('');
    const [editingCommentImage, setEditingCommentImage] = useState('');
    const [editingRating, setEditingRating] = useState(rating);
    const [images, setImages] = useState([]);
    const [imagesData, setImagesData] = useState([]);
    const [imagesDataEdit, setImagesDataEdit] = useState([]);
    const [mainSrc, setMainSrc] = useState(null);
    const [openImage, setOpenImage] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const imageRef = useRef(null);
    const editImageRef = useRef(null);
    const [cFullNameUser, setCFullNameUser] = useState(false);
    const token = localStorage.getItem('token') || null;

    const [isAuthenticated, setIsAuthenticate] = useState(false);
    const [isLoadingEdit, setIsLoadingEdit] = useState(false);
    // const { isAuthenticated } = useSelector(selectUser);
    /// REF-------------------------
    const triggerFileInput = () => {
        imageRef.current.click();
    };
    const triggerFileInputEdit = () => {
        editImageRef.current.click();
    };
    //------------------------------------
    useEffect(() => {
        setComment(commentList);
    }, [commentList]);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const validateUser = (username) => {
        if (token !== null) {
            const parsToken = jwtDecode(token);
            const loginUser = parsToken.sub;
            // console.log(loginUser);
            // console.log(emailUser);
            if (loginUser === username) {
                // console.log(emailUser);
                return true;
            } else {
                return false;
            }
        }
    };
    const handleStartEditComment = (index) => {
        setEditingCommentIndex(index);
        setEditingCommentValue(comment[index].content);
        setEditingRating(comment[index].rating);
        setEditingCommentImage(comment[index].imageComment);
    };

    const handleCancelEditComment = () => {
        setEditingCommentIndex(-1);
        setImagesDataEdit('');
    };

    const deleteComment = async (commentId) => {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const data = await apiService.request('delete', `comment/delete/${commentId}`, null, headers);
        console.log(data);
        // eslint-disable-next-line eqeqeq
        if (data == '200') {
            const reFetchComment = await apiService.request('get', `comment/list/${postId}/${tourId}`);
            console.log(reFetchComment);
            setComment(reFetchComment);
            swal('Deleted!', 'Your comment has been deleted!', 'success');
        } else {
            swal('Deleted!', 'Something went wrong', 'Error');
        }
    };
    const handleDeleteComment = async (commentId) => {
        swal({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this comment!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteComment(commentId);
            } else {
                swal('Cancelled', 'Cancel delete', 'info');
            }
        });
    };
    // get full name current user
    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const getCFullNameUser = async () => {
            if (token !== null) {
                setIsAuthenticate(true);
                const data = await apiService.request('get', 'auth/currentFullNameUser', null, headers);
                setCFullNameUser(data);
            }
        };
        getCFullNameUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // -----------------------------------add image -----------------
    const handleChangeImage = (e) => {
        const listFiles = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
        const fileData = Array.from(e.target.files);
        setImagesData((pre) => [...pre, ...fileData]);
        setImages((pre) => [...pre, ...listFiles]);
        e.target.value = null;
        // console.log(images);
    };
    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };
    //-----------------------------------------------------

    //---------------------edit---------------------------
    const handleChangeEditImage = (e) => {
        const listFiles = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
        const fileData = Array.from(e.target.files);
        setImagesDataEdit((pre) => [...pre, ...fileData]);
        setEditingCommentImage((pre) => [...pre, ...listFiles]);
        e.target.value = null;
    };
    useEffect(() => {
        const filterImageEditData =
            editingCommentImage &&
            editingCommentImage?.filter((item) => typeof item === 'object' && item.id && item.imageUrl);
        console.log('editingCommentImage', editingCommentImage);
        console.log('filterImageEditData', filterImageEditData);
        console.log('Image data', imagesDataEdit);
    }, [imagesDataEdit, editingCommentImage]);

    const handleRemoveEditImage = (index) => {
        setEditingCommentImage((prevImages) => prevImages.filter((_, i) => i !== index));
        swal('Success', 'Delete Image Successfully', 'success');
    };
    const handleSaveEditComment = async (commentId) => {
        // alert(commentId);
        setIsLoadingEdit(true);
        const filterImageEditData =
            editingCommentImage &&
            editingCommentImage
                ?.filter((item) => typeof item === 'object' && item.id && item.imageUrl)
                .map((item) => item.id);
        const commentEdit = {
            editContent: editingCommentValue,
            editRating: editingRating,
            newImageIds: filterImageEditData,
        };
        const headers = {
            'Content-Type': 'multipart/form-data',
        };
        const formData = new FormData();
        formData.append('editCommentRequest', JSON.stringify(commentEdit));
        if (imagesDataEdit?.length > 0) {
            imagesDataEdit.forEach((image) => {
                formData.append('editImage', image);
                // console.log(image);
            });
        }
        // alert('Edit comment successfully');
        const data = await apiService.request('put', `comment/edit/${commentId}`, formData, headers);
        console.log(data);
        // eslint-disable-next-line eqeqeq
        if (data == '200') {
            const reFetchComment = await apiService.request('get', `comment/list/${postId}/${tourId}`);
            // console.log(reFetchComment);
            setComment(reFetchComment);
            swal('OK!', 'Your comment has been Edited!', 'success');
            setIsLoadingEdit(false);
        }
        setEditingCommentIndex(-1);
    };
    // ----------------------------------

    const handleClickImage = async (index, commentId) => {
        // alert(index);
        // console.log(commentId);
        // setCommentId(commentId);
        setOpenImage(true);
        setImageIndex(index);
        const data = await apiService.request('get', `comment/image/${commentId}`);
        setMainSrc(data);
        // console.log(data);
    };

    const handlePostComment = async () => {
        // console.log(commentValue);
        setIsLoadingEdit(true);
        const parsToken = jwtDecode(token);
        let formData = new FormData();
        const dataSubmit = {
            rating: rating,
            content: commentValue,
            postId: postId,
            tourId: tourId,
            username: parsToken.sub,
        };
        formData.append('commentRequest', JSON.stringify(dataSubmit));
        if (imagesData?.length > 0) {
            imagesData.forEach((image) => {
                formData.append('images', image);
                // console.log(image);
            });
        }
        console.log(imagesData);

        // formData.append('images', images);
        const headers = {
            'Content-Type': 'multipart/form-data',
        };
        const data = await apiService.request('post', 'comment', formData, headers);
        if (data === 'Successfully') {
            const reFetchComment = await apiService.request('get', `comment/list/${postId}/${tourId}`);
            console.log(reFetchComment);
            setComment(reFetchComment);
            setIsLoadingEdit(false);
        }
        // toast.success(data);
        swal('Success', data, 'success');
        setCommentValue('');
        setImages('');
    };

    return (
        <div className={styles.container} style={{ maxWidth: '1000px' }}>
            {isLoadingEdit && (
                // <Audio height="80" width="80" radius="9" color="green" ariaLabel="loading" wrapperStyle wrapperClass />
                <TailSpin color="red" radius={'8px'} />
            )}

            {isAuthenticated && !isLoadingEdit && (
                <div
                    className={images.length > 0 ? styles.commentCardActive : styles.commentCardAdd}
                    style={{ backgroundColor: '#f8f9fa' }}
                >
                    <div className={styles.addCommentHeader}>
                        <div className={styles.addCommentInfo}>
                            <img className={styles.imageUser} src={cFullNameUser.profileImage} alt="avatar" />
                            <div className={styles.ratingAndUsername}>
                                <h6 className="fw-bold text-primary mb-1">
                                    {cFullNameUser?.lastname + ' ' + cFullNameUser?.firstname}
                                </h6>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        className={styles.rating}
                                        key={star}
                                        onClick={() => handleRatingChange(star)}
                                        style={{
                                            cursor: 'pointer',
                                            color: star <= rating ? 'violet' : 'gray',
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faStar} />
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={styles.commentBtn}>
                            {(commentValue || images?.length > 0) && (
                                <>
                                    <button className={`${styles.btnSubmit} ${styles.btn}`} onClick={handlePostComment}>
                                        OK
                                    </button>
                                    <button
                                        className={`${styles.btnCancel} ${styles.btn}`}
                                        onClick={() => {
                                            setCommentValue('');
                                            setImages('');
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={images.length > 0 ? styles.addCommentGroupActive : styles.addCommentGroup}>
                        {images && (
                            <div className={styles.displayImageCommentActive}>
                                {images.map((image, index) => (
                                    <img
                                        data-tooltip-id="delete-image"
                                        data-tooltip-place="top"
                                        data-tooltip-content="Click to delete "
                                        key={index}
                                        src={image}
                                        alt={`comment-imageData-${index}`}
                                        onClick={() => handleRemoveImage(index)}
                                    />
                                ))}
                            </div>
                        )}
                        <div className={styles.contentComment}>
                            <textarea
                                value={commentValue}
                                className={styles.inputComment}
                                onChange={(e) => setCommentValue(e.target.value)}
                            />
                            <FontAwesomeIcon
                                icon={faImage}
                                data-tooltip-id="comment-with-image"
                                data-tooltip-place="top"
                                data-tooltip-content="Comment with image "
                                onClick={triggerFileInput}
                            />
                        </div>
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            ref={imageRef}
                            onChange={handleChangeImage}
                            multiple
                        />
                    </div>
                </div>
            )}
            {!isLoadingEdit && (
                <div className="justify-content-center">
                    {comment?.map((item, index) => (
                        <div
                            className={editingCommentIndex === index ? styles.commentCardActive : styles.commentCard}
                            key={index}
                        >
                            <div className={styles.CommentInfo}>
                                <div>
                                    <div className={styles.userInfocomment}>
                                        <img
                                            className={styles.imageUser}
                                            // src={item.avatarUser}
                                            src="https://i.pinimg.com/564x/44/cf/8b/44cf8b5f7b7f6562b67784ef346aeca2.jpg"
                                            alt="avatar"
                                            width="30"
                                            height="30"
                                        />
                                        <div className={styles.headerCommentCard}>
                                            <h6 className="">{item.userComment}</h6>
                                            {editingCommentIndex === index ? (
                                                <div>
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <span
                                                            className={styles.rating}
                                                            key={star}
                                                            onClick={() => setEditingRating(star)}
                                                            style={{
                                                                cursor: 'pointer',
                                                                color: star <= editingRating ? 'violet' : 'gray',
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faStar} />
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p>
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <span
                                                            className={styles.ratingItem}
                                                            key={star}
                                                            style={{
                                                                cursor: 'pointer',
                                                                color: star <= item.rating ? 'violet' : 'gray',
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faStar} />
                                                        </span>
                                                    ))}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {editingCommentIndex === index ? (
                                        <>
                                            <div className={styles.editActive}>
                                                <div className={styles.displayImageEditActive}>
                                                    {editingCommentImage?.map((image, index) => (
                                                        <img
                                                            data-tooltip-id="delete"
                                                            data-tooltip-place="top"
                                                            data-tooltip-content="Click to delete "
                                                            key={index}
                                                            src={image.imageUrl || image}
                                                            alt={`comment-imageData-${index}`}
                                                            onClick={() => handleRemoveEditImage(index)}
                                                        />
                                                    ))}
                                                </div>
                                                <div className={styles.contentCommentEditActive}>
                                                    <textarea
                                                        value={editingCommentValue}
                                                        onChange={(e) => setEditingCommentValue(e.target.value)}
                                                        className={styles.inputCommentEdit}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faImage}
                                                        data-tooltip-id="Edit-image"
                                                        data-tooltip-place="top"
                                                        data-tooltip-content="Edit image"
                                                        onClick={triggerFileInputEdit}
                                                    />
                                                    <input
                                                        type="file"
                                                        style={{ display: 'none' }}
                                                        ref={editImageRef}
                                                        onChange={handleChangeEditImage}
                                                        multiple
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className={styles.displayContentGroup}>
                                                <div className={styles.ImageComment}>
                                                    {item.imageComment?.slice(0, 3).map((image, index) => (
                                                        <img
                                                            data-tooltip-id="detail-image"
                                                            data-tooltip-place="top"
                                                            data-tooltip-content="Click to see detail"
                                                            key={index}
                                                            src={image.imageUrl}
                                                            alt={`comment-imageData-${index}`}
                                                            onClick={() => handleClickImage(index, item.id)}
                                                        />
                                                    ))}
                                                    {item.imageComment && item.imageComment.length > 3 && (
                                                        <div
                                                            className={styles.showAllButton}
                                                            onClick={() => handleClickImage(3, item.id)}
                                                        >
                                                            +{item.imageComment?.length - 3}
                                                        </div>
                                                    )}
                                                </div>
                                                {openImage && (
                                                    <Lightbox
                                                        mainSrc={mainSrc && mainSrc[imageIndex]?.imageUrl}
                                                        nextSrc={
                                                            mainSrc &&
                                                            mainSrc[
                                                                (imageIndex + mainSrc?.length + 1) % mainSrc?.length
                                                            ]?.imageUrl
                                                        }
                                                        prevSrc={
                                                            mainSrc &&
                                                            mainSrc[
                                                                (imageIndex + mainSrc?.length - 1) % mainSrc?.length
                                                            ]?.imageUrl
                                                        }
                                                        onCloseRequest={() => setOpenImage(false)}
                                                        onMovePrevRequest={() =>
                                                            setImageIndex(
                                                                mainSrc &&
                                                                    (imageIndex + mainSrc?.length - 1) %
                                                                        mainSrc?.length,
                                                            )
                                                        }
                                                        onMoveNextRequest={() =>
                                                            setImageIndex(mainSrc && (imageIndex + 1) % mainSrc?.length)
                                                        }
                                                    />
                                                )}
                                                <p className={styles.content}>{item.content}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                                {editingCommentIndex === index ? (
                                    <div className={styles.commentEditBtn}>
                                        <button className={styles.btn} onClick={() => handleSaveEditComment(item.id)}>
                                            OK
                                        </button>
                                        <button className={styles.btn} onClick={handleCancelEditComment}>
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        {/* Dropdown menu cho việc chỉnh sửa hoặc xóa comment */}
                                        {validateUser(item.usernameUserComment) && (
                                            <div className={styles.commentDropdown}>
                                                <div className={styles.dropdownIcon}>
                                                    <FontAwesomeIcon icon={faEllipsisV} />
                                                </div>
                                                <div className={styles.dropdownContent}>
                                                    <button onClick={() => handleStartEditComment(index)}>Edit</button>
                                                    <button onClick={() => handleDeleteComment(item.id)}>Delete</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Tooltip id="comment-with-image" />
            {images && <Tooltip id="delete-image" />}
            {editingCommentIndex !== -1 && <Tooltip id="delete" />}
            <Tooltip id="detail-image" />
            <Tooltip id="Edit-image" />
        </div>
    );
}

export default Comment;
