import React, { useContext, useEffect } from "react";
import { WashlistContext } from "../../Context/washListContext";

export default function Wishlist() {
  const {
    wishlist,
    loading,
    removeProductFromWishlist,
    getLoggedUserWishlist,
  } = useContext(WashlistContext);

  useEffect(() => {
    document.title = "Wishlist";
    if(localStorage.getItem("token")){
            getLoggedUserWishlist();
        }
  }, []);

  if (loading) {
    return (
      <div className="mx-auto container p-6 animate-pulse">
        <div className="h-10 w-3/4 bg-gray-200 rounded mb-6" />
        <div className="space-y-3">
          <div className="border border-gray-300 shadow rounded-lg p-4 flex flex-col">
            <div className="animate-pulse bg-gray-200 rounded w-full h-40 mb-4" />
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="mt-auto h-10 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!wishlist || wishlist.length === 0) {
    return <p className="text-center mt-10 text-xl">Your wishlist is empty.</p>;
  }

  return (
    <div className=" mx-auto container p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">My Wishlist</h1>
      <div className="space-y-3">
        {wishlist.map((item,index) => (
          <div
key={index}
            className="border border-mainColor shadow-mainColor rounded-lg shadow p-4 flex flex-col"
          >
            <img
              src={
                item.images?.[0]?.startsWith('http')
                  ? item.images[0]
                  : `https://ecommerce.routemisr.com/Route-Academy-products/${item.images?.[0]}`
              }
              alt={item.title || item.name}
              className="w-full h-80 object-cover rounded-md mb-4"
            />
            <h2 className="font-semibold text-lg mb-2">{item.title || item.name}</h2>
            <button
              onClick={() => removeProductFromWishlist(item._id)}
              className="mt-auto self-center bg-red-400 hover:bg-red-600 text-white py-2 px-4 rounded-md transition inline-block"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
