import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Assume you have this action in your Redux slice
import { IoIosArrowBack } from 'react-icons/io';
import { createPlaylist } from '../store/slices/playlistSlice';

const CreatePlaylistBox = ({ isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createPlaylist({formData})); // Dispatch the addPlaylist action
    onUpdate();
    onClose(); // Close the create box after submission
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4'>
      <div className='w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 relative'>
        <button
          className='absolute top-4 left-4 text-gray-700 hover:text-blue-600 flex items-center'
          onClick={onClose}>
          <IoIosArrowBack className='mr-2' />
          Go Back
        </button>
        <h2 className='text-xl font-semibold mb-4 text-center text-gray-800'>
          Create Playlist
        </h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              className='block mb-2 text-sm font-medium text-gray-700'
              htmlFor='name'>
              Playlist Name
            </label>
            <input
              className='w-full px-4 py-2 text-sm bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='name'
              type='text'
              name='name'
              placeholder='Playlist Name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              className='block mb-2 text-sm font-medium text-gray-700'
              htmlFor='description'>
              Description
            </label>
            <textarea
              className='w-full px-4 py-2 text-sm bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='description'
              name='description'
              placeholder='Description'
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className='flex justify-end'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistBox;
