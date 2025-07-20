import React, { useContext } from 'react';
import { ShoppingCart, Heart, Eye, HeartCrack } from 'lucide-react';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../Redux/slices/cartSlice';
import { WashlistContext } from '../../Context/washListContext';

export default function ProductCard({ item, isWishlist = false }) {
    if (!item || !item.imageCover || !item.title || !item.category || !item.brand) {
        return null;
    }

    const dispatch = useDispatch();
    const { addProductToWishlist, removeProductFromWishlist } = useContext(WashlistContext);

    function handleWishlistAction() {
        if (isWishlist) {
            removeProductFromWishlist(item._id);
        } else {
            addProductToWishlist(item._id);
        }
    }

    return (
        <div className='bg-slate-200 shadow-2xl dark:bg-slate-600 p-3 rounded-2xl hover:scale-105 transition-all duration-300'
            data-aos="fade-up" data-aos-duration="800" data-aos-offset="120">
            {/* Image Container */}
            <div className='relative group rounded-2xl overflow-hidden'>
                <img src={item.imageCover} alt={item.title} loading='lazy'
                    className='rounded-2xl w-full object-cover transition-transform duration-500 group-hover:scale-125' />
                {/* Overlay Icons */}
                <div className='absolute inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-xs opacity-0 group-hover:opacity-100 flex justify-center items-center gap-4 transition-opacity duration-300 z-10'>
                    <div className='flex gap-4'>
                        {/* Add to Cart */}
                        {!isWishlist && (
                            <div onClick={() => dispatch(addProductToCart(item._id))} className='bg-mainColor rounded-full p-3 cursor-pointer text-white opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75'>
                                <ShoppingCart size={30} className='transition-transform duration-300 ease-in-out hover:scale-125 hover:rotate-12' />
                            </div>
                        )}
                        {/* Heart Icon */}
                        <div onClick={handleWishlistAction} className={`rounded-full p-3 cursor-pointer text-white opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-150 ${isWishlist ? 'bg-mainColor' : 'bg-mainColor'}`}>
                            {isWishlist ? (
                                <HeartCrack size={30} className="transition-transform duration-300 ease-in-out hover:scale-125 hover:rotate-12" />
                            ) : (
                                <Heart size={30} className="transition-transform duration-300 ease-in-out hover:scale-125 hover:rotate-12" />
                            )}
                        </div>
                        {/* Eye Icon */}
                        <Link to={`/products/${item._id}`}
                            className='bg-mainColor rounded-full p-3 cursor-pointer text-white opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-200'>
                            <Eye size={30} className='transition-transform duration-300 ease-in-out hover:scale-125 hover:rotate-12' />
                        </Link>
                    </div>
                </div>
            </div>
            {/* Product Info */}
            <div className='my-4'>
                <h3 className='text-xl font-extrabold dark:text-white'>
                    {item.title.split(' ').slice(0, 2).join(' ')}
                </h3>
                <p className='text-md font-semibold dark:text-gray-300'>{item.category.name}</p>
                <div className='text-sm text-slate-500 dark:text-gray-300 space-x-3'>
                    <span>{item.brand.name}</span>
                    <span>|</span>
                    <span className={item.quantity > 0 ? 'text-green-500' : 'text-red-500'}>
                        {item.quantity > 0 ? 'Available' : 'Sold Out'}
                    </span>
                </div>
                <div className='flex items-center justify-between gap-1 mt-1'>
                    <p className='text-xl font-bold text-amber-700 dark:text-mainColor mt-2'>{item.price} EGP</p>
                    <div>
                        <span className='text-yellow-500'>★</span>
                        <span className='text-sm dark:text-white'>{item.ratingsAverage}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}