import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { User, Mail } from 'lucide-react';
import profilePhoto from '../../../assets/images/profile.png';

export default function Profile() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    document.title = "Profile";

    try {
      const storedUser = localStorage.getItem('userProfile');
      if (storedUser) {
        setUserProfile(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Failed to parse userProfile from localStorage', err);
    }
  }, []);

  if (!userProfile) {
    return (
      <div className="py-10 px-4 max-w-5xl mx-auto font-sans">
        <h2 className="text-center text-mainColor text-4xl font-bold mt-4">Loading profile...</h2>
      </div>
    );
  }

  const fullName = userProfile.name || 'User';
  const email = userProfile.email || 'user@example.com';
  const firstTwoWords = fullName.split(' ').slice(0, 2).join(' ');

  return (
    <div className="flex items-center justify-center dark:bg-slate-800">
      <div className="container py-25 mx-auto flex flex-col md:flex-row items-center justify-center gap-10 ">
        {/* Left side - Account Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img src={profilePhoto} alt="profile"className="max-w-full h-auto rounded-full shadow-md"/>
        </div>
        {/* Right side - Account Details */}
        <div className="divForm">
          <h2 className="title"><span className='text-slate-950 dark:text-amber-50'>Hello </span>{firstTwoWords}</h2>
          <form className="space-y-6 dark:text-slate-200">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block mb-1 text-lg">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <User size={20} />
                </span>
                <input type="text" id="fullName" value={fullName} disabled className="input"/>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 text-lg">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <Mail size={20} />
                </span>
                <input type="email"id="email" value={email} disabled className="input" />
              </div>
            </div>
            {/* Reset Password Button */}
            <div className="flex justify-end">
              <Link to="/forget" className="submitBtn" >
                Reset Password
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}
