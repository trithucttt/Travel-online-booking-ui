import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

function Rating({ rating }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
        <div className="flex items-center space-x-1">
            {/* Hiển thị các ngôi sao đầy đủ */}
            {[...Array(fullStars)].map((_, index) => (
                <span className="text-red-500 cursor-pointer" key={index}>
                    <FontAwesomeIcon icon={faStar} />
                </span>
            ))}

            {/* Hiển thị ngôi sao nửa (nếu có) */}
            {hasHalfStar && (
                <span className="text-red-500 cursor-pointer">
                    <FontAwesomeIcon icon={faStarHalfAlt} />
                </span>
            )}

            {/* Hiển thị các ngôi sao xám còn lại */}
            {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
                <span className="text-gray-400 cursor-pointer" key={index + fullStars + (hasHalfStar ? 1 : 0)}>
                    <FontAwesomeIcon icon={faStar} />
                </span>
            ))}
        </div>
    );
}

export default Rating;
