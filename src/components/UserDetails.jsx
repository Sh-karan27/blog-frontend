import React, { useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { updateAccountDetails } from '../store/slices/userSlice';
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
    setFormData((preState) => ({
      ...preState,
      [name]: value,
    }));
    // console.log(formData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const updatedData = { ...formData };

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
    onUpdate(); // Call the onUpdate callback after updating the blog
    onClose();
    // console.log(updatedData);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-opacity-70 bg-black'>
      <h2 className='text-lg font-semibold mb-2'>Update Cover Image</h2>
      <ImCross
        className='text-red-500 absolute top-0 left-0'
        onClick={() => onClose()}
      />

      <form action='submit' onSubmit={onSubmit}>
        <div className='mb-4'>
          <label
            className='block mb-2 text-sm font-bold text-blue-500'
            htmlFor='username'>
            User
          </label>
          <input
            className='w-full  px-3 py-2 text-sm leading-tight bg-black  text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            id='username'
            type='text'
            name='username'
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label
            className='block mb-2 text-sm font-bold text-blue-500'
            htmlFor='email'>
            Email
          </label>
          <input
            className='w-full  px-3 py-2 text-sm leading-tight bg-black  text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label
            className='block mb-2 text-sm font-bold text-blue-500'
            htmlFor='username'>
            Bio
          </label>
          <input
            className='w-full  px-3 py-2 text-sm leading-tight bg-black  text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            id='bio'
            type='text'
            name='bio'
            placeholder='Bio'
            value={formData.bio}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default UserDetails;
