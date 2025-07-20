import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { object, ref, string } from 'yup';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import registerPhoto from '../../../assets/images/register.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useAuthApi } from '../../../Hooks/useAuthApi';

export default function Register() {
  useEffect(() => {
    document.title = "Register";
  }, []);

  const passwordRegex = /^[A-Z][a-z0-9]{5,}$/;
  const phoneRegex = /^01[0125][0-9]{8}$/;
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);

  const validationSchema = object({
    name: string("name must be string").required("name is required").min(3, 'name must be min 3 chars').max(20, 'name must be max 20 chars'),
    email: string('email must be string').required("email is required").email("email must be validate"),
    password: string("Password must be a string").required("Password is required").matches(passwordRegex, "Password must start with a capital letter and be at least 6 characters"),
    rePassword: string("Re-password must be a string").required("Re-password is required").matches(passwordRegex, "Re-password must start with a capital letter and be at least 6 characters").oneOf([ref("password")], "Passwords do not match"),
    phone: string("Phone must be a string").required("Phone is required").matches(phoneRegex, "Phone must be a valid Egyptian number"),
  });

  const toggleShowPass = () => setShowPass(!showPass);
  const toggleShowRePass = () => setShowRePass(!showRePass);
  const navigate = useNavigate();
  const { mutate: register } = useAuthApi({
    endpoint: 'signup',
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    onSubmit: (values) => {
      setLoading(true);
      setError('');
      register(values, {
        onSuccess: (data) => {
          toast.success('Account registered successfully');
          setLoading(false);
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        },
        onError: (err) => {
          setError(err.response?.data?.message || 'Registration failed');
          toast.error(err.response?.data?.message || 'Registration failed');
          setLoading(false);
        }
      });
    },
    validationSchema,
  });

  return (
    <div className="flex items-center justify-center">
      <div className="formContainer">
        {/* Left side - Image */}
        <div className="imgSide">
          <img src={registerPhoto} alt="Register Illustration" loading='lazy' className="max-w-full h-auto" />
        </div>
        {/* Right side - Register Form */}
        <div className="divForm">
          <h2 className="titleForm">Register Now:</h2>
          {error && <h3 className="error">{error}</h3>}
          <form onSubmit={formik.handleSubmit}>
            {/* Name */}
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" autoComplete="name" type="text" name="name"
                value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="input" />
              {formik.errors.name && formik.touched.name && (
                <p className="formikError">{formik.errors.name}</p>
              )}
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" autoComplete="email" type="email" name="email"
                value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="input" />
              {formik.errors.email && formik.touched.email && (
                <p className="formikError">{formik.errors.email}</p>
              )}
            </div>
            {/* Password */}
            <div className="relative">
              <label htmlFor="password">Password</label>
              <input id="password" autoComplete="new-password" type={showPass ? "text" : "password"} name="password"
                value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="input" />
              <div className="eye" onClick={toggleShowPass}>
                {showPass ? <EyeOff /> : <Eye />}
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className="formikError">{formik.errors.password}</p>
              )}
            </div>
            {/* Re-Password */}
            <div className="relative">
              <label htmlFor="rePassword">Re-Password</label>
              <input id="rePassword" autoComplete="new-password" type={showRePass ? "text" : "password"} name="rePassword"
                value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="input" />
              <div className="eye" onClick={toggleShowRePass}>
                {showRePass ? <EyeOff /> : <Eye />}
              </div>
              {formik.errors.rePassword && formik.touched.rePassword && (
                <p className="formikError">{formik.errors.rePassword}</p>
              )}
            </div>
            {/* Phone */}
            <div>
              <label htmlFor="phone">Phone</label>
              <input id="phone" autoComplete="tel" type="tel" name="phone"
                value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="input" />
              {formik.errors.phone && formik.touched.phone && (
                <p className="formikError">{formik.errors.phone}</p>
              )}
            </div>
            {/* Submit Button */}
            <div className="flex justify-end">
              <button id="registerBtn" name="registerBtn" autoComplete="off" type="submit" disabled={loading}
                className={`loadingBtn ${loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-hoverColor'}`}>
                {loading ? (
                  <>
                    Loading
                    <FontAwesomeIcon icon={faSpinner} spin />
                  </>
                ) : (
                  'Register'
                )}
              </button>
            </div>
            {/* Link */}
            <p className="text-center mt-2">
              I have an account
              <Link to="/login" className="text-mainColor font-semibold ml-1">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}