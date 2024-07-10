import { login } from '../store/Slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, isLoggedIn } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(login(credentials));
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          value={credentials.email}
          onChange={handleChange}
          placeholder='Email'
          required
        />
        <input
          type='password'
          name='password'
          value={credentials.password}
          onChange={handleChange}
          placeholder='Password'
          required
        />
        <button type='submit'>Login</button>
      </form>
      {status === 'loading' && <p>Loading.....</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
