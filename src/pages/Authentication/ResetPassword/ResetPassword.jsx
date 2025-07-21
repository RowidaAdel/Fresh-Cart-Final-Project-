import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import resetPassword from '../../../assets/images/ResetPassword.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAuthApi } from '../../../Hooks/useAuthApi';
import { toast } from 'react-hot-toast';
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from 'react-helmet';

export default function ResetPassword() {
  useEffect(() => {
    document.title = "Reset Password";
    AOS.init({ duration: 1000, once: false });
  }, []);

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    newPassword: yup.string().min(6, 'Minimum 6 characters').required('New password is required'),
  });

  const { mutate: resetPasswordApi } = useAuthApi({
    endpoint: 'resetPassword',
    method: 'PUT',
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: ''
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      setError('');
      resetPasswordApi(values, {
        onSuccess: () => {
          toast.success('Password reset successfully!');
          setLoading(false);
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        },
        onError: (err) => {
          const msg = err.response?.data?.message || 'Something went wrong';
          toast.error(msg);
          setError(msg);
          setLoading(false);
        }
      });
    }
  });

  return (
    <>
      <Helmet>
        <meta name="description" content="Set a new password for your Fresh Cart account and get back to your shopping in minutes." />
      </Helmet>
      <div className="flex items-center justify-center bg-gray-100 dark:bg-slate-800">
        <div className="formContainer">
          {/* Right side - Reset Form */}
          <div className="divForm" data-aos="fade-left">
            <h2 className="titleForm" data-aos="fade-up">Reset Password</h2>
            {error && <h3 className="error">{error}</h3>}
            <form onSubmit={formik.handleSubmit}>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <input type="email" name="email" id="email" autoComplete="email"
                  value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="input" />
                {formik.touched.email && formik.errors.email && (
                  <p className="formikError">{formik.errors.email}</p>
                )}
              </div>
              {/* New Password */}
              <div className="relative">
                <label htmlFor="newPassword" className="block mb-1">New Password</label>
                <input type={showPass ? "text" : "password"} name="newPassword" id="newPassword" autoComplete="new-password"
                  value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="input" />
                <div className="eye" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff /> : <Eye />}
                </div>
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <p className="formikError">{formik.errors.newPassword}</p>
                )}
              </div>
              {/* Submit Button */}
              <div className="flex justify-end">
                <button id="resetPasswordBtn" name="resetPasswordBtn" autoComplete="off" type="submit" disabled={loading}
                  className={`loadingBtn ${loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-hoverColor'}`} >
                  {loading ? (
                    <>
                      Reseting
                      <FontAwesomeIcon icon={faSpinner} spin />
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </div>
            </form>
          </div>
          {/* Left side - Image */}
          <div className="imgSide" data-aos="fade-right">
            <img loading='lazy' src={resetPassword} alt="ResetPassword illustration" className="max-w-full h-auto" />
          </div>
        </div>
      </div>
    </>
  );
}
