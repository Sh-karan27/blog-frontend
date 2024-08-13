import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './sections/Home';
import About from './sections/About';
import Blog from './sections/Blog';
import Footer from './components/Footer';
import ContactUs from './sections/ContactUs';
import Error from './sections/Error';
import Login from './components/LogIn';
import Dashboard from './sections/Dashboard';
import SingleBlog from './components/SingleBlog';

const Routes = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <BrowserRouter>
        <Navbar />
        <div className='flex-grow'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/blogs' element={<Blog />} />
            <Route path='/blog/:blogId' element={<SingleBlog />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default Routes;
