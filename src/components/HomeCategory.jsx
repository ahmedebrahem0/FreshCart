import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useCategories from "./../hooks/useCategories";

// مكون الهيكل العظمي (Skeleton) أثناء التحميل
function SkeletonCategory() {
  return (
    <div className="px-2">
      <div className="h-32 w-full bg-gray-200 animate-pulse rounded-md"></div>
      <div className="h-4 bg-gray-300 rounded mt-2 w-3/4 mx-auto"></div>
    </div>
  );
}

// المكون الرئيسي لعرض الفئات
export default function HomeCategory() {
  // إعدادات السلايدر
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 10, // عدد الشرائح المعروضة على الشاشات الكبيرة
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // الشاشات المتوسطة
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 768, // الشاشات الصغيرة
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480, // الشاشات الصغيرة جدًا
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  // جلب بيانات الفئات باستخدام الهوك المخصص
  const { data, isLoading, isError } = useCategories();
  const categories = data?.data?.data || [];

  // في حالة حدوث خطأ
  if (isError) {
    return <h1>Error fetching categories</h1>;
  }

  // دالة لتحديد زاوية الميل بناءً على موقع العنصر
  const getRotation = (index, total) => {
    const middle = Math.floor(total / 2); // الحصول على العنصر الأوسط
    const distanceFromMiddle = index - middle; // حساب المسافة من المنتصف
    const maxRotation = 15; // أقصى زاوية ميل
    return distanceFromMiddle * maxRotation; // زيادة زاوية الميل كلما ابتعدنا عن المنتصف
  };

  return (
    <Slider {...settings}>
      {isLoading
        ? Array(10) // عرض 10 هيكل عظمي أثناء التحميل
            .fill(0)
            .map((_, index) => <SkeletonCategory key={index} />)
        : categories.map((category, index) => (
            <div
              key={category._id}
              className="px-2"
              style={{
                transform: `rotate(${getRotation(
                  index,
                  categories.length
                )}deg)`, // تطبيق زاوية الميل
              }}
            >
              <img
                src={category.image}
                className="w-full aspect-[4/3] object-cover rounded-md border-2 border-gray-300"
                alt={category.name}
              />
              <h6 className="text-center text-sm font-medium mt-2 text-gray-700 dark:text-white">
                {category.name}
              </h6>
            </div>
          ))}
    </Slider>
  );
}
