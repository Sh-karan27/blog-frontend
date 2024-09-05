import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { NavLink, useNavigate } from 'react-router-dom';
import Hamburger from './Hamburger'; // Adjust the path as necessary
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/slices/userSlice';
import { IoCreateOutline } from 'react-icons/io5';
import CreateBlog from './CreateBlog';
import Loading from './Loading';
import { IoSearchOutline } from 'react-icons/io5';

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
  const [isOpen, setIsOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // const { loading, error } = useSelector((state) => state.auth);

  // if (loading) {
  //   return <Loading />;
  // }

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser()).then((result) => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login');
      }
      window.location.reload();
    });
  };

  const handleCreateBlog = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(!isOpen);
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
          <div className='hidden md:flex items-center justify-end gap-5'>
            <button className='text-3xl' onClick={() => handleCreateBlog()}>
              <IoCreateOutline />
            </button>
            <NavLink to='/search'>
              <IoSearchOutline className='text-3xl' />
            </NavLink>
            <button
              onClick={handleLogout}
              className='border border-black hover:bg-black hover:text-white rounded-3xl px-5 py-1 font-semibold'>
              LogOut
            </button>
          </div>
          <div className='md:hidden flex items-center justify-end absolute right-2 top-0'>
            <Hamburger
              toggle={isMobileMenuOpen}
              setToggle={setIsMobileMenuOpen}
            />
          </div>
        </div>
        {isOpen && <CreateBlog isOpen={isOpen} onClose={onClose} />}
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
