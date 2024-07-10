import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './sections/Home';
import About from './sections/About';
import Blog from './sections/Blog';
import Footer from './components/Footer';
import ContactUs from './sections/ContactUs';
import Error from './sections/Error';
import Login from './sections/Login';
import { useSelector } from 'react-redux';
const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={isLoggedIn ? <Home /> : <Navigate to='/login' />}
        />
        <Route
          path='/about'
          element={isLoggedIn ? <About /> : <Navigate to='/login' />}
        />
        <Route
          path='/blogs'
          element={isLoggedIn ? <Blog /> : <Navigate to='/login' />}
        />
        <Route
          path='/contact'
          element={isLoggedIn ? <ContactUs /> : <Navigate to='/login' />}
        />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
