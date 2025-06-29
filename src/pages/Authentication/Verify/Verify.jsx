import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
import Confirmed from '../../../assets/images/Confirmed.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAuthApi } from '../../../Hooks/useAuthApi';

export default function VerifyCode() {
  useEffect(() => {
    document.title = "Verify Code";
  }, []);

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const validationSchema = yup.object({
    resetCode: yup
      .string("Reset Code must be string")
      .required('Reset code is required'),
  });

  const {
    mutate: verifyCode,
    isLoading,
  } = useAuthApi({
    endpoint: 'verifyResetCode',
    method: 'POST',
    successMessage: 'Code verified successfully!',
    onSuccessCallback: () => navigate('/resetpassword'),
    onErrorCallback: (err) =>
      setError(err.response?.data?.message || 'Something went wrong'),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema,
    onSubmit: (values) =>
      verifyCode({ resetCode: String(values.resetCode).trim() }),
  });

  return (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-slate-800">
      <div className="formContainer">
        {/* Right side - Image */}
        <div className="imgSide">
          <img src={Confirmed} alt="Confirmed illustration" className="max-w-full h-auto" />
        </div>
        {/* Left side - Verify Form */}
        <div className="divForm">
          <h2 className="titleForm">Verify Reset Code:</h2>
          {error && <h3 className="error">{error}</h3>}
          <form onSubmit={formik.handleSubmit}>
            {/* Reset Code */}
            <div>
              <label htmlFor="resetCode" className="block mb-1">Reset Code</label>
              <input
                type="text"
                name="resetCode"
                value={formik.values.resetCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input"
                inputMode="numeric"
                pattern="\d*"
                placeholder="123456"
              />
              {formik.errors.resetCode && formik.touched.resetCode && (
                <p className="formikError">{formik.errors.resetCode}</p>
              )}
            </div>
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`loadingBtn ${isLoading ? 'cursor-not-allowed' : 'hover:bg-hoverColor'}`}
              >
                {isLoading ? (
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
  );
}
