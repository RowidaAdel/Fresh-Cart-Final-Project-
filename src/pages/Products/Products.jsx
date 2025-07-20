import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loading from '../../components/Loading/Loading';
import usePaginatedProducts from '../../Hooks/usePaginatedProducts';

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = usePaginatedProducts(currentPage);

  useEffect(() => {
    document.title = "Products";
  }, []);

  const products = data?.data || [];
  const pagination = data?.metadata;

  if (isLoading) {
    return (
      <div className="loading bg-slate-200 dark:bg-gray-800 min-h-[80vh] flex justify-center items-center">
        <Loading />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-slate-200 dark:bg-gray-800 min-h-[80vh] flex justify-center items-center">
        <h3 className="text-3xl text-red-600">❌ Failed to load products.</h3>
      </div>
    );
  }

  return (
    <div className="bg-slate-200 dark:bg-gray-800 min-h-[80vh]">
      <div className="container py-7 px-4">
        <div className="h-px bg-slate-300 dark:bg-slate-500 my-1" />
        <h2 className="title" data-aos="zoom-out">Products</h2>
        <div className="h-px bg-slate-300 dark:bg-slate-500 mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((item) => (
            <ProductCard item={item} key={item._id} />
          ))}
        </div>
        {pagination && pagination.numberOfPages > 1 && (
          <div className="flex my-5 justify-center items-center gap-2 flex-wrap">
            {[...Array(pagination.numberOfPages)].map((_, index) => (
              <button key={index} onClick={() => setCurrentPage(index + 1)}
                className={`btn px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-mainColor text-white' : 'bg-white text-mainColor border'}`}>
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}