import React from 'react';
import { motion } from 'framer-motion';
import AmazonImg from '../../assets/images/amazon-pay.webp';
import AmericanImg from '../../assets/images/American-Express-Color.webp';
import masterImg from '../../assets/images/mastercard.webp';
import PayPalImg from '../../assets/images/paypal.webp';
import AppleStoreImg from '../../assets/images/get-apple-store.webp';
import GooglePlayImg from '../../assets/images/get-google-play.webp';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export default function Footer() {
  return (
    <motion.footer
      className="bg-gray-300 dark:bg-slate-900 py-10 min-h-[350px] relative overflow-hidden"
      variants={containerVariants}
      initial={false}
      animate="visible"
    >
      <div className="container space-y-5 px-4">
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 min-h-[2.5rem]">
            Get the FreshCart app
          </h2>
          <p className="text-slate-400 my-2 min-h-[3rem]">
            We will send you a link, open it on your phone to download the app
          </p>
        </motion.div>

        <motion.div className="flex flex-col sm:flex-row gap-3" variants={itemVariants}>
          <input
            type="email"
            name="email"
            placeholder="Email ..."
            autoComplete="email"
            className="w-full sm:flex-1 px-2 py-3 rounded-md focus:outline-none border-2 border-slate-200 bg-white"
          />
          <button aria-label="Share App Link" className="btn bg-mainColor text-lg text-white hover:bg-hoverColor px-6 py-3 rounded-md">
            Share App Link
          </button>
        </motion.div>

        <motion.div className="h-px bg-slate-400 dark:bg-slate-600 my-6" variants={itemVariants} />

        <motion.div className="flex flex-col md:flex-row justify-between gap-6" variants={itemVariants}>
          <div className="flex flex-wrap gap-3 items-center">
            <h3 className="dark:text-slate-400 min-w-[140px]">Payment Partners</h3>
            <img loading="lazy" className="w-20 aspect-[2/1] object-contain" src={AmazonImg} alt="Amazon" width={80} height={40} />
            <img loading="lazy" className="w-20 aspect-[2/1] object-contain" src={AmericanImg} alt="American Express" width={80} height={40} />
            <img loading="lazy" className="w-20 aspect-[2/1] object-contain" src={masterImg} alt="MasterCard" width={80} height={40} />
            <img loading="lazy" className="w-20 aspect-[2/1] object-contain" src={PayPalImg} alt="PayPal" width={80} height={40} />
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <h3 className="dark:text-slate-400 min-w-[200px]">Get deliveries with FreshCart</h3>
            <img loading="lazy" className="w-32 aspect-[8/3] object-contain" src={AppleStoreImg} alt="Apple Store" width={128} height={48} />
            <img loading="lazy" className="w-32 aspect-[8/3] object-contain" src={GooglePlayImg} alt="Google Play" width={128} height={48} />
          </div>
        </motion.div>
        <motion.div className="h-px bg-slate-400 dark:bg-slate-600 my-6" variants={itemVariants} />
      </div>
    </motion.footer>
  );
}
