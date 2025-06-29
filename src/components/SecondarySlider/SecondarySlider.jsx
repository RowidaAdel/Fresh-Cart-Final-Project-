import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';

export default function SecondarySlider() {
  let [categories, setCategories] = useState(null);

  async function getCategories() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="pb-8">
      <h2 className="py-5 text-mainColor text-2xl font-semibold">Shop Popular Categories</h2>

      {/* Wrapper to push dots under */}
      <div className="relative">
        <Swiper
          slidesPerView={7}
          autoplay={{
            delay: 500,
            disableOnInteraction: false,
          }}
          navigation={true}
          pagination={{
            clickable: true,
            el: '.custom-swiper-pagination',
          }}
          modules={[Autoplay, Navigation, Pagination]}
          className="pb-4"
        >
          {categories?.map((category, index) => (
            <SwiperSlide key={index}>
              <img
                src={category.image}
                className="w-[700px] h-[250px] object-cover"
                alt={`Category ${index}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination container */}
        <div className="custom-swiper-pagination mt-4 flex justify-center"></div>
      </div>
    </div>
  );
}
