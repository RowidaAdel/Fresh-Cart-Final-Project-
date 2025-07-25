import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../Redux/slices/cartSlice';
import { WashlistContext } from '../../Context/washListContext';
import { useWishlistQuery } from '../../Hooks/useWishlistQuery';

export default function ProductCard({ item, isWishlist = false }) {
    if (!item || !item.imageCover || !item.title || !item.category || !item.brand) {
        return null;
    }

    const dispatch = useDispatch();
    const { addProductToWishlist, removeProductFromWishlist } = React.useContext(WashlistContext);
    const { data: wishlistData } = useWishlistQuery();

    const isInWishlist =
        Array.isArray(wishlistData) &&
        wishlistData.some((product) => product && product._id === item._id);

    function handleWishlistAction() {
        if (isInWishlist) {
            const event = new CustomEvent('remove-from-wishlist', {
                detail: item._id,
            });
            window.dispatchEvent(event);
        } else {
            addProductToWishlist(item._id);
        }
    }

    function calculateDiscount(price, priceAfterDiscount) {
        if (!priceAfterDiscount || priceAfterDiscount >= price) return null;
        const discount = 100 - Math.floor((priceAfterDiscount / price) * 100);
        return discount;
    }

    const discount = calculateDiscount(item.price, item.priceAfterDiscount);

    return (
        <div className='bg-slate-200 shadow-2xl dark:bg-slate-600 p-3 rounded-2xl hover:scale-105 transition-all duration-300'
            data-aos="fade-up" data-aos-duration="800" data-aos-offset="120" >
            {/* Image Container */}
            <div className='relative group rounded-2xl overflow-hidden'>
                {/* Discount Badge */}
                {discount && (
                    <div className="absolute bg-green-700 top-0 left-0 size-14 bg-darkPrimary flex flex-col justify-center items-center font-bold rounded-full rounded-tl-none z-20">
                        <span className="text-orange-400">-{discount}%</span>
                        <span className="text-green-500">Sale</span>
                    </div>
                )}
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
                        <div onClick={handleWishlistAction} className="bg-mainColor rounded-full p-3 cursor-pointer opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-150">
                            <i className={`fa-solid fa-heart text-[30px] transition-transform duration-300 ease-in-out hover:scale-125 hover:rotate-12 ${isInWishlist ? 'text-red-500' : 'text-white'}`} />
                        </div>
                        {/* Eye Icon */}
                        <Link to={`/products/${item._id}`} className='bg-mainColor rounded-full p-3 cursor-pointer text-white opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-200'>
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
                    <p className='text-xl font-bold text-amber-700 dark:text-mainColor mt-2'>
                        {item.priceAfterDiscount ? item.priceAfterDiscount : item.price} EGP
                    </p>
                    <div>
                        <span className='text-yellow-500'>★</span>
                        <span className='text-sm dark:text-white'>{item.ratingsAverage}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
