import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';

export default function Products() {
    let [products, setProduct] = useState([])
    let [error, setError] = useState(false)
    let [loading, setLoading] = useState(false)
    let [pagenation, setPagenation] = useState(null)



    useEffect(() => {
        document.title = "Product";
        getAllProducts()
    }, []);

    function handlePageChane(x) {
        getAllProducts(x)
    }
    async function getAllProducts(page = 1) {
        setLoading(true)
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`)
            console.log(data);
            setProduct(data.data)
            setPagenation(data.metadata)
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
                {/* {loading ? <p>Loading..</p> : error ? <h3 className='text-6xl text-red-500'>There are No Products</h3> : ( */}
                <>
                    <h2 className='title'>Products</h2>
                    <div className="grid grid-cols-1 py-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {products.map((item) => (
                            <ProductCard item={item} key={item._id} />
                        ))}
                    </div>
                </>
                <div className='flex my-5 justify-center items-center gap-4'>
                    {[...Array(pagenation?.numberOfPages)].map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChane(index + 1)}
                            className='btn cursor-pointer bg-mainColor text-white'
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
}