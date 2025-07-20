import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router';
import useFetch from '../../Hooks/useFetch';

export default function SecondarySlider() {
  const navigate = useNavigate();

  const { data: categories } = useFetch('categories', 'categories');

  return (
    <div className="pb-8">
      <h2 className="py-5 text-mainColor text-xl font-semibold">Shop Popular Categories</h2>
      <div className="relative cursor-pointer">
        <Swiper loop={categories?.length > 6} autoplay={{ delay: 500, disableOnInteraction: false }} spaceBetween={10}
          pagination={{ clickable: true, el: '.custom-swiper-pagination' }} modules={[Autoplay, Navigation, Pagination]} className="pb-4"
          breakpoints={{
            0: {
              slidesPerView: 1.5,
            },
            480: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 6,
            },
          }}>
          {categories?.map((category) => (
            <SwiperSlide key={category._id} onClick={() => navigate(`/categories/${category._id}`)}>
              <div className="w-full h-64 overflow-hidden rounded-md">
                <img loading='lazy' src={category.image} className="w-full h-full object-cover" alt={category.name} />
              </div>
              <h2 className="text-center mt-2 text-sm text-hoverColor dark:text-white font-medium">{category.name}</h2>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
