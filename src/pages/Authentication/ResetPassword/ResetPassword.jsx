import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import resetPassword from '../../../assets/images/ResetPassword.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAuthApi } from '../../../Hooks/useAuthApi';

export default function ResetPassword() {
  useEffect(() => {
    document.title = "ResetPassword";
  }, []);

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    newPassword: yup.string().min(6, 'Minimum 6 characters').required('New password is required'),
  });

  const {
    mutate: resetPasswordApi,
    isLoading,
  } = useAuthApi({
    endpoint: 'resetPassword',
    method: 'PUT',
    successMessage: 'Password reset successfully!',
    onSuccessCallback: () => navigate('/login'),
    onErrorCallback: (err) =>
      setError(err.response?.data?.message || 'Something went wrong'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: ''
    },
    validationSchema,
    onSubmit: resetPasswordApi,
  });

  return (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-slate-800">
      <div className="formContainer">
        {/* Right side - Reset Form */}
        <div className="divForm">
          <h2 className="titleForm">Reset Password</h2>
          {error && <h3 className="error">{error}</h3>}
          <form onSubmit={formik.handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input type="email" name="email" id="email"
                value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                className="input" />
              {formik.touched.email && formik.errors.email && (
                <p className="formikError">{formik.errors.email}</p>
              )}
            </div>
            {/* New Password */}
            <div className="relative">
              <label htmlFor="newPassword" className="block mb-1">New Password</label>
              <input type={showPass ? "text" : "password"} name="newPassword"
                value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
                className="input" />
              <div className="eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff /> : <Eye />}
              </div>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <p className="formikError">{formik.errors.newPassword}</p>
              )}
            </div>
            {/* Submit Button */}
            <div className="flex justify-end">
              <button type="submit" disabled={isLoading}
                className={`loadingBtn ${isLoading ? 'cursor-not-allowed' : 'hover:bg-hoverColor'}`}>
                {isLoading ? (
                  <>
                    Reseting
                    <FontAwesomeIcon icon={faSpinner} spin />
                  </>
                ) : ('Reset Password')}
              </button>
            </div>
          </form>
        </div>
        {/* Left side - Image */}
        <div className="imgSide">
          <img src={resetPassword} alt="ResetPassword illustration" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
