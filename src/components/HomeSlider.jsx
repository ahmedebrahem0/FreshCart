import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../src/assets/images/blog-img-1.jpeg";
import img2 from "../../src/assets/images/blog-img-2.jpeg";
import img3 from "../../src/assets/images/slider-image-1.jpeg";
import img4 from "../../src/assets/images/slider-image-2.jpeg";
import img5 from "../../src/assets/images/slider-image-3.jpeg";
import img6 from "../../src/assets/images/slider-2.jpeg";
// import "./styles.css"; // استيراد ملف الـ CSS

export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: false, // تعطيل تأثير التلاشي
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
  };

  return (
    <div className="slider-container ">
      <Slider {...settings}>
        <div>
          <img
            src={img5}
            className="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:h-[320px] object-cover rounded-md"
            alt="Fresh products"
            loading="eager"
            decoding="async"
            fetchpriority="high"
            sizes="100vw"
            width="1600"
            height="900"
          />
        </div>
        <div>
          <img
            src={img1}
            className="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:h-[320px] object-cover rounded-md"
            alt="Quality groceries"
            loading="lazy"
            decoding="async"
            sizes="100vw"
            width="1600"
            height="900"
          />
        </div>
        <div>
          <img
            src={img3}
            className="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:h-[320px] object-cover rounded-md"
            alt="Fresh vegetables"
            loading="lazy"
            decoding="async"
            sizes="100vw"
            width="1600"
            height="900"
          />
        </div>
        <div>
          <img
            src={img4}
            className="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:h-[320px] object-cover rounded-md"
            alt="Organic products"
            loading="lazy"
            decoding="async"
            sizes="100vw"
            width="1600"
            height="900"
          />
        </div>
        <div>
          <img
            src={img2}
            className="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:h-[320px] object-cover rounded-md"
            alt="Healthy food"
            loading="lazy"
            decoding="async"
            sizes="100vw"
            width="1600"
            height="900"
          />
        </div>
        <div>
          <img
            src={img6}
            className="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:h-[320px] object-cover rounded-md"
            alt="Premium quality"
            loading="lazy"
            decoding="async"
            sizes="100vw"
            width="1600"
            height="900"
          />
        </div>
      </Slider>
    </div>
  );
}
