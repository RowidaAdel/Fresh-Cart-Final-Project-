import { Link } from "react-router";

export default function CategoryBox({ info }) {
  const { img, des, head, price } = info
  return (
    <div className="relative" >
      <img src={img} alt="SliderImage" className="w-full object-cover h-[500px] block" width={1200} height={500} />
      <div className="layer sm:space-y-4 space-y-2  absolute top-0 left-0 md:w-2/3 w-4/6  h-full flex flex-col justify-center items-start p-3 sm:p-8">
        <span className="sm:text-lg text-md">Exclusive Offer <span className="bg-red-700 text-sm ml-2 p-1 font-semibold text-white rounded-xl">{des}%</span></span>
        <h3 className="sm:text-5xl text-3xl md:w-5/6 sm:py-2 font-semibold ">{head}</h3>
        <p className="text-gray-700 py-1 text-lg">Only on this week... Don’t miss</p>
        <p className=" text-xl py-2"> Start From <span className="font-bold text-red-600"> {price} EGP</span></p>
        <Link to={"/products"} className="btn bg-mainColor text-white w-fit">Shop Deals Now</Link >
      </div>
    </div>
  )
}