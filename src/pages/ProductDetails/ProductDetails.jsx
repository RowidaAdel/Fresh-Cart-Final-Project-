import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loading from '../../components/Loading/Loading';
import { WashlistContext } from '../../Context/washListContext';
import { Heart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../Redux/slices/cartSlice';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet';
import { useWishlistQuery } from '../../Hooks/useWishlistQuery';

export default function ProductDetails() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const { addProductToWishlist, removeProductFromWishlist } = useContext(WashlistContext);
    const { data: wishlistData } = useWishlistQuery();

    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(false);

    const isDisabled = loading || !product;
    const isInWishlist = product && wishlistData?.some(item => item._id === product._id);

    useEffect(() => {
        document.title = 'Product Details';
        AOS.init({ duration: 800, once: false });
    }, []);

    useEffect(() => {
        getProductDetails();
    }, [id]);

    async function getProductDetails() {
        setLoading(true);
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
            const productData = data.data;
            setProduct(productData);
            getRelatedProducts(productData.category._id, productData._id);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function getRelatedProducts(categoryId, productId) {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`);
            const filtered = data.data.filter(item => item._id !== productId);
            setRelated(filtered);
        } catch (error) {
            console.error(error);
        }
    }

    const handleWishlistToggle = async () => {
        if (!product?._id) return;
        if (isInWishlist) {
            await removeProductFromWishlist(product._id);
        } else {
            await addProductToWishlist(product._id);
        }
    };

    const handleBuyNow = async () => {
        await dispatch(addProductToCart(product._id));
        navigate('/checkout');
    };

    if (loading || !product) {
        return (
            <div className="loading bg-slate-200 dark:bg-gray-800">
                <Loading />
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <meta name="description" content="View detailed information, specifications, and customer reviews for this product. Make confident shopping decisions with Fresh Cart." />
            </Helmet>
            <div className='bg-slate-200 dark:bg-gray-800 min-h-[80vh]'>
                <div className="container py-10">
                    {/* Product Info */}
                    <div className="h-px bg-slate-300 dark:bg-slate-500 my-1" />
                    <h2 className='title'>Product Details</h2>
                    <div className="h-px bg-slate-300 dark:bg-slate-500 my-1 mb-10" />
                    <div className="relative bg-slate-200 dark:bg-gray-900 p-6 rounded-lg shadow-xl max-w-7xl mx-auto space-y-6">
                        {/* Wishlist Icon */}
                        <button onClick={handleWishlistToggle} aria-label="Toggle wishlist"
                            className={`cursor-pointer absolute top-4 right-4 transition ${isInWishlist ? 'text-red-500' : 'text-gray-600 dark:text-gray-300 hover:text-red-500'}`}>
                            <Heart className="w-6 h-6 fill-current" fill={isInWishlist ? 'red' : 'none'} />
                        </button>
                        {/* Images & Info */}
                        <div className="flex flex-col md:flex-row gap-8 items-center" >
                            <div className="md:w-1/3 space-y-4" data-aos="fade-right">
                                <img loading='lazy' src={product.imageCover} alt="Main" className="rounded-lg object-cover w-full max-h-[340px]" />
                                <Swiper spaceBetween={20} slidesPerView={2} autoplay={{ delay: 2000 }} modules={[Autoplay]}>
                                    {product.images.map((img, i) => (
                                        <SwiperSlide key={i}>
                                            <img src={img} alt={`img-${i}`} className="rounded-md object-cover w-full h-28" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className="md:w-2/3 space-y-4 text-center md:text-left" data-aos="fade-left">
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {(() => {
                                        const title = product?.title || "";
                                        const words = title.split(" ");
                                        return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : title;
                                    })()}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
                                <div className="flex justify-center md:justify-start items-center gap-4">
                                    <span className="bg-mainColor text-white text-sm px-3 py-1 rounded">★ {product.ratingsAverage}</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{product.ratingsQuantity} reviews</span>
                                </div>
                                <div className="flex justify-center md:justify-start items-center gap-4">
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                                    <span className="text-red-600 font-semibold text-sm line-through">${product.price + 300}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                    <button disabled={isDisabled} onClick={handleBuyNow} aria-label="Buy Now"
                                        className={`flex-1 bg-mainColor hover:bg-hoverColor text-white font-bold py-2 rounded ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        Buy Now
                                    </button>
                                    <button disabled={isDisabled} onClick={() => dispatch(addProductToCart(product._id))} aria-label="Add to cart"
                                        className={`flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold py-2 rounded ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Related Products */}
                    {related.length > 0 && (
                        <div className="mt-14">
                            <div className="h-px bg-slate-300 dark:bg-slate-500 my-1" />
                            <h2 className="title" data-aos="zoom-out">Related Products</h2>
                            <div className="h-px bg-slate-300 dark:bg-slate-500 mb-10" />
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {related.map(item => (
                                    <div key={item._id}>
                                        <ProductCard item={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
