import React, { useEffect } from 'react';
import Loading from '../../components/Loading/Loading';
import { Link } from 'react-router';
import { Eye } from 'lucide-react';
import useFetch from '../../Hooks/useFetch';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet';

export default function Brands() {
  useEffect(() => {
    document.title = "Brands";
    AOS.init({ duration: 1000, once: false });
  }, []);

  const { data: brands, isLoading, isError } = useFetch("brands", "brandsList", {
    staleTime: 6 * 60 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="loading bg-slate-200 dark:bg-gray-800">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-24 text-red-500">Error loading brands.</div>
    );
  }

  return (
    <>
      <Helmet>
        <meta name="description" content="Shop products from the most trusted brands in fashion, tech, and home essentials. Quality you can count on." />
      </Helmet>
      <div className='bg-slate-200 dark:bg-gray-800'>
        <div className="py-10 container">
          <div className="h-px bg-slate-300 dark:bg-slate-500 my-1" />
          <h2 className='title' data-aos="zoom-out">Brands</h2>
          <div className="h-px bg-slate-300 dark:bg-slate-500 my-1" />
          <div className="grid grid-cols-12 gap-4 py-10">
            {brands?.map((brand) => (
              <div key={brand._id} className="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2" data-aos="zoom-in">
                <div className="content group/app relative w-full p-2 flex justify-center items-center">
                  <div className="w-full bg-white aspect-square rounded-full overflow-hidden border-4 border-gray-300 hover:border-mainColor relative transition-shadow duration-500 group-hover/app:shadow-lg p-4">
                    <div className="absolute top-0 left-0 w-full h-full bg-white/30 backdrop-blur-sm opacity-0 group-hover/app:opacity-100 transition-opacity duration-500 z-10 rounded-full"></div>
                    <img loading="lazy" src={brand.image} alt={brand.name}
                      className="w-full h-full object-contain object-center relative z-0" />
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 group-hover/app:opacity-100 transition-opacity duration-500 z-20 rounded-full">
                      <Link to={`/brands/${brand._id}`} aria-label={`View details of ${brand.name}`}
                        className="bg-mainColor p-3 rounded-full text-white hover:scale-110 transition-transform duration-300 text-2xl">
                        <Eye />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}