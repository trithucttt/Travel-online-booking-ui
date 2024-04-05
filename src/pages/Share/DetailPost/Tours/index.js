import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapLocation, faLocationDot, faClock, faCalendar } from '@fortawesome/free-solid-svg-icons';
import styles from './Tours.module.scss'; // Adjust the import path according to your file structure
import { VND } from '../../../../helper/index';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { routeKey } from '../../../../Components/pathName';
import { useDispatch } from 'react-redux';
import postSlice, { PostIdFromTour } from '../../../../store/postSlice';

const Tours = ({ tourDtoList, postId }) => {
    const navigate = useNavigate();
    const dispath = useDispatch();
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            // hour: '2-digit',
            // minute: '2-digit',
            // second: '2-digit',
            // hour12: false,
        };
        return new Intl.DateTimeFormat('vi-VN', options).format(date).replace(/\./g, '/');
    };
    const handleNavigateDetailTour = (id) => {
        // alert(postId);
        dispath(PostIdFromTour(postId));
        navigate(`${routeKey.detailTour.replace(':id', id)}`);
    };
    // console.log(tourDtoList);
    return (
        <div className={styles.tourContainer}>
            {tourDtoList &&
                tourDtoList.map((tour, index) => (
                    <div className={styles.tourCard} key={index}>
                        <div className={styles.cardHeader} onClick={() => handleNavigateDetailTour(tour.tour_id)}>
                            <span
                                className={styles.cardTitle}
                                data-tooltip-id="title-click-details"
                                data-tooltip-place="top"
                                data-tooltip-content="Click to see details "
                            >
                                {tour.titleTour}
                            </span>
                        </div>
                        <div className={styles.cardBody}>
                            <div className={styles.cardImage}>
                                <img
                                    className={styles.imageItem}
                                    src="https://i.pinimg.com/564x/ce/38/fd/ce38fdcadc4bd245c13ae796ce51c597.jpg"
                                    alt="Tour Can Tho"
                                />
                            </div>
                            <div className={styles.cardInfo}>
                                <div className={styles.cardInfoBottom}>
                                    <div className={styles.rating}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                className={styles.ratingItem}
                                                key={star}
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faStar} />
                                            </span>
                                        ))}
                                    </div>
                                    <div className={styles.review}>
                                        <b>Reviews: 320 Review</b>
                                    </div>
                                    <div className={styles.price}>
                                        <b>Price: {VND.format(tour.price)}</b>
                                    </div>
                                </div>
                                <div className={styles.cardInfoTop}>
                                    <b>
                                        Destination: <FontAwesomeIcon icon={faMapLocation} />
                                    </b>
                                    <div className={styles.destinationTour}>
                                        <ul>
                                            {tour.destiationDtoList.map((des, index) => (
                                                <li className={styles.destinationItem} key={index}>
                                                    <FontAwesomeIcon icon={faLocationDot} /> {des.desName}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className={styles.tourCalendar}>
                                        {/* <p className={styles.description}>{tour.description}</p> */}
                                        {/* <div className={`${styles.startDay} ${styles.date}`}>
                                            <p>
                                                <FontAwesomeIcon icon={faClock} /> Start_Day:{' '}
                                                {formatDateTime(tour.startTime)}
                                            </p>
                                        </div>
                                        <div className={`${styles.date} ${styles.endDay}`}>
                                            <p>
                                                <FontAwesomeIcon icon={faClock} /> End_Day:{' '}
                                                {formatDateTime(tour.endTime)}
                                            </p>
                                        </div>
                                        <div className={`${styles.dayTour} ${styles.date}`}>
                                            <p>
                                                <FontAwesomeIcon icon={faCalendar} /> Days: {tour.dayTour} day
                                            </p>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            <Tooltip id="title-click-details" />
        </div>
    );
};

export default Tours;
