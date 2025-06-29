import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import axios from 'axios';
// import Loader from '../../components/Loader/Loader';
import Loading from '../../components/Loading/Loading';

import PrimarySlider from '../../components/PrimarySlider/PrimarySlider';
import SecondarySlider from '../../components/SecondarySlider/SecondarySlider';
// import AnimatedSVG from '../../components/AnimateSvg/AnimateSvg';


export default function Home() {
    let [products, setProduct] = useState([])
    let [error, setError] = useState(false)
    let [loading, setLoading] = useState(false)

    useEffect(() => {
        document.title = "Home";
        getAllProducts()
    }, []);

    async function getAllProducts() {
        setLoading(true)
        try {
            let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
            console.log(data);
            setProduct(data.data)
        } catch (error) {
            console.log(error);
            setError(true)
        } finally {
            setLoading(false)
        }
    }
    if (loading) {
        return <div className="loading"><Loading /></div>
    }
    return (
        <div className='bg-slate-200 dark:bg-gray-800 min-h-[80vh]'>
            <div className="py-7 container">
                <div className="image w-full lg:w-1/2 lg:mt-0 -mt-5">
                    {/* <AnimatedSVG/> */}
                </div>
                {/* {loading ? <Loader /> : error ? <h3 className='text-6xl text-red-500'>There are No Products</h3> : ( */}
                <>
                    <PrimarySlider />
                    <SecondarySlider />
                    <h2 className='title'>Products</h2>
                    <div className="grid grid-cols-1 py-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {products.map((item) => (
                            <ProductCard item={item} key={item._id} />
                        ))}
                    </div>
                </>
            </div>
        </div>
    );
}