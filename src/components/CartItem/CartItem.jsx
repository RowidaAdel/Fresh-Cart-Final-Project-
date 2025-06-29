import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../Context/CartContext';

export default function CartItem({ item }) {
  let { removeCartItem, updateCartItem, disabledbtn } = useContext(cartContext);
  let [count, setCount] = useState(item?.count);

  useEffect(() => {
    setCount(item?.count);
  }, [item?.count]);

  function updateCounter() {
    if (+count === item?.count) return;
    updateCartItem(item.product._id, +count);
  }

  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img src={item?.product?.imageCover} alt="product-image" className="w-full rounded-lg sm:w-40" />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{item?.product?.title}</h2>
          <p className="mt-1 text-xs text-gray-700">{item?.product?.category?.name}</p>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <button
              disabled={disabledbtn}
              onClick={() => {
                const newCount = Math.max(+count - 1, 1);
                setCount(newCount);
                updateCartItem(item.product._id, newCount);
              }}
              className="disabled:cursor-not-allowed cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              -
            </button>
            <input
              className="h-8 w-28 border bg-white text-center text-xs outline-none"
              type="number"
              onChange={(e) => setCount(e.target.value)}
              onBlur={updateCounter}
              min={1}
              value={count}
            />
            <button
              disabled={disabledbtn}
              onClick={() => {
                const newCount = +count + 1;
                setCount(newCount);
                updateCartItem(item.product._id, newCount);
              }}
              className="disabled:cursor-not-allowed cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              +
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm">${item?.price}</p>
            <button
              onClick={() => removeCartItem(item.product._id)}
              className="btn p-1.5 bg-red-200 hover:bg-red-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
