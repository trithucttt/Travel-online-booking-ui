import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faReply, faEllipsis, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import CommentForm from './CommentForm';
import Lightbox from 'react-image-lightbox';
import apiService from '../../../../Components/ApiService';
import EditCommentForm from './EditCommentForm';
import swal from 'sweetalert';
import { LoadingPopup } from '../../../../Components/Loading/LoadingPopup';
import { useNavigate } from 'react-router-dom';
import { routeKey } from '../../../../Components/pathName';

function CommentPopup({ isOpen, onClose, commentPost, postId }) {
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [replyTo, setReplyTo] = useState(null);
    const [replyImages, setReplyImages] = useState([]);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentImages, setCurrentImages] = useState([]);
    const [saveImage, setSaveImage] = useState([]);
    const [showDropDown, setShowDropdown] = useState(null);
    const [isEditComment, setIsEditComment] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const currentUser = localStorage.getItem('username') || null;
    // console.log(commentPost);
    const fetchComment = async () => {
        try {
            const data = await apiService.request('get', `comment/list/${postId}`);
            setComments(data);
            // console.log('Fetch comment', data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleAddComment = async (content, isAnonymous) => {
        if (currentUser) {
            setIsLoading(true);
            const newComment = {
                postId: postId,
                username: currentUser,
                content,
                anonymous: isAnonymous,
            };
            // console.log(newComment);
            try {
                const formData = new FormData();
                formData.append('newComment', JSON.stringify(newComment));
                if (saveImage?.length > 0) {
                    saveImage.forEach((image) => {
                        formData.append('images', image);
                    });
                }
                const data = await apiService.request('post', 'comment/create', formData);
                if (data.responseCode === '200') {
                    swal('Bình luận đã được ghi lại', data.message, 'success');
                    fetchComment();
                    setSaveImage([]);
                } else {
                    swal('Bình luận thất bại', data.message, 'error');
                }
            } catch (error) {
                swal('Lỗi', 'Máy chủ không phản hồi hoặc bị sai', 'error');
            } finally {
                setIsLoading(false);
            }
        } else {
            const confirmed = await swal({
                title: 'Vui lòng đăng nhập trước khi bình luận?',
                text: 'Bạn có muốn đăng nhập để bình luận không!',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            });

            if (confirmed) {
                navigate(routeKey.login);
            }
        }
    };

    useEffect(() => {
        setComments(commentPost);
    }, [commentPost]);

    const handleReply = (commentId, content) => {
        const updatedComments = comments.map((comment) => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [
                        ...comment.replies,
                        {
                            id: comment.replies.length + 1,
                            userComment: 'Reply User',
                            avatar: 'https://i.pravatar.cc/150?img=5',
                            content,
                            imageComment: replyImages,
                            startTime: new Date().toLocaleString(),
                        },
                    ],
                };
            }
            return comment;
        });

        setComments(updatedComments);
        setReplyImages([]);
        setReplyTo(null);
    };

    const handleCancelReply = () => {
        setReplyTo(null);
        setReplyImages([]);
    };

    const openLightbox = (images, index) => {
        setCurrentImages(images);
        setCurrentImageIndex(index);
        setIsLightboxOpen(true);
    };

    const handleOpenEdit = (commentId) => {
        setShowDropdown(showDropDown === commentId ? null : commentId);
    };

    const handleDeleteComment = async (commentId) => {
        // alert(commentId);
        setIsLoading(true);
        try {
            const confirmed = await swal({
                title: 'Bạn có thật sự muốn xóa?',
                text: 'Khi xóa sẽ không thể phục hồi!',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            });

            if (confirmed) {
                const token = localStorage.getItem('token');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const data = await apiService.request('delete', `comment/delete/${commentId}`, null, headers);
                if (data == '200') {
                    swal('Thành công', 'Bình luận của bạn đã được xóa', 'success');
                    fetchComment();
                } else {
                    swal('Thất bại', 'Có lỗi xảy ra khi xóa', 'warning');
                }
            }
        } catch (error) {
            swal('Thất bại', 'Có lỗi xảy ra khi xóa' + error, 'warning');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditComment = async (commentId, updatedContent, newImages, updatedImages) => {
        setIsLoading(true);
        const editCommentRequest = {
            editContent: updatedContent,
            updateImageUrl: updatedImages.map((img) => img.imageUrl),
        };
        console.log(newImages);
        try {
            const formData = new FormData();
            formData.append('editCommentRequest', JSON.stringify(editCommentRequest));
            if (newImages?.length > 0) {
                newImages.forEach((image) => {
                    // `image.file` để lấy đúng đối tượng File
                    formData.append('editImage', image.file);
                });
            }
            const data = await apiService.request('put', `comment/edit/${commentId}`, formData);
            if (data == '200') {
                swal('Xong', 'Bình luận của bạn đã được thay đổi', 'success');
                fetchComment();
            } else {
                swal('Bình luận thất bại', 'Thông tin không chính xác hoặc lỗi từ máy chủ', 'error');
            }
        } catch (error) {
            swal('Bình luận thất bại', 'Có lỗi xảy ra với máy chủ', 'error');
        } finally {
            setIsEditComment(null);
            setIsLoading(false);
        }
    };

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity ${
                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div className="bg-white rounded-lg p-5 w-full max-w-3xl overflow-auto max-h-[90vh] shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Bình luận</h2>
                    <button onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} className="text-gray-600 hover:text-red-600" />
                    </button>
                </div>

                <div className="space-y-4">
                    {comments?.map((comment) => (
                        <div key={comment.id} className="p-4 bg-gray-100 rounded-lg">
                            <div className="flex items-center mb-2">
                                {comment.anonymous ? (
                                    <FontAwesomeIcon icon={faUserSecret} className="w-10 h-10 text-gray-400 mr-3" />
                                ) : (
                                    <img className="w-10 h-10 rounded-full mr-3" src={comment.avatar} alt="avatar" />
                                )}

                                <div>
                                    {/* Hiển thị tên "Ẩn danh" nếu anonymous */}
                                    <h3 className="font-semibold">
                                        {comment.anonymous ? 'Ẩn danh' : comment.userComment}
                                    </h3>
                                    <p className="text-gray-500 text-sm">{comment.startTime}</p>
                                </div>
                                {/* Dropdown menu cho sửa/xóa */}
                                {currentUser === comment.usernameUserComment && (
                                    <div className="ml-auto relative">
                                        <button onClick={() => handleOpenEdit(comment.id)}>
                                            <FontAwesomeIcon icon={faEllipsis} />
                                        </button>
                                        {showDropDown === comment.id && (
                                            <div className="absolute z-50 right-0 mt-2 bg-white border rounded shadow-lg">
                                                <button
                                                    onClick={() => {
                                                        setIsEditComment(comment.id);
                                                        setShowDropdown(null);
                                                    }}
                                                    className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                    className="block px-4 py-2 text-left hover:bg-gray-100 w-full text-red-600"
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            {isEditComment === comment.id ? (
                                <EditCommentForm
                                    comment={comment}
                                    onSave={(updatedContent, { newImages, updateImages }) =>
                                        handleEditComment(comment.id, updatedContent, newImages, updateImages)
                                    }
                                    onCancel={() => setIsEditComment(null)}
                                />
                            ) : (
                                <p className="mb-2">{comment.content}</p>
                            )}
                            <div className="grid grid-cols-3 gap-1 mb-2 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                                {comment.imageComment?.slice(0, 3).map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.imageUrl}
                                        alt="commentImage"
                                        className="w-full h-28 object-cover cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105"
                                        onClick={() => {
                                            openLightbox(comment.imageComment, index);
                                        }}
                                    />
                                ))}
                                {comment.imageComment?.length > 3 && (
                                    <button
                                        onClick={() => openLightbox(comment.imageComment, 3)}
                                        className="relative w-full h-28 flex items-center justify-center bg-black bg-opacity-50 text-white font-semibold"
                                    >
                                        +{comment.imageComment.length - 3} Thêm
                                    </button>
                                )}
                            </div>

                            <button
                                className="text-blue-500 hover:underline flex items-center"
                                onClick={() => setReplyTo(comment.id)}
                            >
                                <FontAwesomeIcon icon={faReply} className="mr-2" /> Trả lời
                            </button>

                            {/* Form reply */}
                            {replyTo === comment.id && (
                                <CommentForm
                                    onSubmit={(content) => handleReply(comment.id, content)}
                                    onCancel={handleCancelReply}
                                    hasCancel={true}
                                    images={replyImages}
                                    setImages={setReplyImages}
                                />
                            )}

                            <div className="ml-10 mt-2 space-y-2">
                                {comment.replies.map((reply) => (
                                    <div key={reply.id} className="bg-white p-2 rounded-lg shadow-sm">
                                        <div className="flex items-center mb-1">
                                            {reply.anonymous ? (
                                                <FontAwesomeIcon
                                                    icon={faUserSecret}
                                                    className="w-10 h-10 text-gray-400 mr-3"
                                                />
                                            ) : (
                                                <img
                                                    className="w-10 h-10 rounded-full mr-3"
                                                    src={reply.avatar}
                                                    alt="avatar"
                                                />
                                            )}

                                            <div>
                                                {/* Hiển thị tên "Ẩn danh" nếu anonymous */}
                                                <h3 className="font-semibold">
                                                    {reply.anonymous ? 'Ẩn danh' : reply.userComment}
                                                </h3>
                                                <p className="text-gray-500 text-sm">{reply.startTime}</p>
                                            </div>
                                            {currentUser === reply.usernameUserComment && (
                                                <div className="ml-auto relative">
                                                    <button onClick={() => handleOpenEdit(reply.id)}>
                                                        <FontAwesomeIcon icon={faEllipsis} />
                                                    </button>
                                                    {showDropDown === reply.id && (
                                                        <div className="absolute z-50 right-0 mt-2 bg-white border rounded shadow-lg">
                                                            <button
                                                                onClick={() => {
                                                                    setIsEditComment(reply.id);
                                                                    setShowDropdown(null);
                                                                }}
                                                                className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
                                                            >
                                                                Sửa
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteComment(reply.id)}
                                                                className="block px-4 py-2 text-left hover:bg-gray-100 w-full text-red-600"
                                                            >
                                                                Xóa
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        {isEditComment === reply.id ? (
                                            <EditCommentForm
                                                comment={reply}
                                                onSave={(updatedContent) => handleEditComment(reply.id, updatedContent)}
                                                onCancel={() => setIsEditComment(null)}
                                            />
                                        ) : (
                                            <p className="mb-2">{reply.content}</p>
                                        )}
                                        <div className="grid grid-cols-3 gap-1 mb-2 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                                            {reply.imageComment?.slice(0, 3).map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image.imageUrl}
                                                    alt="commentImage"
                                                    className="w-full h-28 object-cover cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105"
                                                    onClick={() => {
                                                        openLightbox(reply.imageComment, index);
                                                    }}
                                                />
                                            ))}
                                            {reply.imageComment?.length > 3 && (
                                                <button
                                                    onClick={() => openLightbox(reply.imageComment, 3)}
                                                    className="relative w-full h-28 flex items-center justify-center bg-black bg-opacity-50 text-white font-semibold"
                                                >
                                                    +{reply.imageComment.length - 3} Nhiều hơn
                                                </button>
                                            )}
                                        </div>
                                        {/* <div className="text-yellow-500">
                                            <Rating rating={reply.rating} />
                                        </div> */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comment input form */}
                <CommentForm
                    onSubmit={handleAddComment}
                    hasCancel={false}
                    images={newImages}
                    setImages={setNewImages}
                    setSaveImage={setSaveImage}
                    saveImage={saveImage}
                />
            </div>
            {/* {console.log(currentImageIndex[currentImageIndex])} */}

            {isLightboxOpen && (
                <Lightbox
                    mainSrc={currentImages[currentImageIndex]?.imageUrl}
                    nextSrc={currentImages[(currentImageIndex + 1) % currentImages.length]?.imageUrl}
                    prevSrc={
                        currentImages[(currentImageIndex + currentImages.length - 1) % currentImages.length]?.imageUrl
                    }
                    onCloseRequest={() => setIsLightboxOpen(false)}
                    onMovePrevRequest={() =>
                        setCurrentImageIndex((currentImageIndex + currentImages.length - 1) % currentImages.length)
                    }
                    onMoveNextRequest={() => setCurrentImageIndex((currentImageIndex + 1) % currentImages.length)}
                />
            )}
            <LoadingPopup isLoading={isLoading} />
        </div>
    );
}

export default CommentPopup;
