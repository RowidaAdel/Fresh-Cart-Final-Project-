import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem, updateCartItem } from "../../Redux/slices/cartSlice";
import { CircleX } from 'lucide-react';

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const disabledbtn = useSelector((state) => state.cart.disabledbtn);
  const [count, setCount] = useState(item?.count);

  useEffect(() => {
    setCount(item?.count);
  }, [item?.count]);

  const updateCounter = () => {
    if (+count === item?.count) return;
    dispatch(updateCartItem({ itemId: item.product._id, count: +count }));
  };

  const getShortTitle = (title) => {
    if (!title) return '';
    const words = title.split(' ');
    return words.slice(0, 3).join(' ') + (words.length > 3 ? '...' : '');
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white dark:bg-gray-700 rounded-xl shadow-md p-5">
      {/* Image */}
      <div className="w-full md:w-24 h-24 rounded-md overflow-hidden flex-shrink-0 border border-gray-500">
        <img loading='lazy' src={item?.product?.imageCover} alt={item?.product?.title || 'product'} className="w-full h-full object-cover" />
      </div>
      {/* Details */}
      <div className="flex-1 w-full md:px-4 text-center md:text-left">
        <h2 className="text-lg font-bold text-mainColor dark:text-white">
          {getShortTitle(item?.product?.title)}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {item?.product?.category?.name} | {item?.product?.brand?.name || 'Brand'} |
          <span className="text-green-600 ml-1">Available</span>
        </p>
        <p className="text-sm text-amber-600 font-semibold mt-1">Rate: ⭐ 4.8</p>
        <p className="text-sm text-gray-500 font-semibold mt-1">Price:{item?.price} EGP</p>
      </div>
      {/* Counter + Total + Delete */}
      <div className="flex flex-row items-center gap-2">
        <div className="flex items-center border border-gray-400 rounded-md overflow-hidden">
          <button disabled={disabledbtn} onClick={() => {
            const newCount = Math.max(+count - 1, 1);
            setCount(newCount);
            dispatch(updateCartItem({ itemId: item.product._id, count: newCount }));
          }}
            className="px-3 py-1 bg-mainColor text-white hover:bg-hoverColor">
            -
          </button>
          <input type="number" id={`count-${item._id}`} name={`count-${item._id}`} value={count}
            onChange={(e) => setCount(e.target.value)} onBlur={updateCounter}
            className="w-12 text-center outline-none border-x dark:text-white border-gray-300 dark:border-gray-600" />
          <button disabled={disabledbtn}
            onClick={() => {
              const newCount = +count + 1;
              setCount(newCount);
              dispatch(updateCartItem({ itemId: item.product._id, count: newCount }));
            }}
            className="px-3 py-1 bg-mainColor text-white hover:bg-hoverColor">
            +
          </button>
        </div>
        <p className="text-md text-mainColor dark:text-white">Total: {item.price * count} EGP</p>
        <button className="cursor-pointer group order-last max-sm:order-first p-2 rounded-full border-2 border-transparent text-gray-500 hover:text-red-600 hover:border-red-600 transition-transform duration-300 ease-in-out"
          onClick={() => dispatch(removeCartItem(item.product._id))} aria-label="Remove item"
          onMouseEnter={e => e.currentTarget.style.transform = 'rotate(90deg)'} onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0deg)'}
          onFocus={e => e.currentTarget.style.transform = 'rotate(90deg)'} onBlur={e => e.currentTarget.style.transform = 'rotate(0deg)'}>
          <CircleX size={20} />
        </button>
      </div>
    </div>
  );
}
