import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import slider1 from "../../assets/images/slider-image-1.webp";
import slider2 from "../../assets/images/slider-image-2.webp";
import slider3 from "../../assets/images/slider-image-3.webp";
import slider4 from "../../assets/images/grocery-banner-2.webp";
import slider5 from "../../assets/images/slider-2.webp";
import CategoryBox from "../CategoryBox/CategoryBox";

export default function PrimarySlider() {
    return (
<div className="grid grid-cols-1 md:grid-cols-3 items-stretch p-4 overflow-hidden">
            <div className="md:col-span-2 w-full">
                <Swiper className="w-full" modules={[Autoplay, Pagination]} autoplay={{ delay: 3000 }} pagination={{ clickable: true }} loop={true} >
                    <SwiperSlide>
                        <CategoryBox info={{ img: slider1, des: 30, head: "New Groceries Deals", price: "250" }} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CategoryBox info={{ img: slider2, des: 15, head: "Best Chocolate Offers", price: "150" }} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CategoryBox info={{ img: slider3, des: 40, head: "Snack & Chips Offers", price: "300" }} />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="hidden md:flex flex-col">
                <div className="relative w-full h-[250px]">
                    <img loading="lazy" src={slider4} className="relative w-full h-[150px] sm:h-[200px] md:h-[250px]" alt="Slider" width={80} height={40}/>
                    <div className="absolute top-1/2 -translate-y-1/2 left-4">
                        <h3 className="text-slate-800 text-xl font-bold">Best Bread</h3>
                    </div>
                </div>
                <div className="relative w-full h-[250px]">
                    <img loading="lazy"src={slider5} className="relative w-full h-[150px] sm:h-[200px] md:h-[250px]" alt="Slider" width={80} height={40}/>
                    <div className="absolute top-1/2 -translate-y-1/2 left-4">
                        <h3 className="text-slate-800 text-xl font-bold">Best Vegetables</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}