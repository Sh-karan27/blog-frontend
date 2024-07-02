import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

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
];

const Navbar = () => {
  return (
    <nav className=' w-full flex items-center justify-center mt-5'>
      <div className=' w-full  grid grid-cols-3 gap-10 px-4  items-center'>
        <div className=' flex items-start justify-start'>
          <NavLink to='/'>
            <h1 className='font-semibold text-2xl'>BlogExpress</h1>
          </NavLink>
        </div>
        <ul className='w-full flex items-center justify-between'>
          {navLinks.map((curr, i) => (
            <li
              key={curr.name}
              className='flex items-center justify-center gap-1 font-semibold hover:underline'>
              <NavLink to={curr.link}>{curr.name}</NavLink>
              <button>
                {(curr.name === 'Home' || curr.name === 'Blog') && (
                  <IoIosArrowDown />
                )}
              </button>
            </li>
          ))}
        </ul>
        <div className='flex items-center justify-end'>
          <button className=' border border-black hover:bg-black hover:text-white rounded-3xl px-5 py-1 font-semibold'>
            <NavLink to='/contact'>LogIn</NavLink>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
