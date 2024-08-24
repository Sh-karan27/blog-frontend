import React from 'react';
import { CiImageOn } from 'react-icons/ci';
import { FaChalkboardUser } from 'react-icons/fa6';

const Singup = ({ setSignUp }) => {
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
        <form className='flex flex-col space-y-4'>
          <label className='flex flex-col text-gray-400'>
            Username
            <input
              type='text'
              placeholder='Username'
              required
              className='mt-1 p-2 rounded-md text-black focus:border-blue-500 border outline-none'
            />
          </label>
          <label className='flex flex-col text-gray-400'>
            Email Address
            <input
              type='email'
              placeholder='Email'
              required
              className='mt-1 p-2 rounded-md text-black focus:border-blue-500 border outline-none'
            />
          </label>
          <label className='flex flex-col text-gray-400'>
            Bio
            <input
              type='text'
              placeholder='Bio'
              required
              className='mt-1 p-2 border outline-none text-black rounded-md focus:border-blue-500'
            />
          </label>
          <label className='flex flex-col text-gray-400'>
            Password
            <input
              type='password'
              placeholder='Password'
              required
              className='mt-1 p-2 border outline-none text-black rounded-md focus:border-blue-500'
            />
          </label>

          {/* Cover Image Input */}
          <label className='flex items-center space-x-2 text-gray-400'>
            <CiImageOn size={24} />
            <input
              type='file'
              accept='image/*'
              className='hidden'
              id='coverImageInput'
            />
            <label htmlFor='coverImageInput' className='cursor-pointer'>
              Upload Cover Image
            </label>
          </label>

          {/* Profile Image Input */}
          <label className='flex items-center space-x-2 text-gray-400'>
            <FaChalkboardUser size={24} />
            <input
              type='file'
              accept='image/*'
              className='hidden'
              id='profileImageInput'
            />
            <label htmlFor='profileImageInput' className='cursor-pointer'>
              Upload Profile Image
            </label>
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

export default Singup;
