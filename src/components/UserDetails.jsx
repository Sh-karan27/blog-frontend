import React, { useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { updateAccountDetails } from '../store/slices/userSlice';
import { IoIosArrowBack } from 'react-icons/io';

const UserDetails = ({ onClose, user, isOpen, onUpdate }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        bio: user.bio,
      });
    }
  }, [user]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const updatedData = { ...formData };

    // Remove unchanged fields
    if (formData.email === user.email) {
      delete updatedData.email;
    }
    if (formData.username === user.username) {
      delete updatedData.username;
    }
    if (formData.bio === user.bio) {
      delete updatedData.bio;
    }

    await dispatch(updateAccountDetails(updatedData));
    onUpdate();
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-opacity-70 bg-black p-4'>
      <div className='relative w-full max-w-lg bg-white rounded-lg shadow-md p-6'>
        <div className='w-full'>
          <button
            className='text-blue-500 hover:text-[#366AC4] flex items-center justify-center'
            onClick={onClose}>
            <IoIosArrowBack />
            Go Back
          </button>
        </div>
        <h2 className='text-xl font-semibold mb-4 text-center text-gray-800'>
          Update Account Details
        </h2>

        <form onSubmit={onSubmit} className='space-y-4'>
          <div>
            <label
              className='block mb-2 text-sm font-medium text-gray-700'
              htmlFor='username'>
              Username
            </label>
            <input
              className='w-full px-4 py-2 text-sm bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='username'
              type='text'
              name='username'
              placeholder='Username'
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              className='block mb-2 text-sm font-medium text-gray-700'
              htmlFor='email'>
              Email
            </label>
            <input
              className='w-full px-4 py-2 text-sm bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='email'
              type='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              className='block mb-2 text-sm font-medium text-gray-700'
              htmlFor='bio'>
              Bio
            </label>
            <textarea
              className='w-full px-4 py-2 text-sm bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='bio'
              name='bio'
              placeholder='Bio'
              value={formData.bio}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className='flex justify-end'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
