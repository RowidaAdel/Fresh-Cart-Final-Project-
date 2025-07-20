import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router';
import Loading from '../../components/Loading/Loading';
import { ShoppingCart } from 'lucide-react';
import { authContext } from '../../Context/authContext';
import useFetch from '../../Hooks/useFetch';
import AOS from 'aos';
import 'aos/dist/aos.css';

function getUserIdFromToken(token) {
  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    return payload.id;
  } catch (error) {
    console.error("❌ Failed to parse token:", error);
    return null;
  }
}

export default function AllOrders() {
  useEffect(() => {
    document.title = 'All Orders';
    AOS.init({ duration: 1000, once: false });
  }, []);

  const { token } = useContext(authContext);
  const userId = getUserIdFromToken(token);

  const {data,isLoading, isError} = useFetch(`orders/user/${userId}`, ['allOrders', userId], {
    headers: { token },
    enabled: !!token && !!userId,
  });
  if (!token) {
    return (
      <div className="min-h-[80vh] bg-slate-100 dark:bg-gray-800 flex flex-col justify-center items-center text-center px-4">
        <p className="text-lg text-gray-600 dark:text-gray-300">Please log in to view your orders.</p>
        <Link to="/login" className="btn mt-4 bg-mainColor hover:bg-hoverColor text-white px-6 py-2 rounded-xl transition">
          Go to Login
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="loading bg-slate-200 dark:bg-gray-800 min-h-[80vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-slate-200 dark:bg-gray-800 min-h-[80vh] flex items-center justify-center">
        <p className="text-center text-red-500">Something went wrong while loading your orders.</p>
      </div>
    );
  }

  const orders = Array.isArray(data) ? data : [];

  return (
    <div className="bg-slate-200 dark:bg-gray-800 min-h-[80vh]">
      <div className="py-7 container">
        <div className="h-px bg-slate-300 dark:bg-slate-500 my-1" />
        <h2 className="title" data-aos="zoom-out">All Orders</h2>
        <div className="h-px bg-slate-300 dark:bg-slate-500 my-1" />

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-16 gap-4">
            <i className="fa-solid fa-box-open text-5xl text-gray-400"></i>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No orders yet</h3>
            <p className="text-sm text-gray-500">Looks like you haven’t made any orders yet.</p>
            <Link to="/" className="btn mt-6 inline-flex items-center gap-2 text-white text-lg bg-mainColor hover:bg-hoverColor px-6 py-3 rounded-xl transition">
              Start Shopping
              <ShoppingCart />
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2">
            {orders.map((order, index) => (
              <div key={order._id} className="p-5 bg-white dark:bg-slate-700 shadow rounded-xl flex flex-col md:flex-row gap-4"
                data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'} >
                <div className="w-full md:w-1/4 flex justify-center">
                  <img loading='lazy' src={order.cartItems[0]?.product.imageCover} alt={order.cartItems[0]?.product.title} className="w-32 h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    Order ID: <span className="text-mainColor">#{order._id}</span>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Date: {order.createdAt?.split('T')[0]}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Product: {order.cartItems[0]?.product.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Quantity: {order.cartItems.length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Payment: {order.paymentMethodType}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Paid: {order.isPaid ? "✅" : "❌"}</p>
                  <p className="font-bold text-lg text-mainColor mt-2">Total: {order.totalOrderPrice} EGP</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}