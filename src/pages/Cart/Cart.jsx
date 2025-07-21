import { useEffect } from "react";
import CartItem from "../../components/CartItem/CartItem";
import { Link } from "react-router";
import AnimatedSVG from "../../components/AnimateSvg/AnimateSvg";
import animationData from '../../assets/images/zeroPurchase.json';
import Loading from "../../components/Loading/Loading";
import { ArrowBigRightDash, ShoppingCart, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getLoggedUserCart } from "../../Redux/slices/cartSlice";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from "react-helmet";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    document.title = "Cart";
    dispatch(getLoggedUserCart());
  }, [dispatch]);
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, [])
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 bg-slate-200 dark:bg-gray-800 min-h-[80vh]">
        <Loading />
      </div>
    );
  }

  const totalCartPrice = cart?.data?.totalCartPrice ?? 0;
  const numOfCartItems = cart?.numOfCartItems ?? 0;
  const products = cart?.data?.products ?? [];

  if (!cart || numOfCartItems === 0) {
    return (
      <div className="bg-slate-200 dark:bg-gray-800 py-10 min-h-[80vh] flex justify-center items-center">
        <div className="flex w-11/12 lg:w-3/4 items-center justify-center flex-col lg:flex-row gap-10">
          <div className="text-center lg:w-1/2" data-aos='fade-left'>
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 leading-relaxed">
              Oops! Your Cart Is Empty.<br />Start shopping now and find something you love! ❤
            </h3>
            <Link to="/" className="btn mt-6 inline-flex items-center gap-2 text-white text-lg bg-mainColor hover:bg-hoverColor px-6 py-3 rounded-xl transition">
              Start Shopping <ShoppingCart />
            </Link>
          </div>
          <div className="lg:w-1/2 w-full" data-aos='fade-right'>
            <AnimatedSVG animationData={animationData} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta name="description" content="Review the items in your cart and proceed to secure checkout. Fast delivery and great deals await at Fresh Cart." />
      </Helmet>
      <div className="bg-slate-200 dark:bg-gray-800 min-h-[80vh] py-10">
        <div className="container">
          {/* Total Summary Card */}
          <div data-aos="zoom-out" className="bg-white dark:bg-gray-700 border border-mainColor shadow-lg p-4 rounded-2xl max-w-sm mx-auto mb-8 text-center">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-100">
              <i className="fa-solid fa-sack-dollar me-2 text-mainColor"></i>
              Total Price:{" "}
              <span className="text-mainColor font-bold">{totalCartPrice} EGP</span>
            </h3>
            <h4 className="text-md mt-2 font-medium text-gray-600 dark:text-gray-300">
              Total Items: {numOfCartItems}
            </h4>
          </div>
          {/* Cart Items */}
          <div className="cart-items mt-5 grid grid-cols-1 gap-5">
            {products.map((product, index) => (
              <div data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'} key={product._id}>
                <CartItem item={product} />
              </div>
            ))}
          </div>
          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-between gap-4">
            <button onClick={() => dispatch(clearCart())} className="btn gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl flex-1 sm:flex-none">
              Clear Cart
              <Trash />
            </button>
            <Link to="/checkout" className="flex-1 sm:flex-none">
              <button className="btn bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded-xl w-full sm:w-auto">
                Next Step (Payment)
                <ArrowBigRightDash />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}