import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { updateBlog } from '../store/slices/blogSlice';
const EditBlogBox = ({ blog, isOpen, onClose, onUpdate }) => {
  const [imagePreview, setImagePreview] = useState(blog.coverImage.url);
  const [formData, setFormData] = useState({
    title: blog.title,
    description: blog.description,
    content: blog.content,
    coverImage: blog.coverImage.url,
  });
  //   console.log(formData);
  //   console.log(blog);
  const dispatch = useDispatch();
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'coverImage') {
      setFormData((prevState) => ({
        ...prevState,
        coverImage: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    setImagePreview(URL.createObjectURL(files[0]));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    await dispatch(updateBlog({ blogId: blog._id, formData }));
    onUpdate(); // Call the onUpdate callback after updating the blog
    onClose(); // Close the mod
  };
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-opacity-70'>
      <div className='w-3/4 min-h-screen border bg-black bg-opacity-95 p-4 rounded-md'>
        <button
          className=' text-white hover:text-red-500 '
          onClick={() => onClose()}>
          <ImCross />
        </button>
        <div className='p-4 flex flex-col items-center justify-center'>
          <img src={imagePreview} alt='' className='w-[40%]' />
          <div className='w-full items-center justify-left'>
            <form action='submit' onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label
                  className='block mb-2 text-sm font-bold text-blue-500'
                  htmlFor='title'>
                  Title
                </label>
                <input
                  className='w-full  px-3 py-2 text-sm leading-tight bg-black  text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  id='title'
                  type='text'
                  name='title'
                  placeholder='Blog title'
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block mb-2 text-sm font-bold text-blue-500'
                  htmlFor='description'>
                  Description
                </label>
                <input
                  className='w-full px-3 py-2 text-sm leading-tight  bg-black  text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  id='description'
                  name='description'
                  placeholder='Blog description'
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block mb-2 text-sm font-bold text-blue-500'
                  htmlFor='content'>
                  Content
                </label>
                <textarea
                  className='w-full px-3 py-2 text-sm leading-tight  bg-black  text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  id='content'
                  name='content'
                  placeholder='Blog content'
                  value={formData.content}
                  onChange={handleChange}
                  rows='10'
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block mb-2 text-sm font-bold text-blue-500'
                  htmlFor='coverImage'>
                  Cover Image
                </label>
                <input
                  className='w-full px-3 py-2 text-sm leading-tight  bg-black  text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
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
