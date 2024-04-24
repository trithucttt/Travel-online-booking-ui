import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { faCarrot, faLocationDot, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './DetailTour.module.scss';
import { VND } from '../../../../helper';
import Comment from './Comment';
// import DetailTourHandler from './DetailTourHandler';
import { useParams } from 'react-router-dom';
import apiService from '../../../../Components/ApiService/index';
import { useSelector } from 'react-redux';
import { selectedPost } from '../../../../store/postSlice';
import { formatTimeDifference } from '../../../../helper/formatTimeDifference';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
function DetailTour() {
    const [rating] = useState(4.5);
    const [detailTour, setDetailTour] = useState({});
    const [showComment, setShowComment] = useState(true);
    const [checkRole, setCheckRole] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const totalPriceRef = useRef(null);
    const { id } = useParams();
    const token = localStorage.getItem('token') || null;
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const { postId } = useSelector(selectedPost);
    const tourId = parseInt(id, 10);
    // console.log('detail tour get post id', postId);
    // console.log('detail tour get id', id);
    // const { quantity, handleMinusQuantity, handlePlusQuantity, addToCart, totalPriceRef } = DetailTourHandler({
    //     initialQuantity: 1,
    //     maxQuantity: detailTour.quantityTour,
    // });
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
    const fetchDetailTour = async () => {
        const data = await apiService.request('get', `tour/detail/${postId}/${tourId}`);
        console.log(data);
        setDetailTour(data);
    };

    useEffect(() => {
        fetchDetailTour();

        if (token !== null) {
            const parseToken = jwtDecode(token);
            const role = parseToken.role;
            if (role === 'BUSINESS') setCheckRole(false);
            if (role === 'USER') setCheckRole(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleMinusQuantity = () => {
        if (quantity < 2) {
            toast.warning('Quantity cannot be less than 1');
        } else {
            setQuantity(quantity - 1);
        }
    };

    const handlePlusQuantity = () => {
        if (quantity > detailTour?.quantityTour - 1) {
            toast.warning(`Quantity cannot be more than ${detailTour?.quantityTour}`);
        } else {
            setQuantity(quantity + 1);
        }
    };
    const addToCart = async () => {
        const totalPrice = totalPriceRef.current.innerText;
        console.log('Total Price: ', totalPrice);
        const postIdPart = parseInt(postId, 10);
        const addToCartRequest = {
            postId: postIdPart,
            tourId: tourId,
            quantity: quantity,
        };
        console.log('add to cart data ', addToCartRequest);
        const data = await apiService.request('post', 'cart/add', addToCartRequest, headers);
        if (data?.responseCode === '200') {
            swal('OK!', data?.message, 'success');
            // console.log(data?.message);
        } else {
            swal('Warning!', data?.message, 'warning');
            // console.log(data?.message);
        }
    };
    return (
        <div className={styles.container}>
            <ToastContainer />
            <div className={styles.detailTour}>
                <div className={styles.detailImage}>
                    <img
                        src={`http://localhost:8086/api/post/${detailTour.imageTour}/image`}
                        alt={detailTour.imageTour}
                        className={styles.imageTourDetail}
                    />
                </div>
                <div className={styles.detailInfo}>
                    <div className={styles.titleTour}>
                        <h2>{detailTour.titleTour}</h2>
                    </div>
                    <div className={styles.providerTour}>
                        <h4>Provide by {detailTour.companyTour} Company</h4>
                    </div>
                    <div className={styles.rating}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                className={styles.ratingItem}
                                key={star}
                                style={{
                                    cursor: 'pointer',
                                    color: star <= rating ? 'violet' : 'gray',
                                }}
                            >
                                {/* &#9733; */}
                                <FontAwesomeIcon icon={faStar} />
                            </span>
                        ))}
                    </div>
                    <div className={styles.content}>
                        <div className={styles.description}>
                            <p className={styles.discountContent}>
                                {detailTour.discount * 100 + '%'} SALE END OF {formatTimeDifference(detailTour.endTime)}
                            </p>
                            <p className={`${styles.startDay} ${styles.dayTour}`}>
                                Start day: {detailTour.startTime && formatDateTime(detailTour.startTime)}
                            </p>
                            <p className={`${styles.endDay} ${styles.dayTour}`}>
                                End day: {detailTour.endTime && formatDateTime(detailTour.endTime)}
                            </p>
                            <p className={styles.dayTour}>
                                Total Quantity: {detailTour.quantityTour && detailTour.quantityTour}
                            </p>
                        </div>
                        <div className={styles.destinationTour}>
                            Destination tour:
                            <ul>
                                {detailTour.destiationDtoList &&
                                    detailTour.destiationDtoList.map((item, index) => (
                                        <li className={styles.destinationItem} key={index}>
                                            <FontAwesomeIcon className={styles.iconCarrot} icon={faCarrot} />{' '}
                                            {item.desName}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.footerDetail}>
                        <div className={styles.quantityTour}>
                            <FontAwesomeIcon
                                icon={faMinus}
                                onClick={handleMinusQuantity}
                                className={`${styles.iconItem} ${styles.iconMinus}`}
                            />
                            <input type="number" className={styles.quantityInput} value={quantity} disabled />
                            <FontAwesomeIcon
                                icon={faPlus}
                                onClick={handlePlusQuantity}
                                className={`${styles.iconItem} ${styles.iconPlus}`}
                            />
                        </div>
                        <div className={styles.groupPrice}>
                            <p className={styles.priceTour}>
                                {detailTour.price && VND.format(detailTour.price)}/person
                            </p>
                        </div>
                    </div>
                    <p className={styles.totalPrice} ref={totalPriceRef}>
                        Total price: {VND.format(detailTour.price * quantity)}
                    </p>
                    <button className={styles.addToCart} onClick={addToCart} disabled={!checkRole}>
                        Add To Cart
                    </button>
                </div>
            </div>

            <button onClick={() => setShowComment(!showComment)}>
                {showComment && 'ImageDestination' ? 'ImageDestination' : 'Comment'}
            </button>
            <div className={styles.tabDetail}>
                {showComment && (
                    <div className={styles.commentTour}>
                        <Comment commentList={detailTour.commentList} postId={postId} tourId={detailTour.tour_id} />
                    </div>
                )}
                {!showComment && (
                    <div className={styles.introduceTour}>
                        <div>{detailTour.description}</div>
                        <div className={styles.listImageDes}>
                            {detailTour.destiationDtoList &&
                                detailTour.destiationDtoList.map((item, index) => (
                                    <figure key={index} className={styles.figureStyle}>
                                        <img
                                            src={`http://localhost:8086/api/destination/${item.desId}/image`}
                                            alt="detail-DestinationImage"
                                            className={styles.imageDestinationDetail}
                                        />
                                        <div>
                                            <figcaption className={styles.figcaptionDesName}>{item.desName}</figcaption>
                                            <figcaption className={styles.figcaptionLocation}>
                                                <FontAwesomeIcon
                                                    icon={faLocationDot}
                                                    className={styles.iconLocationDes}
                                                />
                                                Location EN: {item.desAddress}
                                            </figcaption>
                                            <figcaption className={styles.figcaptionLocationVn}>
                                                Description: {item.description}
                                            </figcaption>
                                        </div>
                                    </figure>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default DetailTour;
