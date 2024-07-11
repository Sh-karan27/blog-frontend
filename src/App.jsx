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
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? element : <Navigate to='/login' />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<ProtectedRoute element={<Home />} />} />
        <Route path='/about' element={<ProtectedRoute element={<About />} />} />
        <Route path='/blogs' element={<ProtectedRoute element={<Blog />} />} />
        <Route
          path='/contact'
          element={<ProtectedRoute element={<ContactUs />} />}
        />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
