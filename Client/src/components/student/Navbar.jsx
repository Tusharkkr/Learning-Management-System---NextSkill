import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/react";
import { AppContext } from "../../context/AddContext";

const Navbar = () => {

  const location = useLocation();

  const {navigate,isEducator} = useContext(AppContext)

  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk()
  const { user } = useUser()


  return (
    <nav
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-4 border-b border-gray-300 ${isCourseListPage ? "bg-white" : "bg-cyan-100/70"
        }`}
    >
      {/* Logo */}
      <Link to="/">
        <img
          onClick={()=>navigate('/')}
          src="/logo.png"
          alt="NextSkill Logo"
          className="w-28 lg:w-32 cursor-pointer block"
        />
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-5 text-gray-600">
        {user && <>
          <button onClick={()=>navigate('/educator')} className="hover:text-blue-600 transition">
            {isEducator ? 'Educator Dashboard' : 'Become Educator'}
          </button>

          <span>|</span>

          <Link
            to="/my-enrollments"
            className="hover:text-blue-600 transition"
          >
            My Enrollments
          </Link>
        </>
        }

        {user ? <UserButton /> : <button onClick={() => openSignIn()} className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
          Create Account
        </button>}
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center gap-3 text-gray-600">
        <div className="flex item-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && <>
            <button onClick={()=>navigate('/educator')} className="hover:text-blue-600 transition">
            {isEducator ? 'Educator Dashboard ' : 'Become Educator '}
          </button>

            <span> | </span>

            <Link
              to="/my-enrollments"
              className="hover:text-blue-600 transition"
            >
               My Enrollments 
            </Link>
          </>
          }
        </div>

        {user ? <UserButton /> :
          <button onClick={() => openSignIn()} className="flex items-center justify-center w-6 h-10 rounded-full">
            <img
              src={assets.user_icon}
              alt="User"
              className="w-6 h-6 object-contain block"
            />
          </button>}
      </div>
    </nav>
  );
};

export default Navbar;