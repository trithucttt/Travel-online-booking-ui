import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Banner.module.scss';
import baner1 from '../../../../Components/Acess/image/baner1.jpg';
import baner2 from '../../../../Components/Acess/image/baner2.jpg';
import baner3 from '../../../../Components/Acess/image/baner3.jpg';
function Banner() {
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    return (
        <div className={styles.HeaderSlider}>
            <Slider {...sliderSettings}>
                <div>
                    <img className={styles.imageBanner} src={baner1} alt="" />
                </div>
                <div>
                    <img className={styles.imageBanner} src={baner2} alt="" />
                </div>
                <div>
                    <img className={styles.imageBanner} src={baner3} alt="" />
                </div>
            </Slider>
        </div>
    );
}
export default Banner;
