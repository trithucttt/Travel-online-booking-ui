import React, { useState } from 'react';
import Modal from 'react-modal';
import { Rating } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const RatingPopup = ({ isOpen, onClose, onRate }) => {
    const [rating, setRating] = useState(0);

    const handleSubmit = () => {
        onRate(rating);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="flex justify-center items-center"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition duration-200"
                >
                    <CloseIcon />
                </button>
                <h2 className="text-xl font-bold mb-4">Rate this Post</h2>
                <Rating
                    name="custom-rating"
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                    size="large"
                    className="text-yellow-500"
                />
                <button
                    onClick={handleSubmit}
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Submit
                </button>
            </div>
        </Modal>
    );
};

export default RatingPopup;
