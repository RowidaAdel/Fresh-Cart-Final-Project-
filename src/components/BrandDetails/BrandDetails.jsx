import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import ProductCard from '../ProductCard/ProductCard';
import Loading from '../Loading/Loading';
import NoProduct from '../NoProduct/NoProduct';
import useFetch from '../../Hooks/useFetch';

export default function BrandDetails() {
  const { id } = useParams();

  useEffect(() => {
    document.title = "Brand Details";
  }, []);

  const { data: brandData, isError: isBrandError, isLoading: isBrandLoading } = useFetch(
    `brands/${id}`,
    ['brandName', id],
    { staleTime: 6 * 60 * 60 * 1000 }
  );

  const { data: productsData, isError, isLoading } = useFetch(
    'products',
    ['allProducts'],
    { staleTime: 6 * 60 * 60 * 1000 }
  );

  if (isLoading || isBrandLoading) {
    return <div className="flex justify-center items-center py-24 bg-slate-200 dark:bg-gray-800"><Loading /></div>;
  }

  if (isError || isBrandError) {
    return <div className="text-center py-24 text-red-500">Error loading brand or products</div>;
  }

  const filteredProducts = productsData?.filter(product =>
    product?.brand?._id === brandData?._id && product?.imageCover
  );

  if (!filteredProducts || filteredProducts.length === 0) {
    return (
      <div>
        <NoProduct />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta name="description" content="Shop products from the most trusted brands details in fashion, tech, and home essentials. Quality you can count on." />
      </Helmet>
      <div className="bg-slate-200 dark:bg-gray-800">
        <div className="container py-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} item={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
