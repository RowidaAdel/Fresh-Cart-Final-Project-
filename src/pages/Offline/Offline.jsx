import React, { useEffect } from 'react';
import style from './Offline.module.scss';
import offline from '../../assets/images/offline.webp';
import { Helmet } from 'react-helmet';

export default function Offline() {
    useEffect(() => {
        document.title = "Offline";
    }, []);

    return (
        <>
            <Helmet>
                <meta name="description" content="It looks like you're offline. Please check your internet connection to continue shopping on Fresh Cart." />
            </Helmet>
            <div className="container flex flex-col items-center justify-center py-12">
                <img loading='lazy' src={offline} alt="offline" className={`rounded-4 ${style.woffline}`} />
                <h3 className="fw-bold text-center my-3 text-mainColor text-2xl">You are offline!</h3>
                <p className={`fw-bold text-muted fs-5 mb-3 text-center dark:text-white ${style.fsp7}`}>
                    Please check your internet connection
                </p>
            </div>
        </>
    );
}
