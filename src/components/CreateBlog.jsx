import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, userBlog } from '../store/slices/blogSlice';
import { FaRegImages } from 'react-icons/fa6';
import Loading from './Loading';

const CreateBlog = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    coverImage: null,
  });

  const { loading, data, error } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const [imagePreview, setImagePreview] = useState('');
  const dispatch = useDispatch();

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'coverImage' && files.length > 0) {
      setFormData((prevState) => ({
        ...prevState,
        coverImage: files[0],
      }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
    await dispatch(createBlog(formData));
    await dispatch(userBlog({ userId: user?._id }));
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4 z-[100]'>
      <div className='w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 relative'>
        <button
          className='absolute top-4 right-4 text-gray-700 hover:text-red-500'
          onClick={onClose}>
          <ImCross />
        </button>

        <div className='flex flex-col md:flex-row items-center md:space-x-6'>
          {/* Image Preview and Upload */}
          <div className='md:w-1/3 w-full flex flex-col items-center'>
            {imagePreview ? (
              <img
                src={imagePreview}
                alt='Cover Preview'
                className='w-full rounded-md mb-4 object-cover'
              />
            ) : (
              <div className='w-full h-48 bg-gray-100 flex items-center justify-center rounded-md mb-4'>
                <span className='text-gray-500'>No Image Selected</span>
              </div>
            )}

            <label className='cursor-pointer flex flex-col items-center text-gray-600'>
              <FaRegImages className='text-2xl mb-2 text-blue-500' />
              <span className='text-sm'>Upload Cover Image</span>
              <input
                type='file'
                name='coverImage'
                accept='image/*'
                onChange={handleChange}
                className='hidden'
              />
            </label>
          </div>

          {/* Blog Form */}
          <div className='md:w-2/3 w-full mt-6 md:mt-0'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label
                  className='block text-sm font-medium text-gray-700 mb-1'
                  htmlFor='title'>
                  Blog Title
                </label>
                <input
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  id='title'
                  type='text'
                  name='title'
                  placeholder='Blog title'
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  className='block text-sm font-medium text-gray-700 mb-1'
                  htmlFor='description'>
                  Blog Description
                </label>
                <textarea
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  id='description'
                  name='description'
                  placeholder='Blog description'
                  rows='4'
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  className='block text-sm font-medium text-gray-700 mb-1'
                  htmlFor='content'>
                  Blog Content
                </label>
                <textarea
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  id='content'
                  name='content'
                  placeholder='Blog content'
                  rows='6'
                  onChange={handleChange}
                />
              </div>

              <div className='text-right'>
                <button
                  className='px-6 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  type='submit'>
                  Post Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
