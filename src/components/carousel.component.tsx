import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../styles/carousel.style.scss";

// import required modules
import {Autoplay, Mousewheel, Pagination } from "swiper";

const MyCarousel = () => {
    return (
        <div className="carousel" >
            <Swiper
                direction={"vertical"}
                slidesPerView={1}
                spaceBetween={30}
                mousewheel={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                modules={[Autoplay,Mousewheel, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide><img src="images/image01.jpg" /></SwiperSlide>
                <SwiperSlide><img src="images/image02.jpg" /></SwiperSlide>
                <SwiperSlide><img src="images/image03.jpg" /></SwiperSlide>
                <SwiperSlide><img src="images/image04.jpg" /></SwiperSlide>
                <SwiperSlide><img src="images/image05.jpg" /></SwiperSlide>
            </Swiper>
        </div>
    )
}

export default MyCarousel