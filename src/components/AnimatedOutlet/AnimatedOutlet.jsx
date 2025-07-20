import React from 'react';
import { useLocation, Outlet } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';

export default function AnimatedOutlet() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: 'easeInOut' }} >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
