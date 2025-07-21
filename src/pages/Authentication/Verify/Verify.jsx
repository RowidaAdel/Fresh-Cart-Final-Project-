import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
import Confirmed from '../../../assets/images/Confirmed.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAuthApi } from '../../../Hooks/useAuthApi';
import { toast } from 'react-hot-toast';
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from 'react-helmet';

export default function VerifyCode() {
  useEffect(() => {
    document.title = "Verify Code";
    AOS.init({ duration: 1000, once: false });
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validationSchema = yup.object({
    resetCode: yup.string("Reset Code must be string").required('Reset code is required'),
  });

  const { mutate: verifyCode } = useAuthApi({
    endpoint: 'verifyResetCode',
  });

  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      setError('');
      verifyCode(
        { resetCode: values.resetCode.trim() },
        {
          onSuccess: () => {
            toast.success('Code verified successfully!');
            setLoading(false);
            navigate('/resetpassword');
          },
          onError: (err) => {
            const msg = err.response?.data?.message || 'Something went wrong';
            toast.error(msg);
            setError(msg);
            setLoading(false);
          },
        }
      );
    },
  });

  return (
    <>
      <Helmet>
        <meta name="description" content="Confirm your email address to activate your Fresh Cart account and start shopping securely." />
      </Helmet>
      <div className="flex items-center justify-center bg-gray-100 dark:bg-slate-800">
        <div className="formContainer">
          {/* Right side - Image */}
          <div className="imgSide" data-aos="fade-left">
            <img loading='lazy' src={Confirmed} alt="Confirmed illustration" className="max-w-full h-auto" />
          </div>
          {/* Left side - Verify Form */}
          <div className="divForm" data-aos="fade-right">
            <h2 className="titleForm" data-aos="fade-up">Verify Reset Code:</h2>
            {error && <h3 className="error">{error}</h3>}
            <form onSubmit={formik.handleSubmit}>
              {/* Reset Code */}
              <div>
                <label htmlFor="resetCode" className="block mb-1">Reset Code</label>
                <input id="resetCode" type="text" name="resetCode"
                  value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className="input" inputMode="numeric" pattern="\d*" placeholder="123456" autoComplete="one-time-code" />
                {formik.errors.resetCode && formik.touched.resetCode && (
                  <p className="formikError">{formik.errors.resetCode}</p>
                )}
              </div>
              {/* Submit Button */}
              <div className="flex justify-end">
                <button aria-label="Next" id="verifyBtn" name="verifyBtn" autoComplete="off" type="submit" disabled={loading}
                  className={`loadingBtn ${loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-hoverColor'}`}>
                  {loading ? (
                    <>
                      Loading
                      <FontAwesomeIcon icon={faSpinner} spin />
                    </>
                  ) : (
                    'Next'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}