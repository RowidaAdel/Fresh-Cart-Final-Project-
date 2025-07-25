import React, { useEffect, useContext } from "react";
import { WashlistContext } from "../../Context/washListContext";
import { Heart } from "lucide-react";
import AnimatedSVG from "../../components/AnimateSvg/AnimateSvg";
import animationData from '../../assets/images/zeroPurchase.json';
import { Link } from "react-router";
import Loading from '../../components/Loading/Loading';
import ProductCard from "../../components/ProductCard/ProductCard";
import toast from "react-hot-toast";
import { authContext } from "../../Context/authContext";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from "react-helmet";

export default function Wishlist() {
  const { wishlist, loading, removeProductFromWishlist, getLoggedUserWishlist } = useContext(WashlistContext);
  const { token } = useContext(authContext);

  useEffect(() => {
    document.title = "Wishlist";
    AOS.init({ duration: 200, once: true });
    getLoggedUserWishlist()
  }, []);

  if (!token) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-gray-500">Please log in to see your wishlist.</p>
      </div>
    );
  }

   if (loading) {
    return (
      <div className="loading bg-slate-200 dark:bg-gray-800 min-h-[80vh] flex justify-center items-center">
        <Loading />
      </div>
    )
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="bg-slate-200 dark:bg-gray-800 min-h-[80vh] py-10">
        <div className="flex w-11/12 lg:w-3/4 mx-auto items-center justify-center flex-col lg:flex-row gap-10">
          <div data-aos="fade-right" className="w-full lg:w-1/2 flex flex-col items-center text-center px-4">
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-200">
              Your Wishlist is Empty! 💔<br />Start exploring products and add your favorites.
            </h3>
            <Link to="/products" className="btn w-fit flex items-center gap-2 font-medium text-white text-lg bg-mainColor hover:bg-hoverColor mt-6 px-6 py-3 rounded-xl">
              Browse Products <Heart />
            </Link>
          </div>
          <div data-aos="fade-left" className="w-full lg:w-1/2">
            <AnimatedSVG animationData={animationData} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta name="description" content="Keep track of your favorite products with your wishlist. Save items you love and shop later with ease." />
      </Helmet>
      <div className="bg-slate-200 dark:bg-gray-800 min-h-[80vh] py-6">
        <div className="container">
          <div className="h-px bg-slate-300 dark:bg-slate-500 my-1" />
          <h2 className="title" data-aos="fade-up">My Wishlist</h2>
          <div className="h-px bg-slate-300 dark:bg-slate-500 mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item, index) => (
              <div key={item._id} data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'} >
                <ProductCard item={item} isWishlist={true} />
              </div>
            ))}
          </div>
          {wishlist.length > 0 && (
            <div className="text-center mt-10" data-aos="fade-up">
              <button onClick={() => {
                wishlist.forEach((item) => removeProductFromWishlist(item._id));
                toast.success("Wishlist cleared!");
              }}
                className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition" >
                Clear Wishlist
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}