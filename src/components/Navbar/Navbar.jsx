import { CircleUserRound, Heart, LogIn, LogOut, Menu, Moon, ShoppingCart, Sun, X } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { authContext } from '../../Context/authContext';
import logo from '../../assets/images/favicon.png'
import { cartContext } from '../../Context/CartContext';
import MobileMenu from '../MobileMenu/MobileMenu';
import { WashlistContext } from '../../Context/washListContext';


export default function Navbar({ toggletheme, theme }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    let { cart } = useContext(cartContext)
    let [counter, setCounter] = useState(cart?.numOfCartItems)
    const [animateCart, setAnimateCart] = useState(false);
    const [animateWishlist, setAnimateWishlist] = useState(false);

    const { wishlist } = useContext(WashlistContext);

    const wishlistCount = wishlist?.length || 0;

    function toggleMobileMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    let { token, setToken } = useContext(authContext)
    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
    }
    useEffect(() => {
        setCounter(cart?.numOfCartItems)
    }, [cart])
    useEffect(() => {
        if (counter > 0) {
            setAnimateCart(true);
            setTimeout(() => setAnimateCart(false), 200);
        }
    }, [counter]);

    useEffect(() => {
        if (wishlistCount > 0) {
            setAnimateWishlist(true);
            setTimeout(() => setAnimateWishlist(false), 200);
        }
    }, [wishlistCount]);

    return (
        <div className='py-4 bg-gray-300 dark:bg-slate-900 shadow-xl relative'>
            <div className="container flex justify-between items-center dark:text-white">
                <div className="flex items-center gap-2 font-extrabold">
                    <img src={logo} alt="Logo" className="w-10 h-8 object-cover" />
                    <h1 className='text-3xl font-extrabold'>Fresh<span className='text-mainColor'>Cart</span></h1>
                </div>

                {token ? (
                    <ul className='hidden lg:flex justify-between items-center space-x-3'>
                        <li className='text-xl font-semibold link-hover relative afterEffect cursor-pointer'>
                            <Link to="/home">Home</Link>
                        </li>
                        <li className='text-xl font-semibold link-hover relative afterEffect cursor-pointer'>
                            <Link to="/products">Products</Link>
                        </li>
                        <li className='text-xl font-semibold link-hover relative afterEffect cursor-pointer'>
                            <Link to="/categories">Categories</Link>
                        </li>
                        <li className='text-xl font-semibold link-hover relative afterEffect cursor-pointer'>
                            <Link to="/brands">Brands</Link>
                        </li>
                    </ul>) : null}

                <ul className='hidden lg:flex justify-between items-center space-x-3'>
                    <li className="hover:-translate-y-2 text-xl font-semibold cursor-pointer link-hover relative transition-all duration-300"
                        onClick={toggletheme} >
                        {theme === 'light' ? <Moon /> : <Sun />}
                    </li>
                    {token ? (
                        <>
                            <li className={`hover:-translate-y-2 text-xl font-semibold cursor-pointer link-hover relative transition-all duration-300 ${animateCart ? 'animate-bounce' : ''}`}>
                                <Link to="/cart"><ShoppingCart /></Link>
                                {counter > 0 && (
                                    <div className='absolute -top-3 -left-3 size-5 text-white text-sm text-center rounded-full bg-mainColor'>
                                        {cart?.numOfCartItems}
                                    </div>
                                )}
                            </li>
                            <li onClick={() => navigate('/washlist')} className={`hover:-translate-y-2 text-xl font-semibold cursor-pointer link-hover relative transition-all duration-300 ${animateWishlist ? 'animate-bounce' : ''}`}>
                                <Heart />
                                {wishlistCount > 0 && (
                                    <div className="absolute -top-3 -left-3 w-5 h-5 flex items-center justify-center text-white text-sm rounded-full bg-red-400">
                                        {wishlistCount}
                                    </div>
                                )}
                            </li>

                        </>
                    ) : null}
                    {!token ? (
                        <>
                            <li className='text-xl cursor-pointer link-hover relative afterEffect'>
                                <Link to="/register">Register</Link>
                            </li>
                            <li className='text-xl cursor-pointer link-hover relative afterEffect flex justify-center items-center gap-2'>
                                <Link to="/login">Login</Link>
                                <LogIn />
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='text-xl font-semibold cursor-pointer link-hover relative transition-all duration-300 hover:-translate-y-2' onClick={() => navigate('/profile')}>
                                <CircleUserRound />
                            </li>
                            <li onClick={logout}
                                className='text-xl cursor-pointer link-hover relative afterEffect flex justify-center items-center gap-2'>
                                <span>Logout</span>
                                <LogOut />
                            </li>
                        </>
                    )}
                </ul>
                <div className='flex items-center gap-4 lg:hidden'>
                    <button onClick={toggletheme} className='cursor-pointer'>
                        {theme === 'light' ? <Moon /> : <Sun />}
                    </button>
                    <button onClick={toggleMobileMenu} className='cursor-pointer'>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <MobileMenu
                    token={token}
                    logout={logout}
                    toggleMobileMenu={toggleMobileMenu}
                />
            )}
        </div>
    );
}
