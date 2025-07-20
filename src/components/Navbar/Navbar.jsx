import { CircleUserRound, Heart, LogIn, LogOut, Menu, Moon, ShoppingCart, Sun, X } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { authContext } from '../../Context/authContext';
import freshcartLogo from '../../assets/images/freshcart.svg'
import freshcartLogoDark from '../../assets/images/favicon.webp'
import { useSelector, useDispatch } from "react-redux";
import { getLoggedUserCart } from '../../Redux/slices/cartSlice';
import MobileMenu from '../MobileMenu/MobileMenu';
import { WashlistContext } from '../../Context/washListContext';
import { motion } from "framer-motion";

export default function Navbar({ toggletheme, theme }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [shrink, setShrink] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    let { getLoggedUserWishlist } = useContext(WashlistContext)
    const counter = cart?.numOfCartItems || 0;
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
        dispatch(getLoggedUserCart());
        getLoggedUserWishlist();
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
                        <img src={freshcartLogo} alt="logo" loading='lazy'/>
                    )}
                </NavLink>
                {token ? (
                    <ul className='hidden lg:flex justify-between items-center space-x-3'>
                        <li className='text-xl font-mono link-hover relative afterEffect cursor-pointer'>
                            <NavLink to="/home"
                                className={({ isActive }) => `link-hover afterEffect ${isActive ? 'active' : ''}`} >Home</NavLink>
                        </li>
                        <li className='text-xl font-mono link-hover relative afterEffect cursor-pointer'>
                            <NavLink to="/products"
                                className={({ isActive }) => `link-hover afterEffect ${isActive ? 'active' : ''}`}>Products</NavLink>
                        </li>
                        <li className='text-xl font-mono link-hover relative afterEffect cursor-pointer'>
                            <NavLink to="/categories"
                                className={({ isActive }) => `link-hover afterEffect ${isActive ? 'active' : ''}`}>Categories</NavLink>
                        </li>
                        <li className='text-xl font-mono link-hover relative afterEffect cursor-pointer'>
                            <NavLink to="/brands" className={({ isActive }) => `link-hover afterEffect ${isActive ? 'active' : ''}`}>Brands</NavLink>
                        </li>
                        <li className='text-xl font-mono link-hover relative afterEffect cursor-pointer'>
                            <NavLink to="/allorders"
                                className={({ isActive }) => `link-hover afterEffect ${isActive ? 'active' : ''}`}>Orders</NavLink>
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
                                <NavLink to="/cart" className={({ isActive }) => `link-hover afterEffect ${isActive ? 'active' : ''}`}>
                                    <ShoppingCart />
                                </NavLink>
                                {counter > 0 && (
                                    <div className='absolute -top-3 -left-3 size-5 text-white text-sm text-center rounded-full bg-mainColor'>
                                        {cart?.numOfCartItems}
                                    </div>
                                )}
                            </li>
                            <li className={`hover:-translate-y-2 text-xl font-semibold cursor-pointer link-hover relative transition-all duration-300 ${animateWishlist ? 'animate-bounce' : ''}`}>
                                <NavLink to="/washlist"
                                    className={({ isActive }) => `link-hover afterEffect ${isActive ? 'active' : ''}`}><Heart />
                                </NavLink>
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
                                <NavLink to="/register"
                                    className={({ isActive }) => `link-hover afterEffect ${isActive ? 'active' : ''}`}>Register
                                </NavLink>
                            </li>
                            <li className='text-xl cursor-pointer link-hover relative afterEffect flex justify-center items-center gap-2'>
                                <NavLink to="/login"
                                    className={({ isActive }) => `link-hover afterEffect flex items-center gap-2 ${isActive ? 'active' : ''}`}>Login <LogIn />
                                </NavLink>
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
            {isMenuOpen && (
                <MobileMenu token={token} logout={logout} toggleMobileMenu={toggleMobileMenu} />
            )}
        </motion.div>
    );
}
