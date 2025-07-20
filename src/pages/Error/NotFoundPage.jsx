import { Link } from "react-router";
import notFound from "../../assets/images/error.svg"
import { useEffect } from "react";
import { MessageCircle, House, Mail, Phone, Search } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Notfound() {
  useEffect(() => {
    document.title = "ErrorPage";
    AOS.init({ duration: 800, once: false });
  }, [])

  return (
    <>
      <section className="notfound py-25 flex justify-center text-center items-center flex-col container">
        <h2 className="text-stone-950 text-6xl font-extrabold dark:text-white" data-aos="zoom-out">Oops! Page Not Found</h2>
        <img src={notFound} alt="404" loading="lazy" />
        <p className="text-slate-500 text-center text-xl py-3">The page you're looking for seems to have gone shopping!
          <br /> Don't worry, our fresh products are stil available for you.</p>
        <div className="flex gap-3">
          <Link to="/home" className="btn bg-mainColor hover:bg-white text-white border-2 border-mainColor hover:text-mainColor w-fit mt-2 flex items-center gap-2">
            <House /> Back to Home</Link>
          <Link to="/search" className="btn bg-white border-2 border-mainColor hover:bg-mainColor text-mainColor hover:text-white w-fit mt-2 flex items-center gap-2">
            <Search /> Search Product</Link>
        </div>
        <div className="container flex flex-col rounded-2xl bg-bgColor p-6 my-6 text-center space-y-4 shadow-xl">
          <p className="text-xl font-semibold">Need Help?</p>
          <p className="text-gray-700">Our customer support team is here to assist you 24/7</p>
          <div className="gap-2 text-center mt-2 flex justify-center items-center flex-col lg:flex-row">
            <p className="flex items-center gap-2 text-gray-800">
              <Phone className="text-xl" /> +1 (800) 123-4567
            </p>
            <p className="flex items-center gap-2 text-gray-800">
              <Mail className="text-xl" /> support@freshcart.com
            </p>
            <p className="flex items-center gap-2 text-gray-800">
              <MessageCircle className="text-xl" /> Live Chat
            </p>
          </div>
        </div>
      </section>
    </>
  );
}