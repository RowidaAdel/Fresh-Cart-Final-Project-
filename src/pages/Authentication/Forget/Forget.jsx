import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { object, string } from 'yup';
import ForgotPasswordPhoto from '../../../assets/images/ForgotPassword.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAuthApi } from '../../../Hooks/useAuthApi';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import AOS from "aos";
import "aos/dist/aos.css";

export default function Forget() {
  useEffect(() => {
    document.title = "Forget Password";
    AOS.init({ duration: 1000, once: false });
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validationSchema = object({
    email: string('email must be string').required("email is required").email("email must be valid"),
  });

  const { mutate: forgetPassword } = useAuthApi({
    endpoint: 'forgotPasswords',
    successMessage: 'Code sent successfully!',
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      forgetPassword(values, {
        onSuccess: () => {
          toast.success('Code sent successfully!');
          navigate('/verify');
          setLoading(false);
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || 'Something went wrong');
          setError(error.response?.data?.message || 'Something went wrong');
          setLoading(false);
        }
      });
    },
  });

  return (
    <div className="flex items-center justify-center">
      <div className="formContainer">
        {/* Right side - Forget Form */}
        <div className="divForm" data-aos="fade-left">
          <h2 className="titleForm" data-aos="fade-up">Forgot Password?</h2>
          {error && <h3 className='error'>{error}</h3>}
          <form onSubmit={formik.handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input id="email" autoComplete="email" type="email" name="email"
                value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="input" />
              {formik.errors.email && formik.touched.email && (
                <p className="formikError">{formik.errors.email}</p>
              )}
            </div>
            {/* Submit Button */}
            <div className="flex justify-end">
              <button id="forgetBtn" name="forgetBtn" autoComplete="off" type="submit" disabled={loading}
                className={`loadingBtn ${loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-hoverColor'}`}>
                {loading ? (
                  <>
                    Sending
                    <FontAwesomeIcon icon={faSpinner} spin />
                  </>
                ) : (
                  'Next'
                )}
              </button>
            </div>
          </form>
        </div>
        {/* Left side - Image */}
        <div className="imgSide" data-aos="fade-right">
          <img src={ForgotPasswordPhoto} loading='lazy' alt="Forget illustration" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
}