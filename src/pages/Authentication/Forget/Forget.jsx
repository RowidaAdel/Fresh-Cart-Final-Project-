import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { object, string } from 'yup';
import ForgotPasswordPhoto from '../../../assets/images/ForgotPassword.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAuthApi } from '../../../Hooks/useAuthApi';


export default function Forget() {
  useEffect(() => {
    document.title = "Forget Password";
  }, []);

  const validationSchema = object({
    email: string('email must be string').required("email is required").email("email must be valid"),
  });
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => forgetPassword(values),
    validationSchema,
  });

  const {
    mutate: forgetPassword,
    isLoading,
  } = useAuthApi({
    endpoint: 'forgotPasswords',
    successMessage: 'Code sent successfully!',
    onSuccessCallback: () => navigate('/verify'),
  });


  return (
    <div className="flex items-center justify-center">
      <div className="formContainer">
        {/* Right side - Forget Form */}
        <div className="divForm">
          <h2 className="titleForm">Forgot Password?</h2>
          {error && <h3 className='error'>{error}</h3>}
          <form onSubmit={formik.handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input type="email" name="email"
                value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                className="input" />
              {formik.errors.email && formik.touched.email && (
                <p className="formikError">{formik.errors.email}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button type="submit" disabled={isLoading}
                className={`loadingBtn ${isLoading ? ' cursor-not-allowed' : ' hover:bg-hoverColor'
                  }`} >
                {isLoading ? (
                  <>
                    Sending
                    <FontAwesomeIcon icon={faSpinner} spin />
                  </>
                ) : ('Next')}
              </button>
            </div>
          </form>
        </div>
        {/* Left side - Image */}
        <div className="imgSide">
          <img src={ForgotPasswordPhoto} alt="Forget illustration" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
