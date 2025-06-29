import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { object, string } from 'yup';
import { Link, useNavigate } from 'react-router';
import { authContext } from '../../../Context/authContext';
import { Eye, EyeOff } from 'lucide-react';
import loginPhoto from '../../../assets/images/login.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useAuthApi } from '../../../Hooks/useAuthApi';

export default function Login() {
  let { setToken } = useContext(authContext);

  useEffect(() => {
    document.title = "Login";
  }, []);

  const passwordRegex = /^[A-Z][a-z0-9]{5,}$/;
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const validationSchema = object({
    email: string('email must be string').required("email is required").email("email must be validate"),
    password: string("Password must be a string").required("Password is required").matches(passwordRegex, 'password must start capital letter followed by 5 or more chars'),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      login(values);
    },
    validationSchema,
  });

  const navigate = useNavigate();

  const { mutate: login, isLoading } = useAuthApi({
    endpoint: 'signin',
    successMessage: 'Logged in successfully!',
    onSuccessCallback: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userProfile', JSON.stringify(data.user));
      setToken(data.token);
      navigate('/home');
    }
  });

  function toggleShowPass() {
    setShowPass(!showPass);
  }

  return (
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
              <input type="email" name="email"
                value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                className="input" />
              {formik.errors.email && formik.touched.email && (
                <p className="formikError">{formik.errors.email}</p>
              )}
            </div>
            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block mb-1">Password</label>
              <input type={showPass ? "text" : "password"} name="password"
                value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                className="input" />
              <div className="eye" onClick={toggleShowPass}>
                {showPass ? <EyeOff /> : <Eye />}
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className="formikError">{formik.errors.password}</p>
              )}
            </div>
            {/* Submit Button */}
            <button type="submit" disabled={isLoading}
              className={`loadingBtn ${isLoading ? 'cursor-not-allowed' : ' hover:bg-hoverColor'
                }`} >
              {isLoading ? (
                <>
                  Loading
                  <FontAwesomeIcon icon={faSpinner} spin />
                </>
              ) : (
                'Login')}
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
          <img src={loginPhoto} alt="login illustration" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
