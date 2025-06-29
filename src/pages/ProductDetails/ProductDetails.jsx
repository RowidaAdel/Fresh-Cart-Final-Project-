import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import ProductCard from '../../components/ProductCard/ProductCard';
import { cartContext } from '../../Context/CartContext';
import Loading from '../../components/Loading/Loading';

export default function ProductDetails() {
    let { addProductToCart } = useContext(cartContext)
    let [product, setProduct] = useState(null)
    let [related, setRelated] = useState(null)
    let [loading, setLoading] = useState(false)
    let { id } = useParams();
    async function getProductDetails() {
        setLoading(true)
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            console.log(data.data);
            getRelatedProducts(data.data.category._id)
            setProduct(data.data)
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }

    async function getRelatedProducts(categoryId) {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`)
            console.log(data.data);
            setRelated(data.data)
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getProductDetails()
        document.title = "ProductDetails";
    }, [id])
    if (loading) {
        return (
            <>
                <div className="flex justify-center items-center py-24 "><Loading /></div>
                <div className="container py-15 animate-pulse">
                    <div className="mx-auto bg-slate-100 shadow-lg rounded-lg overflow-hidden">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="md:w-1/3 p-4 relative">
                                <div className="h-52 bg-gray-300 rounded-lg"></div>
                                <div className="mt-2 grid grid-cols-2 gap-2">
                                    <div className="h-20 bg-gray-300 rounded-lg"></div>
                                    <div className="h-20 bg-gray-300 rounded-lg"></div>
                                </div>
                            </div>

                            <div className="md:w-2/3 p-6">
                                <div className="h-5 bg-gray-300 rounded w-1/2 mb-2"></div>
                                <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                                <div className="flex items-center mb-4">
                                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                                    <div className="h-4 bg-gray-300 rounded w-16 ml-2"></div>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="h-8 bg-gray-300 rounded w-16"></div>
                                    </div>
                                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                                </div>
                                <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>

                                <div className="flex space-x-4">
                                    <div className="flex-1 h-10 bg-gray-300 rounded"></div>
                                    <div className="flex-1 h-10 bg-gray-300 rounded"></div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="container py-15">
                <h2 className='text-mainColor text-5xl font-extrabold py-4'>Product Details</h2>
                <div className="mx-auto bg-slate-100 shadow-lg rounded-lg overflow-hidden">
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="md:w-1/3 p-4 relative">
                            <div className=" ">
                                <img src={product?.imageCover} alt="Product" className="w-full max-h-85 object-cover rounded-lg" />
                            </div>
                            <div>
                                <Swiper
                                    spaceBetween={20}
                                    slidesPerView={2}
                                    autoplay={{
                                        delay: 1000,
                                        disableOnInteraction: false,
                                    }}
                                    modules={[Autoplay]} >
                                    {product?.images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <img src={image} alt={`Product ${index}`} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                        <div className="md:w-2/3 p-6">
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">{product?.title}</h1>
                            <p className="text-sm text-gray-600 mb-4">{product?.description}</p>
                            <div className="flex items-center mb-4">
                                <span className="bg-mainColor text-white text-sm font-semibold px-2.5 py-0.5 rounded">{product?.ratingsAverage} ★</span>
                                <span className="text-sm text-gray-500 ml-2">{product?.ratingsQuantity} reviews</span>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <span className="text-3xl font-bold text-gray-900">$ {product?.price}</span>
                                    <span className="ml-2 text-sm font-medium text-gray-500 line-through">
                                        $ {product?.price + 300}
                                    </span>
                                </div>
                                <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                    Save {product?.price ? Math.round(((300) / (product.price + 300)) * 100) : 0}%
                                </span>
                            </div>
                            <p className="text-mainColor text-sm font-semibold mb-4">Free Delivery</p>
                            <div className="flex space-x-4">
                                <button className="flex-1 bg-mainColor hover:bg-hoverColor text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
                                    Buy Now
                                </button>
                                <button onClick={() => addProductToCart(product._id)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='py-4'>
                        <h2 className='text-mainColor text-5xl font-extrabold py-4'>Related Products</h2>
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                            {related?.map((item) => (
                                <ProductCard key={item._id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
