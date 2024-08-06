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
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-opacity-70'>
      <div className='w-3/4 min-h-screen border bg-black bg-opacity-90 p-4 rounded-md'>
        <button
          className=' text-white hover:text-[#366AC4] flex items-center justify-center'
          onClick={() => onClose()}>
          <IoIosArrowBack />
          Go Back
        </button>
        <div className='p-4 flex  items-center justify-center w-full h-full'>
          <div className='w-[30%]'>
            <img src={imagePreview} alt='' className='w-full  rounded-md' />
            <label className='relative cursor-pointer '>
              <input
                type='file'
                name='coverImage'
                accept='image/*'
                onChange={handleChange}
                className='hidden'
              />
              <FaRegImages className='text-4xl text-[#366AC4]' />
            </label>
          </div>

          <div className='w-3/4 flex items-center justify-center h-full'>
            <form
              action='submit'
              onSubmit={handleSubmit}
              className='w-3/4 flex flex-col items-center justify-center gap-10 h-3/4'>
              <div className='mb-4 flex flex-col items-left justify-left w-full'>
                <label
                  className='block mb-2 text-sm font-bold text-blue-500'
                  htmlFor='title'>
                  Blog Title
                </label>
                <input
                  className='w-full  px-3 py-4 text-5xl leading-tight text-bold  bg-transparent  text-white   appearance-none focus:outline focus:shadow-outline'
                  id='title'
                  type='text'
                  name='title'
                  placeholder='Blog title'
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className='mb-4 flex flex-col items-left justify-left w-full'>
                <label
                  className='block mb-2 text-sm font-bold text-blue-500'
                  htmlFor='description'>
                  Blog Description
                </label>
                <textarea
                  className='w-full  h-[10rem]  px-3 py-4 text-xl leading-tight  font-semibold  bg-transparent  text-white   appearance-none focus:outline focus:shadow-outline'
                  id='description'
                  name='description'
                  placeholder='Blog description'
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className='mb-4 flex flex-col items-left justify-left w-full'>
                <label
                  className='block mb-2 text-sm font-bold text-blue-500'
                  htmlFor='content'>
                  Blog Content
                </label>
                <textarea
                  className='w-full  h-[15rem]  px-3 py-4 text-lg leading-tight font-light  bg-transparent  text-white   appearance-none focus:outline focus:shadow-outline'
                  id='content'
                  name='content'
                  placeholder='Blog content'
                  value={formData.content}
                  onChange={handleChange}
                  rows='10'
                />
              </div>
              {/* <div className='mb-4'>
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
              </div> */}
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
