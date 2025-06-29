import React from 'react';
import AmazonImg from '../../assets/images/amazon-pay.png'
import AmericanImg from '../../assets/images/American-Express-Color.png'
import masterImg from '../../assets/images/mastercard.webp'
import PayPalImg from '../../assets/images/paypal.png'
import AppleStoreImg from '../../assets/images/get-apple-store.png'
import GooglePlayImg from '../../assets/images/get-google-play.png'

export default function Footer() {
    return (
        <>
            <footer className='bg-gray-300 dark:bg-slate-900 py-10'>
                <div className="container space-y-5">
                    <div>
                        <h2 className='text-2xl font-semibold text-slate-800 dark:text-slate-100'>Get the FreshCart app</h2>
                        <p className=' text-slate-400 my-2'>We will send you a link, open it on your phone to download th app</p>
                    </div>
                    <div className='flex gap-2'>
                        <input className='grow px-2 py-3 rounded-md focus:outline-none border-2 border-slate-200 bg-white' type="text" placeholder='Email ...' />
                        <button className='btn bg-mainColor text-lg text-white hover:bg-hoverColor'>Share App Link</button>
                    </div>
                    <div className="line" />
                    <div className='flex justify-between'>
                        <div className='flex gap-3 items-center'>
                            <h3 className='dark:text-slate-400'>Payment Partners</h3>
                            <img className='w-20' src={AmazonImg} alt="" />
                            <img className='w-20' src={AmericanImg} alt="" />
                            <img className='w-18' src={masterImg} alt="" />
                            <img className='w-20' src={PayPalImg} alt="" />
                        </div>
                        <div className='flex gap-2 items-center'>
                            <h3 className='dark:text-slate-400'>Get deliveries with FreshCart</h3>
                            <img className='w-26' src={AppleStoreImg} alt="" />
                            <img className='w-26' src={GooglePlayImg} alt="" />

                        </div>
                    </div>
                    <div className="line" />
                </div>
            </footer>
        </>
    );
}
