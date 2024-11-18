import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from 'react-modal';

const CommentPopup = ({ isOpen, onClose, comments, onAddComment, currentUser }) => {
    const [newComment, setNewComment] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleAddComment = () => {
        if (newComment.trim() || selectedImage) {
            onAddComment({
                text: newComment,
                image: selectedImage,
                userName: currentUser.name,
                avatar: currentUser.avatar,
            });
            setNewComment('');
            setSelectedImage(null);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="flex flex-col items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-96">
                <button onClick={onClose} className="mb-4 text-red-500">
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className="mb-4">
                    <h3 className="font-bold mb-2">Comments</h3>
                    <div className="max-h-60 overflow-y-auto">
                        {comments.map((comment, index) => (
                            <div key={index} className="mb-4 border-b pb-2 flex items-start space-x-2">
                                <img
                                    src={comment.avatar}
                                    alt={`Avatar of ${comment.userName}`}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-bold">{comment.userName}</p>
                                    <p className="mb-2">{comment.content}</p>
                                    {comment.images && (
                                        <img
                                            src={comment.image}
                                            alt={`Comment ${index + 1}`}
                                            className="w-full h-40 object-cover rounded-lg mb-2"
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <textarea
                        className="p-2 border border-gray-400 rounded w-full"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <input type="file" onChange={handleImageChange} />
                    <button onClick={handleAddComment} className="p-2 bg-blue-500 text-white rounded mt-2">
                        Add Comment
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default CommentPopup;
