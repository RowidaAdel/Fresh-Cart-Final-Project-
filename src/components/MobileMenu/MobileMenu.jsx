import React from 'react';
import { Link } from 'react-router';
import { CircleUserRound, Heart, LogIn, LogOut, ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useWishlistQuery } from '../../Hooks/useWishlistQuery';

export default function MobileMenu({ token, logout, toggleMobileMenu }) {

    const cart = useSelector((state) => state.cart.cart);
    const { data: wishlist = [] } = useWishlistQuery();

    const counter = cart?.numOfCartItems || 0;
    const wishlistCount = wishlist.length;

    return (
        <div className={`lg:hidden transition-all duration-500`}>
            <div className='bg-gray-300 dark:bg-slate-800 text-black dark:text-white p-8 z-50 space-y-5'>
                {token && (
                    <ul className='space-y-3'>
                        <li><Link to="/home" className='text-xl font-medium' onClick={toggleMobileMenu}>Home</Link></li>
                        <li><Link to="/products" className='text-xl font-medium' onClick={toggleMobileMenu}>Products</Link></li>
                        <li><Link to="/categories" className='text-xl font-medium' onClick={toggleMobileMenu}>Categories</Link></li>
                        <li><Link to="/brands" className='text-xl font-medium' onClick={toggleMobileMenu}>Brands</Link></li>
                        <li><Link to="/allorders" className='text-xl font-medium' onClick={toggleMobileMenu}>Orders</Link></li>
                    </ul>
                )}

                {token && (
                    <ul className='space-y-3 border-t pt-4'>
                        <li className='flex items-center gap-2'>
                            <Link to="/cart" onClick={toggleMobileMenu} className='flex items-center gap-2'>
                                <ShoppingCart size={20} />
                                <span>Cart</span>
                                {counter > 0 && <span className="bg-mainColor text-white px-2 rounded-full text-sm">{counter}</span>}
                            </Link>
                        </li>
                        <li className='flex items-center gap-2'>
                            <Link to="/washlist" onClick={toggleMobileMenu} className='flex items-center gap-2'>
                                <Heart size={20} />
                                <span>Wishlist</span>
                                {wishlistCount > 0 && <span className="bg-red-400 text-white px-2 rounded-full text-sm">{wishlistCount}</span>}
                            </Link>
                        </li>
                    </ul>
                )}

                <ul className='space-y-3 mt-4 border-t pt-4'>
                    {!token ? (
                        <>
                            <li className='flex items-center gap-2'>
                                <Link to="/login" className='text-xl font-medium flex items-center gap-2' onClick={toggleMobileMenu}>
                                    Login <LogIn size={20} />
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className='text-xl font-medium' onClick={toggleMobileMenu}>Register</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='flex items-center gap-2'>
                                <Link to="/profile" className='text-xl font-medium flex items-center gap-2' onClick={toggleMobileMenu}>
                                    Profile <CircleUserRound size={20} />
                                </Link>
                            </li>
                            <li className='flex items-center gap-2 text-xl font-medium cursor-pointer' onClick={() => {
                                logout();
                                toggleMobileMenu();
                            }}>
                                <span>Logout</span>
                                <LogOut size={20} />
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}
