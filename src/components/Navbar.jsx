import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import Hamburger from './Hamburger'; // Adjust the path as necessary
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/userSlice';

const navLinks = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'About',
    link: '/about',
  },
  {
    name: 'Blog',
    link: '/blogs',
  },
  {
    name: 'ContactUs',
    link: '/contact',
  },
  {
    name: 'Dashboard',
    link: '/dashboard',
  },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <nav className='w-full flex items-center justify-center mt-5 relative'>
        <div className='w-full grid grid-cols-3 gap-10 px-4 items-center'>
          <div className='flex items-start justify-start'>
            <NavLink to='/'>
              <h1 className='font-semibold text-2xl'>BlogExpress</h1>
            </NavLink>
          </div>
          <ul className='hidden md:flex items-center justify-between'>
            {navLinks.map((curr) => (
              <li
                key={curr.name}
                className='flex items-center justify-center gap-1 font-semibold hover:underline'>
                <NavLink to={curr.link}>{curr.name}</NavLink>
                {(curr.name === 'Home' || curr.name === 'Blog') && (
                  <IoIosArrowDown />
                )}
              </li>
            ))}
          </ul>
          <div className='hidden md:flex items-center justify-end'>
            <button
              onClick={handleLogout}
              className='border border-black hover:bg-black hover:text-white rounded-3xl px-5 py-1 font-semibold'>
              LogIn
            </button>
          </div>
          <div className='md:hidden flex items-center justify-end absolute right-2 top-0'>
            <Hamburger
              toggle={isMobileMenuOpen}
              setToggle={setIsMobileMenuOpen}
            />
          </div>
        </div>
      </nav>
      <div
        className={`md:hidden flex flex-col items-center justify-center w-full mt-5 bg-white shadow-lg p-5 absolute top-16 z-50 transition duration-300 ease-in-out delay-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
        {isMobileMenuOpen && (
          <>
            <ul className='flex flex-col items-center justify-center w-full gap-4'>
              {navLinks.map((curr) => (
                <li
                  key={curr.name}
                  className='flex items-center justify-center gap-1 font-semibold hover:underline'>
                  <NavLink to={curr.link} onClick={toggleMobileMenu}>
                    {curr.name}
                  </NavLink>
                  {(curr.name === 'Home' || curr.name === 'Blog') && (
                    <IoIosArrowDown />
                  )}
                </li>
              ))}
            </ul>
            <button
              className='border border-black hover:bg-black hover:text-white rounded-3xl px-5 py-1 font-semibold mt-5'
              onClick={toggleMobileMenu}>
              LogIn
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
