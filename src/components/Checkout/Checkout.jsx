import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getLoggedUserCart } from "../../Redux/slices/cartSlice";
import { authContext } from "../../Context/authContext";
import checkoutPhoto from "../../assets/images/checkout.webp";
import { useContext } from "react";
import { CreditCard, DollarSign } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

export default function Checkout() {
  const [loadingCash, setLoadingCash] = useState(false);
  const [loadingOnline, setLoadingOnline] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { token } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Checkout";
    AOS.init({ duration: 1000, once: false });
  }, []);

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    validationSchema: Yup.object({
      shippingAddress: Yup.object({
        details: Yup.string().required("Required").min(10).max(100),
        city: Yup.string().required("Required").min(3).max(20),
        phone: Yup.string().required("Required").matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
      }),
    }),
    onSubmit: () => { },
  });

  function handleCashOrder() {
    if (!cart?.cartId) return toast.error("Cart not loaded yet!");

    const toastId = toast.loading("Processing your order...");
    setLoadingCash(true);

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
        { shippingAddress: formik.values.shippingAddress },
        { headers: { token } }
      )
      .then(() => {
        toast.success("Order placed successfully!");
        dispatch(getLoggedUserCart());
        setTimeout(() => navigate("/allorders"), 1000);
      })
      .catch((err) =>
        toast.error(err?.response?.data?.message || "Something went wrong")
      )
      .finally(() => {
        toast.dismiss(toastId);
        setLoadingCash(false);
      });
  }

  function handleOnlinePayment() {
    if (!cart?.cartId) return toast.error("Cart not loaded yet!");

    const toastId = toast.loading("Redirecting to payment page...");
    setLoadingOnline(true);

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=${location.origin}`,
        {
          shippingAddress: formik.values.shippingAddress,
          paymentMethod: "online",
        },
        { headers: { token } }
      )
      .then(({ data }) => {
        toast.success("Redirecting...");
        dispatch(getLoggedUserCart());
        setTimeout(() => {
          window.location.href = data.session.url;
        }, 1000);
      })
      .catch((err) =>
        toast.error(err?.response?.data?.message || "Something went wrong")
      )
      .finally(() => {
        toast.dismiss(toastId);
        setLoadingOnline(false);
      });
  }

  return (
    <>
      <Helmet>
        <meta name="description" content="Complete your first order with Fresh Cart. Fast, secure checkout with trusted payment options." />
      </Helmet>
      <div className="flex items-center justify-center">
        <div className="formContainer">
          {/* Right side - Form */}
          <div className="divForm" data-aos="fade-left">
            <h2 className="titleForm" data-aos="fade-up">Checkout Now:</h2>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="city" className="block mb-1">
                  City
                </label>
                <input type="text" name="shippingAddress.city" id="city" className="input"
                  value={formik.values.shippingAddress.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.shippingAddress?.city &&
                  formik.errors.shippingAddress?.city && (
                    <p className="formikError">
                      {formik.errors.shippingAddress.city}
                    </p>
                  )}
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1">
                  Phone
                </label>
                <input type="tel" name="shippingAddress.phone" id="phone" className="input"
                  value={formik.values.shippingAddress.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.shippingAddress?.phone &&
                  formik.errors.shippingAddress?.phone && (
                    <p className="formikError">
                      {formik.errors.shippingAddress.phone}
                    </p>
                  )}
              </div>
              <div>
                <label htmlFor="details" className="block mb-1">
                  Address Details
                </label>
                <textarea name="shippingAddress.details" id="details" className="input"
                  value={formik.values.shippingAddress.details} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.shippingAddress?.details &&
                  formik.errors.shippingAddress?.details && (
                    <p className="formikError">
                      {formik.errors.shippingAddress.details}
                    </p>
                  )}
              </div>
              {/* Payment Buttons */}
              <div className="mt-6 flex gap-4">
                <button type="button" onClick={() => {
                  if (formik.dirty && formik.isValid) {
                    handleCashOrder();
                  } else {
                    toast.error("Please fill out the form correctly.");
                  }
                }}
                  disabled={loadingCash || !formik.dirty || !formik.isValid} className={`loadingBtn ${loadingCash ? "cursor-not-allowed" : "hover:bg-hoverColor"}`}>
                  <DollarSign size={18} />
                  {loadingCash ? "Processing..." : "Pay with Cash"}
                </button>
                <button type="button" onClick={() => {
                  if (formik.dirty && formik.isValid) {
                    handleOnlinePayment();
                  } else {
                    toast.error("Please fill out the form correctly.");
                  }
                }} disabled={loadingOnline || !formik.dirty || !formik.isValid}
                  className={`loadingBtn bg-white text-mainColor ${loadingOnline ? "cursor-not-allowed" : "hover:text-white hover:bg-hoverColor"}`} >
                  <CreditCard size={18} />
                  {loadingOnline ? "Processing..." : "Pay Online"}
                </button>
              </div>
            </form>
          </div>
          {/* Left side - Image */}
          <div className="imgSide" data-aos="fade-right">
            <img loading="lazy" src={checkoutPhoto} alt="Checkout illustration" className="max-w-full h-auto" />
          </div>
        </div>
      </div>
    </>
  );
}
