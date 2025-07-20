import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loading from '../../components/Loading/Loading';
import NoProduct from '../../components/NoProduct/NoProduct';
import useFetch from '../../Hooks/useFetch';

export default function CategoryProducts() {
  useEffect(() => {
    document.title = "Category Detailes";
  }, []);

  const { id } = useParams();

  const { data: products, isLoading, isError } = useFetch("products", ["categoryProducts", id]);

  if (isLoading) {
    return <div className="flex justify-center items-center py-24 bg-slate-200 dark:bg-gray-800"><Loading /></div>;
  }

  if (isError) {
    return <p className="text-center text-red-500 py-20">Error loading products</p>;
  }

  const filtered = products?.filter(p => p.category?._id === id);

  if (!filtered || filtered.length === 0) {
    return (
      <div>
        <NoProduct />
      </div>
    );
  }

  return (
    <div className="bg-slate-200 dark:bg-gray-800">
      <div className="py-10 container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product._id} item={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
