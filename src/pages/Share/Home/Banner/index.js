import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
        <div className="w-full h-64 relative overflow-hidden">
            <Slider {...sliderSettings}>
                <div>
                    <img className="w-full h-64 object-cover" src={baner1} alt="Banner 1" />
                </div>
                <div>
                    <img className="w-full h-64 object-cover" src={baner2} alt="Banner 2" />
                </div>
                <div>
                    <img className="w-full h-64 object-cover" src={baner3} alt="Banner 3" />
                </div>
            </Slider>
        </div>
    );
}

export default Banner;
