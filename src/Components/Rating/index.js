import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './Rating.module.css'; // assuming you have a separate CSS module for styles

function Rating({ rating }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
        <div>
            {[...Array(fullStars)].map((_, index) => (
                <span className={styles.rating} key={index} style={{ cursor: 'pointer', color: 'red' }}>
                    <FontAwesomeIcon icon={faStar} />
                </span>
            ))}
            {hasHalfStar && (
                <span className={styles.rating} style={{ cursor: 'pointer', color: 'red' }}>
                    <FontAwesomeIcon icon={faStarHalfAlt} />
                </span>
            )}
            {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
                <span
                    className={styles.rating}
                    key={index + fullStars + (hasHalfStar ? 1 : 0)}
                    style={{ cursor: 'pointer', color: 'gray' }}
                >
                    <FontAwesomeIcon icon={faStar} />
                </span>
            ))}
        </div>
    );
}

export default Rating;
