import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setSignUp }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    password: '',
    coverImage: null,
    profileImage: null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(registerUser({ formData })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/');
      }

      setSignUp(false);
    });
    // Reset form after dispatch
    setFormData({
      username: '',
      email: '',
      password: '',
      bio: '',
      profileImage: null,
      coverImage: null,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className='w-[35rem] h-[50rem] glass-background rounded-lg shadow-lg flex flex-col items-center justify-center'>
      <div className='w-full flex items-center justify-between p-8'>
        <h1 className='text-3xl font-bold'>BlogExpress</h1>
        <div
          className='text-sm text-blue-400 flex flex-col items-end justify-end cursor-pointer'
          onClick={() => setSignUp(false)}>
          <span>Have an account?</span> <span>Sign in</span>
        </div>
      </div>
      <div className='px-8 w-full'>
        <h1 className='text-5xl font-bold'>Sign Up</h1>
      </div>
      <div className='w-full p-8'>
        <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
          <label className='flex flex-col text-gray-400'>
            Username
            <input
              type='text'
              placeholder='Username'
              name='username'
              value={formData.username}
              onChange={handleChange}
              required
              className='mt-1 p-2 rounded-md text-black focus:border-blue-500 border outline-none'
            />
          </label>
          <label className='flex flex-col text-gray-400'>
            Email Address
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              className='mt-1 p-2 rounded-md text-black focus:border-blue-500 border outline-none'
            />
          </label>
          <label className='flex flex-col text-gray-400'>
            Bio
            <input
              type='text'
              placeholder='Bio'
              name='bio'
              value={formData.bio}
              onChange={handleChange}
              required
              className='mt-1 p-2 border outline-none text-black rounded-md focus:border-blue-500'
            />
          </label>
          <label className='flex flex-col text-gray-400'>
            Password
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              className='mt-1 p-2 border outline-none text-black rounded-md focus:border-blue-500'
            />
          </label>

          {/* Cover Image Input */}
          <label className='flex flex-col text-gray-400'>
            Cover Image
            <input type='file' name='coverImage' onChange={handleChange} />
          </label>

          {/* Profile Image Input */}
          <label className='flex flex-col text-gray-400'>
            Profile Image
            <input
              type='file'
              name='profileImage'
              onChange={handleChange}
              required
            />
          </label>

          <button
            className='border-black px-4 py-2 w-1/4 rounded-md bg-black text-white'
            type='submit'>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
