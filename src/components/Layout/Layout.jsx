import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '../Footer/Footer';
import useTheme from '../../Hooks/useTheme';
import Loading from '../Loading/Loading';
import ScrollToTopButton from '../ScrollBtn/ScrollBtn';
import Offline from '../../pages/Offline/Offline';
import NetworkStatusWrapper from '../NetworkStatusWrapper/NetworkStatusWrapper';
import AnimatedOutlet from '../AnimatedOutlet/AnimatedOutlet';

export default function Layout() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [showPage, setShowPage] = useState(false);

  const pagesWith3DAnimation = ['/login', '/register'];
  const authPages = ['/login', '/register', '/verify', '/forget', '/resetpassword'];
  const pagesWithScrollTop = ['/home', '/products', '/productdetails', '/brands', '/allorders'];

  const is3DPage = pagesWith3DAnimation.includes(location.pathname);
  const isAuthPage = authPages.includes(location.pathname);
  const showScrollTop = pagesWithScrollTop.some(page => location.pathname.startsWith(page));

  useEffect(() => {
    if (is3DPage) {
      setShowPage(false);
      const timeout = setTimeout(() => setShowPage(true), 800);
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
    <NetworkStatusWrapper>
      {(isOnline) => (
        <div className={theme}>
          <div className="flex flex-col min-h-screen">
            <Navbar theme={theme} toggletheme={toggleTheme} />
            <main className="flex-grow pt-19 perspective-1000 dark:bg-slate-800 transition-colors duration-200">
              {!isOnline ? (
                <Offline />
              ) : !isAuthPage && !showPage ? (
                <div className="flex justify-center items-center min-h-[300px]">
                  <Loading />
                </div>
              ) : (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={location.pathname} initial={{ opacity: 0, y: 20 }} style={{ position: 'relative' }}
                    animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: 'easeInOut' }}>
                    {is3DPage ? (
                      <motion.div variants={flipVariants} initial="initial" animate="animate" exit="exit"
                        style={{ transformStyle: 'preserve-3d' }}>
                        <AnimatedOutlet />
                      </motion.div>
                    ) : (
                      <AnimatedOutlet />
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </main>
            <Footer />
            {showScrollTop && <ScrollToTopButton />}
          </div>
        </div>
      )}
    </NetworkStatusWrapper>
  );
}