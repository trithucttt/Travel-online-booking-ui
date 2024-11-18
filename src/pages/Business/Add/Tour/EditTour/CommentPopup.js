import React, { useState } from 'react';
import sampleComments from '../../../../Share/DetailPost/CommentForPost/sampleComments.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTimes } from '@fortawesome/free-solid-svg-icons';
import CommentForm from '../../../../Share/DetailPost/CommentForPost/CommentForm';
import Lightbox from 'react-image-lightbox';
const CommentPopup = ({ isOpen, onRequestClose }) => {
    const [comments, setComments] = useState(sampleComments);
    const [newImages, setNewImages] = useState([]);
    const [replyTo, setReplyTo] = useState(null);
    const [replyImages, setReplyImages] = useState([]);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentImages, setCurrentImages] = useState([]);
    if (!isOpen) return null;

    const handleAddComment = (content) => {
        const newComment = {
            id: comments.length + 1,
            user: 'New User',
            avatar: 'https://i.pravatar.cc/150?img=4',
            content,
            images: newImages || [],
            time: new Date().toLocaleString(),
            replies: [],
        };
        setComments([...comments, newComment]);
        setNewImages([]);
    };

    const handleReply = (commentId, content) => {
        const updatedComments = comments.map((comment) => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [
                        ...comment.replies,
                        {
                            id: comment.replies.length + 1,
                            user: 'Reply User',
                            avatar: 'https://i.pravatar.cc/150?img=5',
                            content,
                            images: replyImages,
                            time: new Date().toLocaleString(),
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

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity ${
                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div className="bg-white rounded-lg p-5 w-full max-w-3xl overflow-auto max-h-[90vh] shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Comments</h2>
                    <button onClick={onRequestClose}>
                        <FontAwesomeIcon icon={faTimes} className="text-gray-600 hover:text-red-600" />
                    </button>
                </div>

                <div className="space-y-4">
                    {comments?.map((comment) => (
                        <div key={comment.id} className="p-4 bg-gray-100 rounded-lg">
                            <div className="flex items-center mb-2">
                                <img className="w-10 h-10 rounded-full mr-3" src={comment.avatar} alt="avatar" />
                                <div>
                                    <h3 className="font-semibold">{comment.user}</h3>
                                    <p className="text-gray-500 text-sm">{comment.time}</p>
                                </div>
                            </div>
                            <p className="mb-2">{comment.content}</p>
                            <div className="grid grid-cols-3 gap-2 mb-2">
                                {comment.images?.slice(0, 3).map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt="commentImage"
                                        className="w-full h-auto rounded-lg cursor-pointer"
                                        onClick={() => openLightbox(comment.images, index)}
                                    />
                                ))}
                                {comment.images?.length > 3 && (
                                    <button
                                        onClick={() => openLightbox(comment.images, 3)}
                                        className="w-full h-auto rounded-lg flex items-center justify-center bg-gray-200 text-gray-600"
                                    >
                                        + {comment.images.length - 3} more
                                    </button>
                                )}
                            </div>
                            <button
                                className="text-blue-500 hover:underline flex items-center"
                                onClick={() => setReplyTo(comment.id)}
                            >
                                <FontAwesomeIcon icon={faReply} className="mr-2" /> Reply
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
                                            <img
                                                className="w-8 h-8 rounded-full mr-2"
                                                src={reply.avatar}
                                                alt="replyAvatar"
                                            />
                                            <div>
                                                <h4 className="font-semibold">{reply.user}</h4>
                                                <p className="text-gray-500 text-sm">{reply.time}</p>
                                            </div>
                                        </div>
                                        <p>{reply.content}</p>
                                        <div className="grid grid-cols-3 gap-2 mb-2">
                                            {reply.images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt="commentImage"
                                                    className="w-full h-auto rounded-lg cursor-pointer"
                                                    onClick={() => openLightbox(reply.images, index)}
                                                />
                                            ))}
                                        </div>
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
                />
            </div>

            {isLightboxOpen && (
                <Lightbox
                    mainSrc={currentImages[currentImageIndex]}
                    nextSrc={currentImages[(currentImageIndex + 1) % currentImages.length]}
                    prevSrc={currentImages[(currentImageIndex + currentImages.length - 1) % currentImages.length]}
                    onCloseRequest={() => setIsLightboxOpen(false)}
                    onMovePrevRequest={() =>
                        setCurrentImageIndex((currentImageIndex + currentImages.length - 1) % currentImages.length)
                    }
                    onMoveNextRequest={() => setCurrentImageIndex((currentImageIndex + 1) % currentImages.length)}
                />
            )}
        </div>
    );
};

export default CommentPopup;
