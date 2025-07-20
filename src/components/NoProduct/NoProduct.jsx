import React from 'react';
import Photo from '../../assets/images/noresults.webp'

export default function NoProduct() {
    return (
        <>
            <div className="bg-slate-200 flex justify-center items-center flex-col dark:bg-gray-800">
                <div className="py-10">
                <img src={Photo} alt="No products" loading='lazy'/>
                </div>
            </div>
        </>
    );
}

