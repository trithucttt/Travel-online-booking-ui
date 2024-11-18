import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faImage, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

const CommentForm = ({ onSubmit, onCancel, hasCancel, setImages, images, saveImage, setSaveImage }) => {
    const [content, setContent] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...imageUrls]);
        setSaveImage((pre) => [...pre, ...files]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
        setSaveImage(saveImage.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (content || images.length) {
            onSubmit(content, isAnonymous); // Pass anonymous status with content
            setContent('');
            setImages([]);
        }
    };

    return (
        <div className="mt-2">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your comment..."
                className="w-full border rounded-lg p-2 mb-2"
            />
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <label className="cursor-pointer">
                        <input type="file" multiple className="hidden" onChange={handleImageUpload} />
                        <div className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500">
                            <FontAwesomeIcon icon={faImage} className="mr-2" /> Thêm ảnh
                        </div>
                    </label>
                    {hasCancel && (
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                            onClick={onCancel}
                        >
                            <FontAwesomeIcon icon={faTimes} className="mr-2" /> Hủy
                        </button>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Đăng ẩn danh</span>
                        <div
                            onClick={() => setIsAnonymous(!isAnonymous)}
                            className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                                isAnonymous ? 'bg-cyan-500' : 'bg-gray-300'
                            }`}
                        >
                            <div
                                className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                    isAnonymous ? 'translate-x-6' : ''
                                }`}
                            ></div>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-blue-500 hover:to-green-400"
                    >
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> Bình luận
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
                {images?.map((image, index) => (
                    <div key={index} className="relative">
                        <img src={image} alt="preview" className="w-full h-20 object-cover rounded-lg" />
                        <button
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                            onClick={() => removeImage(index)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentForm;
