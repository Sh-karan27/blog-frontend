import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import Contact from '../assets/ContactUs.jpg';
import background from '../assets/Login-background.jpg';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/');
      }
    });
  };

  return (
    <div
      className='w-full min-h-screen flex items-center justify-center p-4'
      style={{
        // height: '100vh',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}>
      <div className='w-[25rem] h-[35rem] glass-background rounded-lg shadow-lg flex flex-col items-center justify-center '>
        {/* <img
          src={Contact}
          alt='Contact'
          className='w-full lg:w-1/3 h-64 lg:h-auto object-cover'
        /> */}
        <div className='w-full flex items-center justify-between p-8'>
          <h1
            className='
            text-3xl font-bold
          '>
            BlogExpress
          </h1>
          <div className='text-sm  text-gray-400 flex flex-col items-end justify-end'>
            <span> No account?</span> <span>Sign-up</span>
          </div>
        </div>
        <div className='px-8 w-full'>
          {' '}
          <h1 className='text-5xl font-bold'>Sign in</h1>
        </div>
        <div className='w-full p-8'>
          <form onSubmit={handleSubmit} className=' flex flex-col space-y-4'>
            {error && <p>{error}</p>}

            <label className='flex flex-col text-gray-400'>
              Username or Email Address
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                required
                className='mt-1 p-2  rounded-md text-black focus:border-blue-500 border  outline-none '
              />
            </label>

            <label className='flex flex-col text-gray-400'>
              Password
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
                className='mt-1 p-2 border outline-none text-black rounded-md focus:border-blue-500'
              />
            </label>
            <button
              className='border-black px-4 py-2 w-1/4 rounded-md bg-black text-white'
              type='submit'
              disabled={loading}>
              {loading ? 'Logging in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
