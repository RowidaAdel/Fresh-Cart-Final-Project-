import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Eye } from 'lucide-react';
import Loading from '../../components/Loading/Loading';
import useFetch from '../../Hooks/useFetch';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Categories() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Categories";
    AOS.init({ duration: 800, once: false });
  }, []);

  const { data: categories, isLoading, isError } = useFetch("categories", "categoriesList");

  if (isLoading) {
    return (
      <div className="loading bg-slate-200 dark:bg-gray-800">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-24 text-red-500">Error loading categories.</div>
    );
  }

  return (
    <div className='bg-slate-200 dark:bg-gray-800'>
      <div className="py-10 container">
        <div className="h-px bg-slate-300 dark:bg-slate-500 my-1" />
        <h2 className='title'data-aos="zoom-out">Categories</h2>
        <div className="h-px bg-slate-300 dark:bg-slate-500 my-1" />
        <div className="py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories?.map((category, index) => (
            <div key={category._id} className="group relative overflow-hidden rounded-xl shadow-md" data-aos="zoom-in" data-aos-delay={index * 100}>
              <div className="absolute inset-0 bg-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-xl"></div>
              <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <button onClick={() => navigate(`/categories/${category._id}`)} aria-label={`View ${category.name}`}
                  className="bg-mainColor p-3 rounded-full text-white hover:scale-110 transition-transform duration-300 text-2xl">
                  <Eye />
                </button>
              </div>
              <div className="w-full h-48 overflow-hidden">
                <img loading='lazy' src={category.image} alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <h3 className="mt-2 text-center text-sm font-medium text-hoverColor dark:text-white">
                {category.name}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}