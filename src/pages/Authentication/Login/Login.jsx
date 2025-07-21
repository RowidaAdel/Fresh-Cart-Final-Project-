import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { object, string } from 'yup';
import { Link, useNavigate } from 'react-router';
import { authContext } from '../../../Context/authContext';
import { Eye, EyeOff } from 'lucide-react';
import loginPhoto from '../../../assets/images/login.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAuthApi } from '../../../Hooks/useAuthApi';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Login() {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const { setToken } = useContext(authContext);
  const passwordRegex = /^[A-Z][a-z0-9]{5,}$/;

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const { mutate: login } = useAuthApi({
    endpoint: 'signin',
    successMessage: 'Logged in successfully!',
  });

  const validationSchema = object({
    email: string().required("Email is required").email("Invalid email"),
    password: string().required("Password is required").matches(passwordRegex, 'Password must start with a capital letter and be at least 6 characters'),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      login(values, {
        onSuccess: (data) => {
          const userName = data.user?.name?.split(' ')[0] || 'User';
          localStorage.setItem('token', data.token);
          localStorage.setItem('userProfile', JSON.stringify(data.user));
          setToken(data.token);
          toast.success(`Welcome back, ${userName} 👋`);
          navigate('/home');
          setLoading(false);
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || 'Login failed');
          setError(error.response?.data?.message || 'Login failed');
          setLoading(false);
        }
      });
    },
  });

  const toggleShowPass = () => setShowPass(!showPass);

  return (
    <>
      <Helmet>
        <meta name="description" content="Log in to your Fresh Cart account to track orders, manage your profile, and enjoy a seamless shopping experience." />
      </Helmet>
      <div className="flex items-center justify-center">
        <div className="formContainer">
          {/* Right side - Login Form */}
          <div className="divForm">
            <h2 className="titleForm">Login Now:</h2>
            {error && <h3 className="error">{error}</h3>}
            <form onSubmit={formik.handleSubmit}>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <input id="email" type="email" name="email" autoComplete="email"
                  className="input" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.email && formik.touched.email && (
                  <p className="formikError">{formik.errors.email}</p>
                )}
              </div>
              {/* Password */}
              <div className="relative">
                <label htmlFor="password" className="block mb-1">Password</label>
                <input id="password" name="password"
                  type={showPass ? "text" : "password"} autoComplete="current-password"
                  className="input" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <div className="eye" onClick={toggleShowPass}>
                  {showPass ? <EyeOff /> : <Eye />}
                </div>
                {formik.errors.password && formik.touched.password && (
                  <p className="formikError">{formik.errors.password}</p>
                )}
              </div>
              {/* Submit */}
              <button aria-label="login" id="loginBtn" name="loginBtn" type="submit" disabled={loading} autoComplete="off"
                className={`loadingBtn ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-hoverColor'}`}>
                {loading ? (
                  <>
                    Loading
                    <FontAwesomeIcon icon={faSpinner} spinPulse />
                  </>
                ) : (
                  'Login'
                )}
              </button>
              {/* Links */}
              <div className="mt-4 w-full">
                <div className="flex justify-end">
                  <Link to="/forget" className="underline text-stone-900 font-bold mb-3 dark:text-slate-100">
                    Forget Password?
                  </Link>
                </div>
                <p className="mt-2 text-center">
                  I don't have an account
                  <Link to="/register" className="text-mainColor font-semibold ml-1">Register</Link>
                </p>
              </div>
            </form>
          </div>
          {/* Left side - Image */}
          <div className="imgSide">
            <img src={loginPhoto} alt="login illustration" loading='lazy' className="max-w-full h-auto" />
          </div>
        </div>
      </div>
    </>
  );
}
