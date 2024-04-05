import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import { Button } from 'react-bootstrap';
/* css cusstom  margin cho item ở dòng 77 */
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './SliderTours.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { VND } from '../../../helper';
import { Link } from 'react-router-dom';

function SliderTours({ tourDtoList, images }) {
    const sliderRef = useRef(null);
    const settings = {
        // dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        ref: sliderRef,
    };
    // const [listTours, setListTour] = useState(tours);
    //  console.log(listTours);
    const destination = ['diem a', 'diem b', 'diem c', 'diem d'];

    const handleViewDetail = (index) => {
        alert(index);
        //console.log(index);
    };
    return (
        <div className={styles.sliderContainer}>
            <Slider {...settings}>
                {tourDtoList.map((tour, index) => (
                    <div key={index} className={styles.tourSlide}>
                        <div className={styles.cardProduct}>
                            <div className={styles.cardProductImg}>
                                <img
                                    className={styles.imagePost}
                                    alt="ddddd"
                                    src={`http://localhost:8086/api/post/${tour.imageTour}/image`}
                                />
                            </div>
                            <div className={styles.cardProductText}>
                                {/* <div className={styles.productCategory}>
                                     <span>{tour.category}</span> 
                                    <span>{index}</span>
                                </div> */}
                                <div className={styles.productTitle}>
                                    <h3>{tour.titleTour}</h3>
                                </div>
                                <div className={styles.destinationTour}>
                                    {tour.destiationDtoList.map((item, indexDes) => (
                                        <div className={styles.itemsDestination} key={indexDes}>
                                            {item.desName}
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.productPrice}>{VND.format(9999999)}</div>
                                <div className={styles.productFooter}>
                                    <div className={styles.footerLeft}>
                                        <Button onClick={() => handleViewDetail(index)} variant="info">
                                            view detail
                                        </Button>
                                    </div>
                                    <div className={styles.footerRight}>
                                        <Link className={styles.buyBtn}>
                                            <FontAwesomeIcon icon={faShoppingBasket} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <div className={styles.centerControls}>
                <div className={styles.leftControl} onClick={() => sliderRef.current.slickPrev()}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div className={styles.rightControl} onClick={() => sliderRef.current.slickNext()}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            </div>
        </div>
    );
}

export default SliderTours;
// {tours.map((tour, index) => (
//     <div key={index} className={styles.tourSlide}>
//         <div className={styles.cardProduct}>
//             <div className={styles.cardProductImg}>
//                 <img className={styles.imagePost} alt="ddddd" src={images[index]} />
//             </div>
//             <div className={styles.cardProductText}>
//                 <div className={styles.productCategory}>
//                     {/* <span>{tour.category}</span> */}
//                     <span>{index}</span>
//                 </div>
//                 <div className={styles.productTitle}>
//                     <h3>{tour.name}</h3>
//                 </div>
//                 <div className={styles.destinationTour}>
//                     {destination.map((item, index) => (
//                         <div className={styles.itemsDestination} key={index}>
//                             {item}
//                         </div>
//                     ))}
//                 </div>
//                 <div className={styles.productPrice}>{VND.format(9999999)}</div>
//                 <div className={styles.productFooter}>
//                     <div className={styles.footerLeft}>
//                         <Button variant="success"> view detail</Button>
//                     </div>
//                     <div className={styles.footerRight}>
//                         <Link className={styles.buyBtn}>
//                             <FontAwesomeIcon icon={faShoppingBasket} />
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// ))}
