import { CircleUserRound, Heart, LogIn, LogOut, Menu, Moon, ShoppingCart, Sun, X } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { authContext } from '../../Context/authContext';
import freshcartLogo from '../../assets/images/freshcart.svg';
import freshcartLogoDark from '../../assets/images/favicon.webp';
import { useSelector, useDispatch } from "react-redux";
import { getLoggedUserCart } from '../../Redux/slices/cartSlice';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useWishlistQuery } from '../../Hooks/useWishlistQuery';
import { motion } from "framer-motion";

function Navbar({ toggletheme, theme }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [shrink, setShrink] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const counter = cart?.numOfCartItems || 0;

    const [animateCart, setAnimateCart] = useState(false);
    const [animateWishlist, setAnimateWishlist] = useState(false);

    const { data: wishlist = [] } = useWishlistQuery();
    const wishlistCount = wishlist.length;

    const toggleMobileMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const { token, setToken } = useContext(authContext);
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    useEffect(() => {
        if (token) {
            dispatch(getLoggedUserCart());
        }
    }, [token, dispatch]);

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

    useEffect(() => {
        const handleScroll = () => {
            setShrink(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeInOut" }}
            className={`fixed top-0 w-full z-50 shadow-md bg-gray-300 dark:bg-slate-900 ${shrink ? 'py-3' : 'py-6'}`}>
            <div className="container flex justify-between items-center dark:text-white">
                <NavLink to='/'>
                    {theme === 'dark' ? (
                        <div className="flex items-center select-none">
                            <img src={freshcartLogoDark} alt="logo dark" loading='lazy' className="h-8" />
                            <span className="text-white font-bold text-xl">FreshCart</span>
                        </div>
                    ) : (
                        <img src={freshcartLogo} alt="logo" loading='lazy' />
                    )}
                </NavLink>
                {token && (
                    <ul className='hidden lg:flex justify-between items-center space-x-3'>
                        {['home', 'products', 'categories', 'brands', 'allorders'].map((path) => (
                            <li key={path} className='text-xl font-mono link-hover relative afterEffect cursor-pointer'>
                                <NavLink
                                    to={`/${path}`}
                                    className={({ isActive }) => `link-hover afterEffect ${isActive ? 'active' : ''}`}
                                >
                                    {path.charAt(0).toUpperCase() + path.slice(1)}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                )}
                <ul className='hidden lg:flex justify-between items-center space-x-3'>
                    <li onClick={toggletheme} className="hover:-translate-y-2 text-xl font-semibold cursor-pointer link-hover relative transition-all duration-300">
                        {theme === 'light' ? <Moon /> : <Sun />}
                    </li>
                    {token ? (
                        <>
                            {/* Cart */}
                            <li className={`hover:-translate-y-2 text-xl font-semibold cursor-pointer link-hover relative transition-all duration-300 ${animateCart ? 'animate-bounce' : ''}`}>
                                <NavLink to="/cart" className={({ isActive }) => `link-hover afterEffect ${isActive ? 'active' : ''}`}>
                                    <ShoppingCart />
                                </NavLink>
                                {counter > 0 && (
                                    <div className='absolute -top-3 -left-3 size-5 text-white text-sm text-center rounded-full bg-mainColor'>
                                        {counter}
                                    </div>
                                )}
                            </li>
                            {/* Wishlist */}
                            <li className={`hover:-translate-y-2 text-xl font-semibold cursor-pointer link-hover relative transition-all duration-300 ${animateWishlist ? 'animate-bounce' : ''}`}>
                                <NavLink to="/washlist" className={({ isActive }) => `link-hover afterEffect ${isActive ? 'active' : ''}`}>
                                    <Heart />
                                </NavLink>
                                {wishlistCount > 0 && (
                                    <div className="absolute -top-3 -left-3 w-5 h-5 flex items-center justify-center text-white text-sm rounded-full bg-red-400">
                                        {wishlistCount}
                                    </div>
                                )}
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='text-xl cursor-pointer link-hover relative afterEffect'>
                                <NavLink to="/register" className={({ isActive }) => `link-hover afterEffect ${isActive ? 'active' : ''}`}>Register</NavLink>
                            </li>
                            <li className='text-xl cursor-pointer link-hover relative afterEffect flex justify-center items-center gap-2'>
                                <NavLink to="/login" className={({ isActive }) => `link-hover afterEffect flex items-center gap-2 ${isActive ? 'active' : ''}`}>Login <LogIn /></NavLink>
                            </li>
                        </>
                    )}
                    {token && (
                        <>
                            <li onClick={() => navigate('/profile')} className='text-xl font-semibold cursor-pointer link-hover relative transition-all duration-300 hover:-translate-y-2'>
                                <CircleUserRound />
                            </li>
                            <li onClick={logout} className='text-xl cursor-pointer link-hover relative afterEffect flex justify-center items-center gap-2'>
                                <span>Logout</span>
                                <LogOut />
                            </li>
                        </>
                    )}
                </ul>
                {/* Mobile Menu */}
                <div className='flex items-center gap-4 lg:hidden'>
                    <button aria-label="Theme Toggle" onClick={toggletheme} className='cursor-pointer'>
                        {theme === 'light' ? <Moon /> : <Sun />}
                    </button>
                    <button aria-label="Menu Toggle" onClick={toggleMobileMenu} className='cursor-pointer'>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <MobileMenu token={token} logout={logout} toggleMobileMenu={toggleMobileMenu} />
            )}
        </motion.div>
    );
}
export default React.memo(Navbar);