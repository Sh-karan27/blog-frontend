import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBlog } from '../store/slices/blogSlice';
import { IoIosArrowBack } from 'react-icons/io';
import { FaRegImages } from 'react-icons/fa6';

const EditBlogBox = ({ blog, isOpen, onClose, onUpdate }) => {
  const [imagePreview, setImagePreview] = useState(blog.coverImage.url);
  const [formData, setFormData] = useState({
    title: blog.title,
    description: blog.description,
    content: blog.content,
    coverImage: blog.coverImage.url,
  });

  const dispatch = useDispatch();
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'coverImage' && files && files[0]) {
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
    const blogData = new FormData();
    blogData.append('title', formData.title);
    blogData.append('description', formData.description);
    blogData.append('content', formData.content);
    blogData.append('coverImage', formData.coverImage);

    await dispatch(updateBlog({ blogId: blog._id, formData: blogData }));
    onUpdate(); // Call the onUpdate callback after updating the blog
    onClose(); // Close the modal
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4'>
      <div className='w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 relative'>
        <button
          className='absolute top-4 left-4 text-gray-700 hover:text-blue-600 flex items-center'
          onClick={onClose}>
          <IoIosArrowBack className='mr-2' />
          Go Back
        </button>

        <div className='flex flex-col md:flex-row items-center md:space-x-6'>
          {/* Image Preview and Upload */}
          <div className='md:w-1/3 w-full flex flex-col items-center'>
            <img
              src={imagePreview}
              alt='Cover Preview'
              className='w-full rounded-md mb-4 object-cover'
            />
            <label className='cursor-pointer flex flex-col items-center text-gray-600'>
              <FaRegImages className='text-2xl mb-2 text-blue-500' />
              <span className='text-sm'>Change Cover Image</span>
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
                  value={formData.title}
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
                  value={formData.description}
                  onChange={handleChange}
                  rows='4'
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
                  value={formData.content}
                  onChange={handleChange}
                  rows='6'
                />
              </div>

              <div className='text-right'>
                <button
                  className='px-6 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  type='submit'>
                  Update Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlogBox;
