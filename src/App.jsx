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
import Dashboard from './sections/Dashboard';
import SingleBlog from './components/SingleBlog';
import PlaylistPage from './components/PlaylistPage';
import SearchUser from './components/SearchUser';
import Channel from './components/Channel';
import { useDispatch } from 'react-redux';
import { refreshAccessToken } from './store/slices/userSlice'; // Adjust import path as needed

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokens = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          // Attempt to refresh tokens
          await dispatch(refreshAccessToken(refreshToken)).unwrap();
          setIsAuthenticated(true);
        } catch (error) {
          // If refresh fails, redirect to login
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkTokens();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <BrowserRouter>
        {isAuthenticated ? (
          <>
            <Navbar />
            <div className='flex-grow'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/blogs' element={<Blog />} />
                <Route path='/blog/:blogId' element={<SingleBlog />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/contact' element={<ContactUs />} />
                <Route
                  path='/playlist/:playlistId'
                  element={<PlaylistPage />}
                />
                <Route path='/search' element={<SearchUser />} />
                <Route path='/channel/:username/' element={<Channel />} />
                <Route path='*' element={<Error />} />
              </Routes>
            </div>
            <Footer />
          </>
        ) : (
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Navigate to='/login' />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
