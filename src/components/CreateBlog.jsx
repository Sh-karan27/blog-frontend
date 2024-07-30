import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, userBlog } from '../store/slices/blogSlice';
import Loading from './Loading';

const CreateBlog = ({ isOpne, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    coverImage: null,
  });

  const { loading, data, error } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);

  // console.log(user);

  const [imagePreview, setImagePreview] = useState('');
  const dispatch = useDispatch();

  if (!isOpne) {
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

  const handleClose = () => {
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-opacity-70 z-10 h-full'>
      <div className='w-3/4 min-h-screen border bg-black bg-opacity-95 p-4 rounded-md h-full'>
        <button className='text-white hover:text-red-500' onClick={handleClose}>
          <ImCross />
        </button>

        <div className='p-4 flex flex-col items-center justify-center border w-full h-full'>
          {imagePreview && (
            <img
              src={imagePreview}
              alt='Cover Preview'
              className='w-[40%] mb-4'
            />
          )}
          <form
            onSubmit={handleSubmit}
            className='w-full h-full flex flex-col items-center justify-evenly'>
            <div className='mb-4 w-full'>
              <label
                className='block mb-2 text-sm font-bold text-blue-500'
                htmlFor='title'>
                Title
              </label>
              <input
                className='w-full px-3 py-2 text-sm leading-tight bg-black text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                id='title'
                type='text'
                name='title'
                placeholder='Blog title'
                onChange={handleChange}
              />
            </div>
            <div className='mb-4 w-full'>
              <label
                className='block mb-2 text-sm font-bold text-blue-500'
                htmlFor='description'>
                Description
              </label>
              <input
                className='w-full px-3 py-2 text-sm leading-tight bg-black text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                id='description'
                name='description'
                placeholder='Blog description'
                onChange={handleChange}
              />
            </div>
            <div className='mb-4 w-full'>
              <label
                className='block mb-2 text-sm font-bold text-blue-500'
                htmlFor='content'>
                Content
              </label>
              <textarea
                className='w-full px-3 py-2 text-sm leading-tight bg-black text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                id='content'
                name='content'
                placeholder='Blog content'
                rows='10'
                onChange={handleChange}
              />
            </div>
            <div className='mb-4 w-full'>
              <label
                className='block mb-2 text-sm font-bold text-blue-500'
                htmlFor='coverImage'>
                Cover Image
              </label>
              <input
                className='w-full px-3 py-2 text-sm leading-tight bg-black text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                id='coverImage'
                type='file'
                name='coverImage'
                accept='image/*'
                onChange={handleChange}
              />
            </div>
            <div className='mb-6 text-center'>
              <button
                className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline'
                type='submit'>
                Post Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
