import React from 'react';
import { Link } from 'react-router';
import { CircleUserRound, LogIn, LogOut } from 'lucide-react';

export default function MobileMenu({ token, logout, toggleMobileMenu }) {
    return (
        <div className={`lg:hidden transition-all duration-500`}>
            <div className='bg-gray-300 p-8 z-50'>
                {token && (
                    <ul className='space-y-3'>
                        <li><Link to="/home" className='text-xl font-medium link-hover relative afterEffect cursor-pointer' onClick={toggleMobileMenu}>Home</Link></li>
                        <li><Link to="/products" className='text-xl font-medium link-hover relative afterEffect cursor-pointer' onClick={toggleMobileMenu}>Products</Link></li>
                        <li><Link to="/categories" className='text-xl font-medium link-hover relative afterEffect cursor-pointer' onClick={toggleMobileMenu}>Categories</Link></li>
                        <li><Link to="/brands" className='text-xl font-medium link-hover relative afterEffect cursor-pointer' onClick={toggleMobileMenu}>Brands</Link></li>
                        <li><Link to="/order" className='text-xl font-medium link-hover relative afterEffect cursor-pointer' onClick={toggleMobileMenu}>Order</Link></li>
                    </ul>
                )}
                <ul className='space-y-3 mt-4 border-t pt-4'>
                    {!token ? (
                        <>
                            <li className='flex items-center gap-2'>
                                <Link to="/login" className='text-xl font-medium link-hover relative afterEffect cursor-pointer' onClick={toggleMobileMenu}>
                                    Login
                                </Link>
                                <LogIn size={20} />
                            </li>
                            <li>
                                <Link to="/register" className='text-xl font-medium link-hover relative afterEffect cursor-pointer' onClick={toggleMobileMenu}>
                                    Register
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='flex items-center gap-2'>
                                <Link
                                    to="/profile"
                                    className='text-xl font-medium link-hover relative afterEffect cursor-pointer'
                                    onClick={toggleMobileMenu}
                                >
                                    Profile
                                </Link>
                                <CircleUserRound size={20} />
                            </li>
                            <li className='flex items-center gap-2 text-xl font-medium cursor-pointer'>
                                <span
                                    onClick={() => {
                                        logout();
                                        toggleMobileMenu();
                                    }}
                                    className='link-hover relative afterEffect'
                                >
                                    Logout
                                </span>
                                <LogOut size={20} />
                            </li>

                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}
