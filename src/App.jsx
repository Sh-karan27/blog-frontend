import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './sections/Home';
import About from './sections/About';
import Blog from './sections/Blog';
import Footer from './components/Footer';
import ContactUs from './sections/ContactUs';
import Error from './sections/Error';
import Login from './components/LogIn';
import { useSelector } from 'react-redux';
import Dashboard from './sections/Dashboard';
import SingleBlog from './components/SingleBlog';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('accessToken');
  return token ? element : <Navigate to='/login' />;
};

const App = () => {
  const token = localStorage.getItem('accessToken');

  return (
    <div className='flex flex-col min-h-screen'>
      {token ? (
        <BrowserRouter>
          <Navbar />
          <div className='flex-grow'>
            <Routes>
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path='/' element={<ProtectedRoute element={<Home />} />} />
              <Route
                path='/about'
                element={<ProtectedRoute element={<About />} />}
              />
              <Route
                path='/blogs'
                element={<ProtectedRoute element={<Blog />} />}
              />
              <Route
                path='/blog/:blogId'
                element={<ProtectedRoute element={<SingleBlog />} />}
              />
              <Route
                path='/dashboard'
                element={<ProtectedRoute element={<Dashboard />} />}
              />
              <Route
                path='/contact'
                element={<ProtectedRoute element={<ContactUs />} />}
              />
              <Route path='*' element={<Error />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
