import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '../Footer/Footer';
import useTheme from '../../Hooks/useTheme';
import Loading from '../Loading/Loading';

export default function Layout() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [showPage, setShowPage] = useState(false);

  const isLoginOrRegister =
    location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    if (isLoginOrRegister) {
      setShowPage(false);
      const timeout = setTimeout(() => setShowPage(true), 1000); 
      return () => clearTimeout(timeout);
    } else {
      setShowPage(true);
    }
  }, [location.pathname]);

  const flipVariants = {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1, transition: { duration: 0.6 } },
    exit: { rotateY: -90, opacity: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className={theme}>
      <div className="flex flex-col min-h-screen">
        <Navbar theme={theme} toggletheme={toggleTheme} />
        <main className="flex-grow perspective-1000 dark:bg-slate-800 transition-colors duration-200">
          {isLoginOrRegister ? (
            !showPage ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <Loading />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  variants={flipVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            )
          ) : (
            <Outlet />
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}
