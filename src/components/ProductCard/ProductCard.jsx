import React, { useContext } from 'react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Link } from 'react-router';
import { cartContext } from '../../Context/CartContext';
import { WashlistContext } from '../../Context/washListContext';

export default function ProductCard({ item }) {
    let { addProductToCart } = useContext(cartContext)
    const { addProductToWishlist } = useContext(WashlistContext);

    function handleAddToWishlist() {
        addProductToWishlist(item._id);
    }

    return (
        <div className='bg-slate-200 shadow-2xl dark:bg-slate-600 p-3 rounded-2xl hover:scale-105 transition-all duration-300'>
            {/* Image */}
            <div className='relative group rounded-2xl overflow-hidden'>
                <img src={item.imageCover} alt={item.title} className='rounded-2xl w-full object-cover' />
                {/* Overlay */}
                <div className='absolute inset-0 bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center gap-4 transition-opacity duration-300'>
                    <div className='flex gap-4'>
                        {/* Cart Icon */}
                        <div onClick={() => addProductToCart(item._id)} className='bg-mainColor rounded-full p-3 cursor-pointer text-white opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75 ' >
                            <ShoppingCart size={30} className='transition-transform duration-300 ease-in-out hover:scale-125 hover:rotate-12' />
                        </div>
                        {/* Heart Icon */}
                        <div onClick={handleAddToWishlist} className="bg-mainColor rounded-full p-3 cursor-pointer text-white opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-150 ">
                            <Heart size={30} className='transition-transform duration-300 ease-in-out hover:scale-125 hover:rotate-12' />
                        </div>
                        {/* Eye Icon */}
                        <Link to={`/productdetails/${item._id}`} className='bg-mainColor rounded-full p-3 cursor-pointer text-white opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-200 '>
                            <Eye size={30} className='transition-transform duration-300 ease-in-out hover:scale-125 hover:rotate-12' />
                        </Link>
                    </div>
                </div>

            </div>
            {/* Details */}
            <div className='my-4'>
                <h3 className='text-2xl font-extrabold dark:text-white'>{item.title.split(' ').slice(0, 2).join(' ')}</h3>
                <p className='text-md font-semibold dark:text-gray-300'>{item.category.name}</p>
                <div className='text-sm text-slate-500 dark:text-gray-300 space-x-3'>
                    <span>{item.brand.name}</span>
                    <span>|</span>
                    {item.quantity > 0 ? (
                        <span className='text-green-500'>Available</span>
                    ) : (
                        <span className='text-red-500'>Sold Out</span>
                    )
                    }
                </div>
                <div className="flex items-center justify-between gap-1 mt-1">
                    <p className='text-xl font-bold text-amber-700 dark:text-mainColor mt-2'>{item.price} EGP</p>
                    <div>
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm dark:text-white">{item.ratingsAverage}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
