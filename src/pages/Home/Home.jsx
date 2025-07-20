import React, { useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loading from '../../components/Loading/Loading';
import PrimarySlider from '../../components/PrimarySlider/PrimarySlider';
import SecondarySlider from '../../components/SecondarySlider/SecondarySlider';
import useFetch from '../../Hooks/useFetch';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  const { data: products, isLoading, isError } = useFetch("products", "allProducts");

  useEffect(() => {
    document.title = "Home";
    AOS.init({ duration: 800, once: false, offset: 120, easing: 'ease-in-out' });
  }, []);

  useEffect(() => {
    if (products && products.length > 0) {
      setTimeout(() => {
        AOS.refreshHard();
      }, 500);
    }
  }, [products]);

  if (isLoading) {
    return (
      <div className="loading bg-slate-200 dark:bg-gray-800">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        <p>Something went wrong while fetching products.</p>
      </div>
    );
  }

  return (
    <div className='bg-slate-200 dark:bg-gray-800 min-h-[80vh]'>
      <div className="py-7 container">
        <PrimarySlider />
        <SecondarySlider />
        <div className="h-px bg-slate-300 dark:bg-slate-500 my-1" />
        <h2 className='title' data-aos="zoom-out">Products</h2>
        <div className="h-px bg-slate-300 dark:bg-slate-500 my-1" />
        <div className="grid grid-cols-1 py-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products?.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}