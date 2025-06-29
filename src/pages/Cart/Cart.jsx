import { useContext, useEffect } from "react";
import CartItem from "../../components/CartItem/CartItem";
import { Link } from "react-router";
import AnimatedSVG from "../../components/AnimateSvg/AnimateSvg";
import animationData from '../../assets/images/Zero Purchase.json';
import { cartContext } from "../../Context/CartContext";
import Loading from "../../components/Loading/Loading";

export default function Cart() {
  const { getLoggedUserCart, cart, clearCart } = useContext(cartContext);

  useEffect(() => {
    document.title = "Cart";
    getLoggedUserCart();  
  }, []);

  if (!cart) {
    return (
      <div className="flex justify-center items-center py-8 ">
        <Loading />
      </div>
    );
  }

  if (cart.numOfCartItems === 0) {
    return (
      <div className="flex w-3/4 mx-auto items-center justify-start flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 rounded-lg flex justify-center mx-auto items-center p-8 text-center flex-col ">
          <h1 className="text-xl font-bold text-gray-600">
            Oops! Your Cart Is Empty, Start Shopping Now by Clicking the button
            below and find something you love! ❤
          </h1>
          <Link
            to="/"
            className="btn w-fit font-medium text-lg block bg-primary-500 hover:bg-primary-600 mt-5"
          >
            <i className="fa-solid fa-bag-shopping me-2"></i>Start Shopping
          </Link>
        </div>

        <div className="image w-full lg:w-1/2 lg:mt-0 -mt-5">
          <AnimatedSVG animationData={animationData} />
        </div>
      </div>
    );
  }

  return (
    <div className="cart bg-slate-200 p-5 pt-6 rounded-md">
      <h1 className="md:text-2xl text-xl font-bold ">
        <i className="fa-brands fa-opencart fa-fade text-4xl me-1 text-primary-500"></i>
        Shop Cart
      </h1>

      <div className="border sm:sticky top-20 bg-white shadow-md shadow-primary-500 border-primary-400 mt-5 rounded-full md:w-1/2 w-full mx-auto p-2">
        <h3 className="text-lg mt-2 font-semibold text-center">
          <i className="fa-solid fa-sack-dollar me-2 text-primary-500"></i>
          Total Cart Price:{" "}
          <span className="text-primary-500">{cart.data.totalCartPrice} EGP</span>
        </h3>
        <h4 className="text-lg mt-2 font-semibold text-gray-600 text-center">
          Total Cart Items: {cart.numOfCartItems}
        </h4>
      </div>

      <div className="cart-items mt-5 space-y-5">
        {cart.data.products.map((product) => (
  <CartItem key={product._id} item={product} />
))}

      </div>

      <button
        type="button"
        onClick={() => clearCart()}
        className="btn w-fit font-medium text-lg ml-auto block bg-red-700 hover:bg-red-600 mt-5"
      >
        <i className="fa-solid fa-trash me-2"></i>Clear Cart
      </button>

      <Link to={"/checkout"}>
        <button
          type="button"
          className="btn font-semibold text-lg bg-blue-700 hover:bg-blue-600 mt-5"
        >
          Next Step (Payment)
        </button>
      </Link>
    </div>
  );
}
