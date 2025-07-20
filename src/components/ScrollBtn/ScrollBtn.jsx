import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';


export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {isVisible && (
                <button onClick={scrollToTop} className="fixed bottom-10 right-10 p-3 rounded-full bg-mainColor text-white shadow-lg hover:bg-hoverColor transition-transform duration-300 animate-bounce"
                    aria-label="Scroll to top" ><FaArrowUp size={24} />
                </button>
            )}
        </>
    );
};
